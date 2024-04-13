const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((country, i) => 
        <p key={i}>{country}</p>
      )}
    </div>
  )
}

export default Countries