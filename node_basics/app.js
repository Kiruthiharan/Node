//loading modules
const logger = require('./logger'); 

//jshint - scan js errors

logger.log("HI");

//working with paths
const path =require('path');

var pathObj=path.parse(__filename)
console.log(pathObj)

//working with OS

const os=require('os');

var totalMemory=os.totalmem();
console.log("Total Memory: "+ totalMemory);

//using variable with variable interpolation - Use backticks
console.log(`Total Memory ${totalMemory}`);


//working with files

const fs=require('fs');

/* const files=fs.readdirSync('./');
console.log(files); */

 fs.readdir('$',function(err,files){
    if(err) console.log('Error',err);
    else console.log('Result',files)
});