const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/LoginSystem")
.then(()=>{
    console.log("MongoDb Successfully Connected :)")
})
.catch(()=>{
    console.log("Failed to connect to MongoDB :(")
})

const SignInSchema = mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type:String
    }
})

const collection=new mongoose.model("user_info", SignInSchema)

module.exports=collection