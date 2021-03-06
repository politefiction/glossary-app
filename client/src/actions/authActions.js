import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types'

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://vast-peak-39324.herokuapp.com/api/users' 
  : 'http://localhost:8000/api/users'

const api = axios.create({
  withCredentials: true,
  baseURL: `${baseURL}`
})

export const registerUser = (userData, history) => dispatch => {
  api
    .post('/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const loginUser = userData => dispatch => {
  api
    .post('/login', userData)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const setUserLoading = () => dispatch => {
  return {
    type: USER_LOADING
  }
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken')
  setAuthToken(false)
  dispatch(setCurrentUser({}))
}

const userFunctions = {
  registerUser,
  loginUser,
  setCurrentUser,
  setUserLoading,
  logoutUser
}

export default userFunctions
