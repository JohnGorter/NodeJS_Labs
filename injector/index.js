'use strict'
// we need the filesystem api
let fs = require('fs');

// this constructor function creates a Function object to inject
// export this constructor function to the outside..
// contents of a file into a place in the given string
(function() {
	
	function injectinternal(file, mark, injectable, cb){
		// read the file given as parameter 
	  	fs.readFile(file, 'utf8', (err, source) => {
			// read the injectable as a file and on success...
			fs.readFile(injectable, 'utf8', (err, injectee) => {
				// replace the content of the original with the injector at the mark and
				// call the callback to further process the enriched data..	
				cb(source.replace(mark, injectee + mark));
			});
		});
	}
	
	// return an object that exposes this functionality
	module.exports.inject =  injectinternal;
})();

