const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const employeesSchema = new mongoose.Schema({
name:{
    type:String,
    required: true
},
age:{
    type:Number,
    required: true
},
email:{
    type:String,
    required: true,
    unique: true
},
password:{
    type:String,
    required: true,
    unique: true
},
confirmpassword:{
    type:String,
    required: true,
    unique: true
},



phone:{
    type:Number,
    required: true,
    unique: true
},
tokens:[{
    token:{
        
            type: String,
            required: true
      
    }
}]

})

employeesSchema.methods.genrateAuthToken =async function(){
    try{
        console.log(this._id);
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({token:token})
await this.save();
return token;
}
    catch(error){
        res.send(error);
        console.log("the error:" + error);
    
    }
}

const Register = new mongoose.model("Register", employeesSchema);
module.exports = Register;