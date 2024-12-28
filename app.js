const express=require("express");
const bodyParser=require("body-parser");
const axios=require("axios");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
    
    const firstName=req.body.fn;
    const lastName=req.body.ln;
    const email=req.body.em;
    

    const data= {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]

    };

    const jsondata = JSON.stringify(data);

    const url = "https://us19.api.mailchimp.com/3.0/lists/af4c120764"

    const options = {
        method: "POST",
        auth: "abhinav1:16a0fb48e037fa525f21bd49f7aa0963-us19"
    }

    const request=https.request(url, options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    
    request.end();

    
});
app.post("/failure", function(req,res){
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("Server is running on port 3000");
    
});

//API key:16a0fb48e037fa525f21bd49f7aa0963-us19
//list id :af4c120764