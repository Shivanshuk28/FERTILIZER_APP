import {createUser, loginUser} from '../services/userService.js';
export const signup = async (req,res)=>{
    try{
        const{firstname,lastname,email,password,phone_number}=req.body;
        await createUser({firstname,lastname,email,password,phone_number});
        res.status(201).json({
            msg:"User created successfully"
        });
    } 
    catch(e){
        res.status(400).json({
            msg:e.message
        });
    }  
}

export const signin = async (req,res)=>{
    try{
        const{email,password}=req.body;
        const{token,user}=await loginUser({email,password});
        res.status(200).json({
            msg:"User logged in successfully",
            token,
            user
        });
    }catch(err){
        res.status(400).json({
            msg:err.message
        });
    }

};