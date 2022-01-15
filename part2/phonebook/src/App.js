import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddNewRecord from './components/AddNewRecord'
import RecordList from './components/RecordList'
import Notification from './components/Notification'
import phoneBookService from './services/phoneBookService'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({type:'success', content:''})

  const getPersonRecords = () => {
    phoneBookService
      .getAll()
      .then(response => {
        setPersons(response)
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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const personToUpdateId = personToUpdate.id
        const updatedPerson = {...personToUpdate, number:newNumber}
        phoneBookService
          .update(personToUpdateId, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== personToUpdateId ? person : response))
            setMessage({type:'success', content:`Number for ${updatedPerson.name} has changed to ${updatedPerson.number}`})
            setTimeout(() => {
              setMessage({type:'success', content:''})
            },5000)
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== personToUpdateId))
            setMessage({type:'error', content:`${updatedPerson.name} is already deleted`})
            setTimeout(() => {
              setMessage({type:'success', content:''})
            },5000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phoneBookService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setMessage({type:'success', content:`Added ${newPerson.name}`})
          setTimeout(() => {
            setMessage({type:'success', content:''})
          },5000)
        })
        .catch(error => setMessage({type:'error', content:error.response.data}))
    }
    setNewName('')
    setNewNumber('')  
  }

  const deleteRecord = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phoneBookService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(error => setMessage({type:'error', content:`${personToDelete.name} is already deleted`}))
    }
  }

  const handleDeleteClick = (id) => {
    const handler = () => deleteRecord(id)
    return handler
  }

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <AddNewRecord name={newName}
                    onNameChange={handleNameChange}
                    number={newNumber}
                    onNumberChange={handleNumberChange}
                    addRecord={addNewRecord}
      />
      <RecordList persons={filteredPersons} onDelete={handleDeleteClick} />
    </div>
  )
}

export default App