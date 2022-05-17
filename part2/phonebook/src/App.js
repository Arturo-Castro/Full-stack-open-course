import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([...persons])

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
