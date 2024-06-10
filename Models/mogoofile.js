const mongoose =require('mongoose');

const mongoosedb = require('mongoose');
mongoose.connect("mongodb://localhost:27017/e_commer");

const productSchema = new mongoose.Schema({
    PageUrl            : String,
    PageMetaDescription: String,
    PageMetaKeyword:String,
    PageHeading:String,
    PagePhoto : String,
    PageDetails:String,
    PageTitle:String

});
module.exports = mongoose.model('products',productSchema)