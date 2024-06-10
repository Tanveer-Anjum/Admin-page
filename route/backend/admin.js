let express = require('express');
let router = express();
let mongoose = require('../../Models/mogoofile')


router.get('/',(req,res)=>{
    mongoose.find({}).countDocuments()
    .then((x)=>{
        res.render('../views/backend/file',{x});
       
    })
.catch((y)=>{

})
  
})

module.exports = router;