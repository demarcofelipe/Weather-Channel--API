const express = require  ("express");
const https = require ("https");
const bodyParser = require ("body-parser");

const app = express ();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req,res){

res.sendFile(__dirname + "/index.html")

})

//MailChimp API apiKey
//bdcb8c7617752416bf5f8ee66c94f7d2-us5

app.post("/", function (req,res){

  const query= req.body.city
  const apiKey= "9b06c9eb311e2731ca45f29a664cc452"
  const units = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&q=" +query+ "&units=" +units+ ""

  https.get (url, function (response){
    console.log(response.statusCode)
    response.on("data", function (data){
      const weatherData = JSON.parse(data)
      const temperature = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather is currently: " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + query + " is: " + temperature + " degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send()

    })
  })

})



app.listen (3000, function(){
  console.log("Server is running on port 3000")
})
