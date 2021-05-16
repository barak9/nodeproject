require('dotenv').config()
const express = require("express");
const path= require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const { request } = require("http");


const port = process.env.PORT || 3001;
const static_path = path.join(__dirname, "../public");

const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");


app.set("views", template_path);
hbs.registerPartials(partials_path);

console.log(process.env.SECRET_KEY);

app.get("/", (req, res) =>{
    res.render("index")
});

app.get("/register", (req, res) =>{
    res.render("register")
});

app.get("/login", (req, res) =>{
    res.render("login")
});


app.post("/register", async(req, res) =>{
    try{
        const password= req.body.password;
        const cpassword= req.body.confirmpassword;
        
            if(password==cpassword){
                const registerEmployee = new Register({
                    name:req.body.name,
                    age:req.body.age,
                    email:req.body.email,
                    password:password,
                    confirmpassword: cpassword,
                    phone:req.body.phone
                    }) 
                  
                  console.log("the success part" + registerEmployee);

                const token = await registerEmployee.genrateAuthToken();
                 console.log("the token" + token);
                  
                    const registered =await registerEmployee.save();
                    console.log("the register" + registered);

                    res.status(201). render("index");
                
                }else{
                res.send("password not matching");
            }
        }
catch(error){
res.status(400).send(error);
        }
    
})
app.post("/login", async(req, res) =>{
    try{
        const email= req.body.email;
        const password= req.body.password;
        const useremail = await Register.findOne({email:email});
      
        const token = await useremail.genrateAuthToken();
        console.log("the token " + token);

        if(useremail.password === password){
            res.status(201).render("index");



        }else{
            res.send("password are not matching");
        }
           
        }
catch(error){
res.status(400).send(error);
console.log("the error page");
        }
    
})



app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
