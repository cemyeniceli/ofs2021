import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import RecordList from './components/RecordList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const getPersonRecords = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(getPersonRecords, [])

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