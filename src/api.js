const fs = require('fs');
const axios = require('axios');

const getListCity = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(`/Users/admin/Desktop/WeatherApp/data/city.list.json`, 'utf-8', (err, data) => {
      if(err) return reject(err);
      return resolve(JSON.parse(data));
    })    
  })
}

const getCityWeather = async function(idCity) {
  try{
    let cityWeather = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${idCity}&appid=c5c6fe759a78fb429c86ad54c3794237`)
    return cityWeather.data
  }catch(err) {
    throw new Error('Error in get weather')
  }
}
module.exports = {
  getListCity: getListCity,
  getCityWeather: getCityWeather
}