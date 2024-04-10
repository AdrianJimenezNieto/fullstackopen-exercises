import { useState } from 'react'

const Filter = ({ filter, handler}) =>
  <div>
    Filter shown with <input value={filter} onChange={handler} />
  </div>

const PersonForm = ({ handleSubmit, name, handleName, number, handleNumber }) =>
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={name} onChange={handleName}/>
    </div>
    <div>
      number: <input value={number} onChange={handleNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = ({ personsList }) => 
  <div>
    {personsList.map(person => <p key={person.id}>{person.name} {person.number} </p>)}
  </div>


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

  const addPerson = (event) => {
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

      <Filter filter={filter} handler={filterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        handleSubmit={addPerson}
        name={newName}
        handleName={nameChange}
        number={newNumber}
        handleNumber={numberChange}
      />

      <h3>Numbers</h3>

      <Persons personsList={namesToShow} />

    </div>
  )
}

export default App