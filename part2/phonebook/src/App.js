import { useState, useEffect } from 'react'
import phonebookService from "./services/phonebook"

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
  const handleDelete = () => {
    if(window.confirm(`Delete ${props.person.name}?`)){
      phonebookService
        .eliminate(props.person.id)
        props.setPersons(props.persons.filter(person => person.name !== props.person.name))
    }
  }

  return(
    <div>
      {props.person.name} {props.person.number}
      <button onClick={handleDelete}>
        delete
      </button>
    </div>
  ) 
}

const Person = (props) => {
  return(
    <div>
      {props.persons.map(person => 
        <Name key={person.name} person={person} persons={props.persons} setPersons={props.setPersons}/>
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
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons([...response.data])
      })
  }, [])
  
  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    phonebookService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data).filter((item, index, self) => self.findIndex(
          (t) => {return (t.name === item.name)}) === index
        ))
      })
    persons.map((item) => {
      if(item.name === personObject.name){
        return alert(`${personObject.name} is alredy added to the phonebook`)
      }
      return "" 
    })
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
      <Person persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App;
