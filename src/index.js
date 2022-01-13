require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const API = require('./api.js');
let cityData;

const app = express();
app.use(bodyParser.json());

app.get('/:cityId', async (req, res) => {
  let {cityId} = req.params;
  try{
    let ressult = await API.getCityWeather(cityId);
    res.status(200).json(ressult);
  }
  catch(err) {
    res.status(400).send(err)
  }
})

app.post('/get-weather', async (req, res) => {
  let {name} = req.body;
  try{
    let city = cityData.find(city => city.name === name);
    if(city){
      let ressult = await API.getCityWeather(city.id);
      res.status(200).json(ressult);
    }
    else{
      res.status(400).json({Message: "invalid name"})
    }
  }catch(err) {
    console.log(err);
    res.status(400).json(err)
  }
})

app.listen(process.env.PORT || 3005, async () => {
  try{
    cityData = await API.getListCity();
    console.info(`Server is running at ${process.env.PORT || 3005}`)
  }catch(err){
    console.error(err);
  }
})

