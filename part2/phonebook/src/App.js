import { useState } from 'react'

const Name = (props) => {
  return(
    <div>{props.person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName
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
    setNewName("")
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Name key={person.name} person={person}/>
      )}
    </div>
  )
}

export default App;