const express=require('express');
const https=require('https');
const bodyParser = require("body-parser");
const { stringify } = require('querystring');
 const app=express();

 app.use(express.static('public'));

 app.set("view engine", "ejs");

 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

 app.get("/",function(req,res){
     res.sendFile(__dirname+"/index.html");
 });

 const token="e996f7ec19c6b8b1f2cdf03525b692eed0c026f527e6c6ed2e83449dcc0182a3";

 app.get("/list",async(req,res)=>{
     var g=req.query.v;
    const url="https://gorest.co.in/public/v1/users?access-token="+token+"&page="+req.query.v;
    console.log(req.query.v);
    var data1;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
           data1=JSON.parse(data);
            res.render(__dirname+"\\public\\list.ejs",{data1:data1.data,page:data1.meta.pagination.page});
        });
    })
 });

 app.post("/add",function(req,res){
     let d={
         "name":req.body.name,
         "email":req.body.email,
         "gender":req.body.gender,
         "status":req.body.status,
     }
     //d=JSON.stringify(d);
     
     let options={
        "athorization": token,
        "host":  "gorest.co.in",
        "path":"/public/v1/users",
        "method":"POST",
        "header":{
        "Accept": "application/json", 
        "Content-Type": "application/json"},
        "body":d
     }
     
     console.log(options);
     https.request(options, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            console.log(data);
        });
    });
   // res.sendFile(__dirname+"\\public\\index.html");
 })

 app.listen(3000,async()=>console.log("Server is running"))