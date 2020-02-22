//higher camelcase means its a class- EventEmitter is a class
const EventEmitter =require('events');

//make an object
const emitter=new EventEmitter();

//both do the same
emitter.addListener('messageLogged',function(arg){
    console.log(arg.id);
    console.log(arg.url);
});
//emitter.on();

//arrow functions
emitter.on('arrow',(arg)=>{
    console.log(arg.id);
});

//raise an event, signaling an event has happened
//can add parameters to events also
//emitter.emit('messageLogged',1,'url');
//better to send as a object
emitter.emit('messageLogged', {id:1,url:'http'} );
emitter.emit('arrow',{id:1000});
