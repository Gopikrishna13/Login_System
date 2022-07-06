const express = require("express");
const routes = express.Router();
const user = require("./customer.js");
const userverification=require("./userveriication");
const uservalidate=require("./register.js");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const password_change=require("./reset_password"); 

const prompt=require('prompt-sync');
const { updateOne } = require("./customer.js");
require("dotenv").config();
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'mqsp55djfm2hxxom@ethereal.email',
                    pass: 'StUvFAKbSg2zezmHNf'
                }
});

routes.use(bodyParser.json());

//routes called every time request is made
routes.use('/', (req, res, next) => {
  console.log("Call Recieved");
  next();
})

routes.post("/signin",uservalidate(),function(req,res,next){
      res.sendStatus(200);
     console.log("Verify Your Email");
      
    
   })

routes.put("/verify",async(req,res)=>
{
  const {mail,emailcode}=req.body;
  const verifymail=await user.findOne({mail});
  if(emailcode==verifymail.emailcode)
  {
    user.updateOne({mail:mail},{$set:{emailverified:true}},function(err)
    {
      if(err)
      {
        console.log(err);
        res.sendStatus(406);
      }else{
        res.sendStatus(200);
        console.log("Verified");
      }
    })
    
  
  }else{
    res.sendStatus(406);
  }

})
routes.get("/login",async(req,res,next)=>{
  const { mail, password } = req.body;
  if (!(mail && password)) {
    res.status(400).send("All input is required");
  }
  
  const userdetail = await user.findOne({ mail });

  if (userdetail && (await bcrypt.compare(password, userdetail.password))) {
    console.log("Login successfull");
    return res.status(200).json(userdetail);
  }
  return res.status(400).send("Invalid Login");

})


routes.post("/resetpassword",password_change(),function(req,res,next)
{
   console.log("Verify Email");
})

routes.put("/changepassword",async(req,res)=>
{
   const{mail,emailcode,new_password}=req.body;
   const checkmailcode=await user.findOne({mail});
   if(checkmailcode.emailcode=emailcode)
   {
    user.updateOne({mail:mail},{$set:{password:bcrypt.hashSync(new_password,10)}},function(err)
    {
      if(err)
      {
        console.log(err);
        res.sendStatus(406);
      }else{
        res.sendStatus(200);
        console.log("Updated");
      }
    })
    
  
  }else{
    res.sendStatus(406);
  }
})


module.exports=routes;