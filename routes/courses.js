const express=require('express');
const router=express.Router();

const courses=[
    {id:1,name:"Maths"},
    {id:2,name:"Science"},
    {id:3,name:"English"}
];


router.get('/',function(req,res){
    res.send(courses);
});

//parameteres using :id
router.get('/:id',(req,res)=>{
    //res.send(req.params.id);
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course){
        res.status(404).send("Course not found");
    }
    else{
        res.send(course);
    }
    
});

router.post('/',(req,res)=>{
    //manual validating input 
    /* if(!req.body.name || req.body.name <3){
        //400 bad request
        res.status(400).send("Name is req and minimum 3");
        return;
    } */

    const {error} = validateCourse(req.body);

    if(error){
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
//  /api/courses/1?sortBy=name ==>> req.quert

router.put('/:id',(req,res)=>{
    //look up course
    //if no course return 404
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course){   
        res.status(404).send("Course not found");
        return;
    }
    //validate
    //if invalid return 400

    const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); // getting result.error - object destructuring
     
    if(error){ 
        res.status(400).send(result.error.details[0].message);
        return;
    }

    //update course
    course.name=req.body.name;
    res.send(course);

});

router.delete('/:id',(req,res)=>{
    const course = courses.find(c => c.id=== parseInt(req.params.id));
    if(!course){   
        return res.status(404).send("Course not found");
    }

    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

module.exports = router;