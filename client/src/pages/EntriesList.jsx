import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { EntryWrapper, ListHeading, EntryRow, Entry, Term, Def } from '../style'
import api from '../api'

class ListEntry extends Component {
  render() {
    const { entry } = this.props
    return (
      <Link
        to={`/entries/view/${entry._id}`}
        className='col'
        style={{ textDecoration: 'none' }}
      >
        <Entry>
          <Term>{entry.term}</Term>
          <Def>{entry.definition}</Def>
        </Entry>
      </Link>
    )
  }
}

class List extends Component {
  render() {
    const entries = this.props.entries
    entries.sort((a, b) => {
      let termA = a.term
      let termB = b.term
      return termA > termB ? 1 : -1
    })

    const makeList = entries.map(entry => {
      return (
        <EntryRow key={entry._id}>
          <ListEntry entry={entry} />
        </EntryRow>
      )
    })

    return <div>{makeList}</div>
  }
}

class EntriesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      isLoading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllEntries().then(entries => {
      this.setState({
        entries: entries.data.data,
        isLoading: false
      })
    })
  }

  render() {
    const { entries, isLoading } = this.state

    return (
      <EntryWrapper>
        <ListHeading>Entries</ListHeading>
        <List entries={entries} isLoading={isLoading} />
      </EntryWrapper>
    )
  }
}

export default EntriesList
