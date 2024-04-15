const Weather = ( { capital, info } ) => {

  console.log(info)

  const iconURL = `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`
  const temp = Math.floor(info.main.temp - 273)

  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {temp} ºC</p>
      <img src={iconURL} alt="Weather img" />
      <p>Wind: {info.wind.speed} m/s</p>
    </div>
  )
}

const Country = ( { country, weather } ) => {

  const lang = Object.keys(country.languages).map(item => country.languages[item])

  const flagStyle = {
    maxWidth: 200,
    maxHeight: 200
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital} </p>
      <p>Area: {country.area} squared meters.</p>
      <h3>Languages:</h3>
      <ul>
        {
          lang.map((language, i) => 
          <li key={i} > {language} </li>)
        }
      </ul>
      <img src={country.flags.png} style={flagStyle} alt="Country flag" />
      <Weather capital={country.capital} info={weather} />
    </div>
  )
}

export default Country