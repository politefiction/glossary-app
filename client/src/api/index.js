import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

if (localStorage.jwtToken) setAuthToken(localStorage.jwtToken)

const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://vast-peak-39324.herokuapp.com'
  : 'http://localhost:8000/api'

const api = axios.create({
  withCredentials: true,
  baseURL: `${baseURL}`
})

export const insertEntry = payload =>
  api.post(`/entry`, payload).catch(err => err)
export const getAllEntries = () => api.get(`/entries`)
export const updateEntryById = (id, payload) =>
  api.put(`/entry/${id}`, payload).catch(err => err)
export const deleteEntryById = id => api.delete(`/entry/${id}`)
export const getEntryById = id => api.get(`/entry/${id}`)
export const searchEntries = query => api.get(`/entries/${query}`)

const apis = {
  insertEntry,
  getAllEntries,
  updateEntryById,
  deleteEntryById,
  getEntryById,
  searchEntries
}

export default apis
