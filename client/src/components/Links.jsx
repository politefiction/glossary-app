import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../actions/authActions'

class Links extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const isLoggedIn = this.props.auth.isAuthenticated
    return (
      <Nav className='mr-auto'>
        <Nav.Link href='/entries/list'>Entries</Nav.Link>
        {isLoggedIn ? (
          <Nav.Link href='/entries/create'>Create Entry</Nav.Link>
        ) : (
          ''
        )}
        {isLoggedIn ? (
          <Nav.Link onClick={this.onLogoutClick}>Logout</Nav.Link>
        ) : (
          <Nav.Link href='/login'>Login</Nav.Link>
        )}
      </Nav>
    )
  }
}

Links.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Links)
