import { useState, useEffect } from "react"

import countryService from './services/Countries'

import Filter from "./components/Filter"
import Countries from "./components/Countries"
import Country from "./components/Country"

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [countryToShow, setCountryToShow] = useState(null)
  const [search, setSearch] = useState(null)

  
  useEffect(() => {
    if (search) {
      let newCountries = []

      countryService
      .getAll()
      .then(initCountries => {
        initCountries.map(country => {
          newCountries.push(country.name.common)
        })
        newCountries = newCountries.filter(country => 
          country.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        if (newCountries.length <= 10 && newCountries.length !== 1) {
          setCountries(newCountries)
          setCountryToShow(null)
        }
        else if (newCountries.length === 1) {
          countryService
          .getCountry(newCountries[0].toLocaleLowerCase())
          .then(country => setCountryToShow(country))
          setCountries(null)
        }
        else {
          setCountries(null)
          setCountryToShow(null)
        }
      })
    }
  }, [search])
  
  const handleFilter = (e) => {
    const newSearch = e.target.value
    setValue(e.target.value)
    if (newSearch === '') {
      setSearch(null)
    }
    else {
      setSearch(newSearch)
    }
  }

  return (
    <div>
      <Filter value={value} handler={handleFilter} />

      {
        !search ?
        null
        :countries ?
          <Countries countries={countries} />
          :
          countryToShow ?
            <Country country={countryToShow} />
            : <p>Too many matches, specify another filter.</p>
      }
    </div>
  )
}

export default App