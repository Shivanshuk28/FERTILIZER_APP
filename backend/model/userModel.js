import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 8 //password must be at least 8 characters long
    },
    phone_number:{
        type:Number,
        required:true,
        unique:true,
        validate: {
        validator: function(v) {
            return /\d{10}/.test(v);  // Ensures the value is a 10-digit number
        },
        message: props => `${props.value} is not a valid phone number!`  // Error message construction
    }
    }
});

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
});

UserSchema.methods.passwordMatch=async function(password){
    return await bcrypt.compare(password,this.password);
}

const User=mongoose.model("User",UserSchema);
export default User;