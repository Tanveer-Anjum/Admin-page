let express =require('express');
let mongoose = require('../../Models/mogoofile')
let router = express();


router.get('/',(req,res)=>{
    mongoose.find({})
    .then((x)=>{
        res.render('../views/frontent/index',{x});

    })
    

    
    
});

router.get('/:id',(req,res)=>{

mongoose.findOne({ PageUrl:req.params.id})
.then((x)=>{
    // if are use to handle error on terminal can not read null
    if(x){
        res.render('../views/frontent/dynamic',{x})
    }
    else{
        res.redirect('/');
    }
   
  
})
.catch((y)=>{
    
})

    
})

module.exports =  router;