import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const createUser = async({firstname,lastname,email,password,phone_number})=>{
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error("User already exists");
    }
    const newUser= await User.create({
        firstname,
        lastname,
        email,
        password,
        phone_number
    })
    await newUser.save();
    return newUser;
}

export const loginUser = async({email,password})=>{
    const user=await User.findOne({email});
    if(!user || !(await user.passwordMatch(password))){
        throw new Error("User does not exist || Incorrect email/password");
    }
    const token=jwt.sign({email},
        process.env.JWT_SECRET,{
            expiresIn:"1h",
        }
    );
    return {token};
};

