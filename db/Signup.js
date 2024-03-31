const mongoose=require('mongoose');

const signupschema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
module.exports=mongoose.model('users',signupschema);