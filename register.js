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
        confirm_password:Joi.string().min(3).required()
        
    
      });

   module.exports=function(){
    return function(req,res,next){
        const newcustomer={
         
          mail: req.body.mail,
         password:req.body.password,
         confirm_password:req.body.confirm_password
        
        }
        const {error}=validation.validate(newcustomer);
        if(!error){
             if(JSON.stringify(newcustomer.password)==JSON.stringify(newcustomer.confirm_password)){
              const otp=`${Math.floor(1000+Math.random()*9000)}`;

              const mailoptions={
                from:'"Fred Foo 👻" <foo@example.com>',
                to:"bar@example.com, baz@example.com",
                subject:"Verify Email",
                html:`Enter ${otp} to confirm your email`
              };
             
            
            transporter.sendMail(mailoptions);
            
      user.create({
        mail:req.body.mail,
        password:bcrypt.hashSync(req.body.password,10),
        emailverified:false,
        emailcode:otp
      })
            
            next();
             }else{
                res.sendStatus(406);
             }
        }
            
       
            
        
        else
        res.sendStatus(406);
        return("error");
    }
     
     
    }
      