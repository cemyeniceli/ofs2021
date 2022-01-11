import React, { useState } from 'react'
import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import RecordList from './components/RecordList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }  

  const addNewRecord = (event) =>{
    event.preventDefault()
    const isNewName = persons.every((person) => (person.name !== newName))
    if (!isNewName) {
      alert(`${newName} is already added to phonebook`)  
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')  
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <AddNewRecord name={newName}
                    onNameChange={handleNameChange}
                    number={newNumber}
                    onNumberChange={handleNumberChange}
                    addRecord={addNewRecord}
      />
      <RecordList persons={filteredPersons} />
    </div>
  )
}

export default App