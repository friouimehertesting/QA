import axios from 'axios'

const makeRequest = axios.create({
  baseURL: 'http://localhost:8800',
  withCredentials: true
})


export default makeRequest