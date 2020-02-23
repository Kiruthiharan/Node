const express = require('express');
const Joi = require('joi');
const app=express();


app.use(express.json());

const courses=[
    {id:1,name:"Maths"},
    {id:2,name:"Science"},
    {id:3,name:"English"}
];

app.get('/',function(req,res){
    res.send('Hello World');
});

app.get('/api/courses',function(req,res){
    res.send(courses);
});

//parameteres using :id
app.get('/api/courses/:id',(req,res)=>{
    //res.send(req.params.id);
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course not found");
    }
    else{
        res.send(course);
    }
    
});

app.post('/api/courses',(req,res)=>{
    //manual validating input 
    /* if(!req.body.name || req.body.name <3){
        //400 bad request
        res.status(400).send("Name is req and minimum 3");
        return;
    } */

    const schema = {
        name:Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    //console.log(result);

    if(result.error){
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id:courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//query string parameters
//  /api/courses/1?sortBy=name



//function optional
//we need env variable for produxtion environments
const port=process.env.PORT || 3000;
app.listen(port,()=>{console.log(`Listening on port ${port}`)});