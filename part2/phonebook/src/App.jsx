import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
    if (filter != '') {
      setShowAll(false)
    }
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook.`)
    }
    else if (newName === '' || newNumber === '') {
      alert('Please fill al the fields.')
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const namesToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input value={filter} onChange={filterChange} />
      </div>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={nameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {namesToShow.map(person => <p key={person.id}>{person.name} {person.number} </p>)}
      </div>
    </div>
  )
}

export default App