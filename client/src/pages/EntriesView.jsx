import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { EntryWrapper, Row } from '../style'
import api from '../api'

const EntryRow = Row`
    margin: 10px;
`

const Term = styled.h4.attrs({
  className: 'm-1 mt-2'
})`
  font-size: 1.75em;
`

const Definition = styled.p.attrs({
  className: 'ml-1 mr-2 mt-4'
})`
  white-space: pre-line;
`

const Update = styled.div.attrs({
  className: 'col-sm'
})`
  color: #ef9b0f;
  cursor: pointer;
`

const Delete = styled.div.attrs({
  className: 'col-sm'
})`
  color: #ff0000;
  cursor: pointer;
`

class UpdateEntry extends Component {
  updateUser = event => {
    event.preventDefault()
    window.location.href = `/entries/update/${this.props.id}`
  }

  render() {
    return <Update onClick={this.updateUser}>Update</Update>
  }
}

class DeleteEntry extends Component {
  deleteUser = event => {
    event.preventDefault()
    if (window.confirm('Do you want to delete this entry permanently?')) {
      api.deleteEntryById(this.props.id)
      window.location.href = '/entries/list'
    }
  }

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

class EntriesView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      term: '',
      definition: ''
    }
  }

  componentDidMount = async () => {
    const { id } = this.state
    const entry = await api.getEntryById(id)

    this.setState({
      term: entry.data.data.term,
      definition: entry.data.data.definition
    })
  }

  render() {
    const { term, definition, id } = this.state
    const isLoggedIn = this.props.auth.isAuthenticated

    return (
      <EntryWrapper>
        <Term>{term}</Term>
        <Definition>{definition}</Definition>
        {isLoggedIn ? (
          <EntryRow>
            <span>
              <UpdateEntry id={id} />
            </span>
            <span>
              <DeleteEntry id={id} />
            </span>
          </EntryRow>
        ) : null}
      </EntryWrapper>
    )
  }
}

EntriesView.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(EntriesView)
