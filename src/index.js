const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const collection=require("./mongodb")


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

app.post("/signup",async(req,res)=>{

    const data={
        email:req.body.name,
        password:req.body.password
    }

    await collection.insertMany([data])

    res.render("home")

})

app.listen(3000, ()=>{
    console.log('Listening on port 3000 :)');
})
