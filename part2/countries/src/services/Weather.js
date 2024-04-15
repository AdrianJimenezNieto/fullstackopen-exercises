import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY


const getWeather = (info) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${info[0]}&lon=${info[1]}&appid=${API_KEY}`)
    .catch(e => console.log('An error occurred'))

  return request.then(response => response.data)
}

export default {
  getWeather
}