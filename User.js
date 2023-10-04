const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number, min:18, max:80},
    married:{type:String , enum:["single","married"], default:"single"},
    password: String

},{timestamps:true}) // timestamps helps us to find the create tym and update tym

const User = mongoose.model("user",UserSchema)

module.exports = User