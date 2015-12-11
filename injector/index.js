'use strict'
// we need the filesystem api
let fs = require('fs');

// this constructor function creates a Function object to inject
// export this constructor function to the outside..
// contents of a file into a place in the given string
(function() {
	
	function injectinternal(file, mark, injectable, cb){
	  // task 1. your code here...
	}
	
	// return an object that exposes this functionality
	module.exports.inject =  injectinternal;
})();

