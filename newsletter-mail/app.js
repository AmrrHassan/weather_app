
const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const http = require("http");

const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: {
      email_address: email,
      status: "subscribed",
      merge_field: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  };

  const url = "https://us4.api.mailchimp.com/3.0/lists/321057f07e"
  const options = {
    method: "POST",
    auth: "amrhafez:038dcf91961d26f68eb9680b7d7eded2-us17"
  }
  var jsonData = JSON.stringify(data);

  const request = https.request(url, options, function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});

app.listen(3000 ,function(){
  console.log("Server running on port 3000");
});

// 038dcf91961d26f68eb9680b7d7eded2-us17
// 321057f07e
