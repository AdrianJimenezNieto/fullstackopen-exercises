const Countries = ({ countries, handler }) => {

  const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    height: 25,
    alignItems: 'center'
  }
  return (
    <div>
      {countries.map((country, i) => 
        <div style={divStyle} key={i}>
          <p>{country}</p>
          <button id={country} onClick={handler}>Show</button>
        </div>
      )}
    </div>
  )
}

export default Countries