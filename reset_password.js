const Joi = require('joi');
const nodemailer = require("nodemailer");
const user = require("./customer.js");
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'mqsp55djfm2hxxom@ethereal.email',
                    pass: 'StUvFAKbSg2zezmHNf'
                }
});
    const validation = Joi.object({
    
       
    
        mail: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),
        new_password:Joi.string().min(3).required()
        
    
      });

      module.exports=function(){
        return async(req,res,next)=>{
            const newcustomer={
             
              mail: req.body.mail,
             password:req.body.password,
             new_password:req.body.new_password
            
            }
            const {error}=validation.validate(newcustomer);
            if(!error){

                const mail=req.body.mail;
                const verifymail=await user.findOne({mail});
                const hashpassword=bcrypt.hashSync(req.body.password,10);
                if(verifymail && bcrypt.compare(verifymail.password,hashpassword))
                {
                    const otp=`${Math.floor(1000+Math.random()*9000)}`;
    
                    const mailoptions={
                      from:'"Fred Foo 👻" <foo@example.com>',
                      to:"bar@example.com, baz@example.com",
                      subject:"Verify Email",
                      html:`Enter ${otp} to confirm your email`
                    };
                   
                  
                  transporter.sendMail(mailoptions);
                  
                  user.updateOne({mail:newcustomer.mail},{$set:{emailcode:otp}},function(err)
                  {
                    if(err)
                    {
                      console.log(err);
                      res.sendStatus(406);
                    }else{
                      res.sendStatus(200);
                      console.log("Code Sent");
                    }
                  })
                  
                  next();
                   }else{
                      res.sendStatus(406);
                   }
                }
               
            }}
        



       