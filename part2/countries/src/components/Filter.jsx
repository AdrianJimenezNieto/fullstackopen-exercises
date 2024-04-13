const Filter = ({ value, handler }) => {

  const divStyle = {
    display: 'flex',
    gap: 10,
    alignItems: 'center'
  }

  const inputStyle = {
    maxHeight: '1rem',
  }

  return (
    <div style={divStyle}>
      <p>
        Find countries 
      </p>
      <input style={inputStyle} value={value} onChange={handler}/>
    </div>
  )
}

export default Filter