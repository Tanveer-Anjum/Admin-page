let express = require('express');
let bodyParser = require('body-parser');
var methodOverride = require('method-override')










//it import from env
let dotenv = require('dotenv');
// dotenv.config({path:'./config.env'});

require('dotenv').config();

//database connection



let app = express();

// ejs 
let mongoose = require('./Models/mogoofile')

app.set('view engine','ejs');

app.use(methodOverride('_method'))
//for static data from public

app.use(express.static(__dirname + '/public/'));
//database
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());








const PORT = process.env.PORT||3000;

//backend route

// it import from admin files
let admin = require('./route/backend/admin');
app.use('/admin',admin);

//for dynamic

app.use((req, res, next) => {
  mongoose.find({})
    .then((x) => {
      res.locals.navdata = x;
      next();
    })
    .catch((err) => {
      console.error(err);
      next();
    });
});

// backend route
// it import from admin page
let pageroute = require('./route/backend/page');
app.use('/admin/page',pageroute);

// frontent route:

let headroute = require('./route/frontend/header');
app.use('/',headroute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });