const express=require("express");
const https=require("https");
const app=express();
const byParser=require("body-parser");
app.use(byParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const name=req.body.cityName;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=c04bae222461aca0ed8179f255a4f4c4&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const tamp=weatherData.main.temp;
      res.write("<h1>the temperature in "+name+" is "+tamp+" degree celcius</h1>");
      res.send();
    });
  });


})

app.listen(3000,function(){
  console.log("server 3000 started");
})
// https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=c04bae222461aca0ed8179f255a4f4c4
