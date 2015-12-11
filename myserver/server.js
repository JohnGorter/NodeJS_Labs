'use strict'
module.exports = {
	start: function() {
		// we need some standard modules
		let exec = require('child_process').exec;
		let app = require('express')();
		let http = require('http').Server(app);
		let io = require('socket.io')(http);
		
		// and we need our custom modules..
		let wd = require('../watchdog');
		let injector = require('../injector');
		
		// set some vars with values..
		let isWin = /^win/.test(process.platform);
		let startcommand = (isWin ? 'start chrome ' : 'open -a "Google Chrome" ') + "http://localhost:3000/index.html";

		// use express to catch all .html urls 
		app.get('*.html', (req, res) => {
			// get the file from the url...
			var filename = req.url.replace("/", "");
			// __ dirname holds the current directory in which this script resides
			var dirname = __dirname.replace("/bin", "/");
			// inject the payload into the file at filename and retur the resulting html
			injector.inject(filename, '</body>', dirname + '/client/injector.html', (data) => {
				// return the injected html to the browser
				res.status(200); res.set('Content-Type', 'text/html'); res.end(data);
			});
		});
		
		// if a client connected, send him an acknowledgement..
		io.on('connect', (socket)=>socket.emit('data', "connection established"));
		
		// start a new instance of the watchdog for the current directory
		new wd(".").on('refresh', () => io.emit('refresh'));
		
		// listen to port 3000
		http.listen(3000, () => console.log('listening on *:3000'));
		
		// start an instance of chrome
		exec(startcommand);		
	}
}
