import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
  const request = 
    axios.get(baseUrl)
    return request.then(response => response.data)
}


const create = newPersonObject => {
  const request = axios.post(baseUrl, newPersonObject)
  return request.then(response => response.data)
}


const remove = personIdToDelete => {
  const request = axios.delete(`${baseUrl}/${personIdToDelete}`)
  return request
    .then(response => response.data)
}


const update = (id, newPersonObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newPersonObject)
    return request
      .then(response => response.data)
}


const service = { getAll, create, remove, update}
export default service
