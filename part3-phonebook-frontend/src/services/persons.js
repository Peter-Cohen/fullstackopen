import axios from 'axios'


const baseUrl = '/api/persons'


const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then(response => response.data)

  // For debugging only: replace previous two lines with the following:
  // const nonExisting = {
  //   id: 10000,
  //   name: 'Not on server',
  //   number: 'aaaaa'
  // }
  // return request.then(response => response.data.concat(nonExisting))
}


const create = (newName, newNumber) => {
  const personsObject = {
    name: newName,
    number: newNumber
  }
  const request = axios.post(baseUrl, personsObject)
  return request.then(response => response.data)
}


const deleteOne = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}


const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}


export default { getAll, create, deleteOne, update }