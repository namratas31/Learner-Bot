const express=require("express");
const app =express();
const path = require("path");

app.use(express.static(path.join(__dirname, "/public/css")))
app.use(express.static(path.join(__dirname, "/public/js")))



app.use(express.static(path.join(__dirname, "/public/assets")))

app.set("view engine","ejs");

app.set("views", path.join(__dirname, "/views")); 
app.set("public", path.join(__dirname, "/public")); 

const port=5050;
app.get("/",(req,res)=>{
res.render("index.ejs");
})

app.get("/test",(req,res)=>{
res.render("test.ejs");
});

app.get("/dict",(req,res)=>{
    res.render("dict.ejs");
});




app.get("/practice",(req,res)=>{
    res.render("practice.ejs");
});

app.get("/practice/spell",(req,res)=>{
res.render("spell.ejs");
});

app.get("/practice/speak",(req,res)=>{
    res.render("speak.ejs");
});



app.get("/practice/set",(req,res)=>{
    res.render("set.ejs");
});


app.get("/practice/voc",(req,res)=>{
    res.render("voc.ejs");
});



app.listen(port,(req,res)=>{
    console.log(`Your server is running on port number ${port}`);
})