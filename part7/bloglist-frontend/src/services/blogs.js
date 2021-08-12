import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get('/api/blogs')
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const update = async newBlog => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll , create, setToken, update, remove }
