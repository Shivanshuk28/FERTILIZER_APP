import { signupSchema, signinSchema } from '../validators/types.js';
const validateSignup=(req,res,next)=>{
    try{
        signupSchema.parse(req.body);
        next();
    }
    catch(e){
        res.status(400).json({
            msg:e.errors[0].message
        });
    }
};

const validateSignin=(req,res,next)=>{
    try{
        signinSchema.parse(req.body);
        next();
    }
    catch(e){
        res.status(400).json({
            msg:e.errors[0].message
        });
    }
}

export {validateSignup,validateSignin};
