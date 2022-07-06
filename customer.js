const { boolean } = require('joi');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const Schema=mongoose.Schema;

const customerschema=new Schema({


mail:{
    type:String,
    
    unique:true
},
password:{
    type:String
    
},
emailverified:{
    type:Boolean,
    default:false
},
emailcode:{
    type:String
}

}


);


const customer=mongoose.model("customer",customerschema);
module.exports=customer;