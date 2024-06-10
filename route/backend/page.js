let express = require('express');


// for upload image use this pakeage
  let multer = require('multer');
let mongoose = require('../../Models/mogoofile')



let router = express();


//for Storage

let storage = multer.diskStorage({
    destination:'public/backend/images',
    filename:(req, file ,cb)=>{
        cb(null,file.originalname)
    }
})

let upload  = multer({
    storage : storage,

    // this for validation of images
    fileFilter:(req, file ,cb)=>{

        if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' || file.mimetype =='image/gif' || file.mimetype=='image/png'){
            cb(null,true)

          

        }

        else{
            cb(null,false);
            return cb(new Error("you can upload only jpeg,jpg,gif,png"))
        }

       

    

    }
})



// const path = require('path');

// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, 'public', 'backend', 'images'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

///new 
 
// this is code for fetch data form database
router.get('/', (req, res) => {

mongoose.find({})

.then((x)=>{
  
    res.render('../views/backend/page',{x});
    // console.log(x);
   
})
   .catch((y)=>{
    console.log(y);
   })

});






/// first we must make route like this it eassy and the declear fuction inside it 
// like above
router.get('/', (req, res) => {
    res.render('../views/backend/page');

});


//route for add-pages
router.get('/add-pages/', (req, res) => {
    res.render('../views/backend/add-pages',{x:true});

});



router.post('/add-page/add-pages', upload.single('Page_Photo'), (req, res) => {
    mongoose.findOne({ PageUrl: req.body.Page_Url })
        .then((a) => {
            if (a) {
                console.log("You try to duplicate files!!!");
            } else {
                const pageData = {
                    PageUrl: req.body.Page_Url,
                   
                    PageMetaDescription: req.body.Page_Meta_Description,
                    PageMetaKeyword: req.body.Page_Meta_Keyword,
                    PageHeading: req.body.Page_Heading,
                    PagePhoto :req.body.Page_Photo,
                    PageDetails: req.body.Page_Details,
                    PageTitle:req.body.Page_Title,
                };
                if (req.file) {
                    pageData.PagePhoto = req.file.filename;
                }
                mongoose.create(pageData)
                    .then((x) => {
                        res.redirect('/admin/page/');
                    });
            }
        });
});

// for edite the page
router.get('/add-page/:id', (req, res) => {
mongoose.findOne({PageUrl:req.params.id})
.then((x)=>{
    res.render('../views/backend/add-page',{x});
})

   .catch((y)=>{
    console.log(y);

   })
})

//it is use for update and redirect into admin page

router.put('/add-page/:id' , upload.single('Page_Photo'), (req, res) => {
    mongoose.updateOne({PageUrl:req.params.id},{$set:{

        PageUrl: req.body.Page_Url,
        PageMetaDescription: req.body.Page_Meta_Description,

        PageMetaKeyword: req.body.Page_Meta_Keyword,
        PageHeading: req.body.Page_Heading,
        PageDetails: req.body.Page_Details,
//PagePhoto: req.file.filename
    }})
    .then((x)=>{
        res.redirect('/admin/page/')
    })
})

router.delete('/delete-page/:id',(req,res)=>{

    mongoose.deleteOne({ PageUrl:req.params.id})

    .then((x)=>{

        res.redirect('/admin/page/')
    })

})

module.exports = router;




