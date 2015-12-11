'use strict'
module.exports = {
	start: function() {
		// we need some standard modules
		let exec = require('child_process').exec;
		
		// your require for express here....
		let express = require('express');
		let app = express(); 
		
		let http = require('http').Server(app);
		let io = require('socket.io')(http);
			
		// set some vars with values..
		let isWin = /^win/.test(process.platform);
		let startcommand = (isWin ? 'start chrome ' : 'open -a "Google Chrome" ') + "http://localhost:3000/index.html";

		// use express to catch all .html urls 
		// your code for express here
		app.get("*.html", (req, res) => res.sendFile(__dirname + req.url));
		
		// if a client connected, send him an acknowledgement..
		io.on('connect', (socket)=>socket.emit('data', "connection established"));
				
		// listen to port 3000
		http.listen(3000, () => console.log('listening on *:3000'));
		
		// start an instance of chrome
		exec(startcommand);		
	}
}
