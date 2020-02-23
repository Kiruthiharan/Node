const config= require('config');
const express = require('express');
const Joi = require('joi');
const logger=require('./middleware/logger')
const authenticator=require('./middleware/authenticator')
const morgan=require('morgan')
const courses = require('./routes/courses');
const app=express();

app.set('view engine','pug');
//optional
app.set('views','./views');
/* console.log(`NODE_ENV is ${process.NODE_ENV}`);
console.log(app.get('env')); */ // development by default

//for any routes staring with /api/courses use this
app.use('/api/courses',courses);

//middleware
app.use(express.json());    //parses body to json
app.use(express.urlencoded({extended:true})); //parses urlencoded payload key=value&key=value and converts to json object

//serve static content
app.use(express.static('public')); // localhost:3000/readme.txt - if its available in public it returns it

//custom middleware
app.use(logger);
app.use(authenticator);

//configuration
console.log('App Name' + config.get('name'));
console.log('App Name' + config.get('mail.host'));

//morgan a 3rd party middleware to log http requests
if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    console.log("Morgan enabled")
}

app.get('/',function(req,res){
    res.render('index',{title:"PUG",message:'HELLO'});
});
//function optional
//we need env variable for produxtion environments
const port=process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}`)});