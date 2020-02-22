const Log=require('./logger')

const log=new Log();

log.on('messageLogged',function(arg){
    console.log(arg.id);
    console.log(arg.url);
});

log.log('Message')