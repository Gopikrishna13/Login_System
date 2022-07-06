const Joi = require('joi');

    const validation1 = Joi.object({
    
       
    
        mail: Joi.string().min(3).required().email(),
        password: Joi.string().min(3).required(),
        
        
    
      });
module.exports=function(){
    return function(req,res,next)
    {
        const newuser={
       
        mail:req.body.mail,
        password:req.body.password
        }
      const {error1}=validation1.validate(newuser);
      if(!error1)
      {
        next();
      }else{
        res.sendStatus(406);
        return(error1);
      }
    }

}