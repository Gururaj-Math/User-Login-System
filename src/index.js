const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require("./mongodb")


const templatePath=path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.use(express.static(__dirname + '../public'))

app.get("/", (req,res)=>{
    res.render("signin")
})

app.get("/signup", (req,res)=>{
    res.render("signup")
})

app.get("/success", (req,res)=>{
    res.render("success")
})

app.post("/signup",async(req,res)=>{

    const data = {
        email: req.body.email,
        password: req.body.password
    }

    await collection.insertMany([data])

    res.render("success")

})

app.post("/signin", async(req,res)=>{

    try{
        const check = await collection.findOne({email:req.body.email})
        if(check.password == req.body.password){
            res.render("home")
        }
        else{
            res.render("wrong")
        }
    }
    catch{
        res.render("wrong")
    }

})

app.listen(3000, ()=>{
    console.log('Listening on port 3000 :)')
})
