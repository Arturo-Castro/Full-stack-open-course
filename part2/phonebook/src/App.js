import { useState, useEffect } from 'react'
import phonebookService from "./services/phonebook"
import "./index.css"

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
        .catch(error => {
          props.setMessage(
            `${props.person.name} was already removed from server`
          )
          setTimeout(() => {
            props.setMessage(null)
          }, 5000)
        })
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
        <Name key={person.name} person={person} persons={props.persons} setPersons={props.setPersons} setMessage={props.setMessage}/>
      )}
    </div>
  )
}

const Notification = (props) => {
  if(props.message === null){
    return null
  } else if((props.message.includes("Added")) || (props.message.includes("Replaced"))){
      return(
        <div className='success'>
          {props.message}
        </div>
      )
    } else {
      return(
        <div className='error'>
          {props.message}
        </div>
      )
    }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [Message, setMessage] = useState(null)

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
      number: newNumber
    }

    if(persons.some(person => person.name === personObject.name)){
      if(window.confirm(`${personObject.name} is alredy added to the phonebook, replace the old number with a new one?`)){
        const index = persons.findIndex(person => {
          return person.name === personObject.name
        })
        phonebookService
          .replace(persons[index].id, personObject)  
        const newPerson = persons.map((person) => {
          if (person.name === personObject.name) {
             
            return {...person, name: newName, number: newNumber}
          } else {
            return person
          }
        })
        setPersons(newPerson)
        setMessage(`Replaced ${persons[index].name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
      
    } else {
      phonebookService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    }
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
      <Notification message={Message}/>
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
      <Person persons={persons} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App;
