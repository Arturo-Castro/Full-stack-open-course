import { useState, useEffect } from 'react'
import axios from "axios"

const Filter = (props) => {
  return(
    <div>
      filter shown with <input onChange={props.handleFilterChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return(
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Name = (props) => {

  return(
    <div>{props.person.name} {props.person.number}</div>
  ) 
}

const Person = (props) => {
  return(
    <div>
      {props.persons.map(person => 
        <Name key={person.name} person={person}/>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
        setFilteredPersons([...persons])
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: Date.now()
    }
    persons.map((item) => {
      if(item.name === personObject.name){
        return alert(`${personObject.name} is alredy added to the phonebook`)
      }
      return "" 
    })
    setPersons(persons.concat(personObject).filter((item, index, self) => self.findIndex(
      (t) => {return (t.name === item.name)}) === index
    ))
    setFilteredPersons([...persons, personObject])
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setPersons(filteredPersons.filter(item => item.name.toLocaleLowerCase().includes((e.target.value).toLocaleLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person persons={persons}/>
    </div>
  )
}

export default App;
