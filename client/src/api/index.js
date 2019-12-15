import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

if (localStorage.jwtToken) setAuthToken(localStorage.jwtToken)

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8000/api'
})

export const insertEntry = payload => api.post(`/entry`, payload)
export const getAllEntries = () => api.get(`/entries`)
export const updateEntryById = (id, payload) => api.put(`/entry/${id}`, payload)
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