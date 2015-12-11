'use strict'
// use the event emitter to let this component emit events to its subscribers..
let ev = require('events').EventEmitter; 
let util = require('util');
let fs = require('fs'); 

// this exports has to be a constructor function because we want
// its prototype property to inherit from eventemitter..
// the caller has to new up a new instance of this export to listen
// to change events...

// create a constructor function to watch files...
module.exports = function (dir){

  // watch the filesystem for the given directory
  fs.watch(dir, (e, f) => {
      // raise the refresh event
    this.emit('refresh', { event: e, filename: f});
  });
}

// make the watchdog an eventemitter..
util.inherits(module.exports, ev);


