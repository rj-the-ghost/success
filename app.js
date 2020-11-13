const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const { dirname } = require("path");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  
    const fn=req.body.fn;
    const ln=req.body.ln;
    const em=req.body.email;
    console.log(fn);
    console.log(ln);
    console.log(em);
    
    var data={
        members:[{
    email_address:"em",
    status:"subscribed",
    error_count: "ec",
    merge_fields:{
    FNAME:fn,
     LNAME:ln
    }
    }]

    };
    const jsondata=JSON.stringify(data);
    const url="https://us2.api.mailchimp.com/3.0/lists/8579f510d8";
    const options= {
        method: "POST",
        auth: "rajat:fe0ae4163ec663a686b517ad4246f0b3-us2",
    }
    const request=https.request(url, options, function(response){
if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
    
}else{
    res.sendFile(__dirname+"/failure.html");
}

    response.on("data",function(data){
    console.log(JSON.parse(data));
    
  
})

    })
    request.write(jsondata);
    request.end();
});


app.listen(3000||process.env.Port,function(){
    console.log("Server is running on 3000;")});

    //api key fe0ae4163ec663a686b517ad4246f0b3-us2
    //audience 8579f510d8