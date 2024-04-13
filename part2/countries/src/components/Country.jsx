const Country = ( { country } ) => {

  const lang = Object.keys(country.languages).map(item => country.languages[item])

  const flagStyle = {
    maxWidth: 200,
    maxHeight: 200
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital} </p>
      <p>Area {country.area} squared meters.</p>
      <h3>Languages:</h3>
      <ul>
        {
          lang.map((language, i) => 
          <li key={i} > {language} </li>)
        }
      </ul>
      <img src={country.flags.png} style={flagStyle} alt="Country flag" />
    </div>
  )
}

export default Country