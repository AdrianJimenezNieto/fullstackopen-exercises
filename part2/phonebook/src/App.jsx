import { useState, useEffect } from 'react'
import personService from './services/Persons'

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

const Persons = ({ personsList, handler }) => 
  <div>
    {personsList.map((person, i) =>
      <p key={person.id}>
        {person.name} {person.number}
        <button key={person.id} onClick={() => handler(person.id)}>Delete</button>
      </p>
    )}
  </div>


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  })

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

  const editNumber = (id) => {
    const person = persons.find(person => person.id === id)
    if (confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      const updatePerson = {
        ...person,
        number: newNumber
      }

      personService
        .update(person.id, updatePerson)
        .then(newPerson => {
          setPersons(persons.map(person => person.id !== id ? person : newPerson))
        })
    }
  } 

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      const id = persons.find(person => person.name === newName).id
      editNumber(id)
    }
    else if (newName === '' || newNumber === '') {
      alert('Please fill al the fields.')
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const deleteItem = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete ${deleteItem.name}`)) {
      personService
        .deletePerson(id)
        .then(returned => setPersons(persons.filter(person => person.id !== returned.id)))
    }
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

      <Persons personsList={namesToShow} handler={deletePerson} />

    </div>
  )
}

export default App