import axios from "axios";

const url = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(url)
}

const create = newPerson => {
  return axios.post(url, newPerson)
}

const eliminate = id => {
  return axios.delete(`http://localhost:3001/persons/${id}`)
} 

export default { getAll, create, eliminate }