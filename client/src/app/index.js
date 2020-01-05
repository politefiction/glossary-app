import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from '../store'
import { NavBar } from '../components'
import { Register, Login } from '../components/auth'
import {
  EntriesList,
  EntriesInsert,
  EntriesUpdate,
  EntriesView,
  EntriesSearch,
  Main
} from '../pages'
import { setCurrentUser, logoutUser } from '../actions/authActions'
import PrivateRoute from '../components/private-route/PrivateRoute'
import Dashboard from '../components/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'

if (localStorage.jwtToken) {
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = './login'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/entries/list' exact component={EntriesList} />
          <PrivateRoute
            path='/entries/create'
            exact
            component={EntriesInsert}
          />
          <PrivateRoute
            path='/entries/update/:id'
            exact
            component={EntriesUpdate}
          />
          <Route path='/entries/view/:id' exact component={EntriesView} />
          <Route
            path='/entries/search/:query'
            exact
            component={EntriesSearch}
          />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
