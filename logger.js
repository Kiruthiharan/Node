var url=" ";
const EventEmitter =require('events');

class Logger extends EventEmitter{
    log(message){
        console.log(message);
        this.emit('messageLogged', {id:1,url:'http'} );
    }
}

//exporting functions and variables so that it can be used out of this module   
/* module.exports.log=log;
module.exports.url=url; */

module.exports=Logger;
