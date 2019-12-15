import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { EntryWrapper, ListHeading, EntryRow, Entry, Term, Def } from '../style'

function List(props) {
    const entries = props.entries
    const makeList = entries.length > 0
        ? entries.map(entry => {
            return (
                <EntryRow key={entry._id}>
                    <ListEntry entry={entry} />
                </EntryRow>
            )
        })
        : <h5>No entries found</h5>

    return (
        <div>
            {makeList}
        </div>
    )
}

class ListEntry extends Component {
    render() {
        const { entry } = this.props
        return (
            <Link to={`/entries/view/${entry._id}`} className="col" style={{ textDecoration: 'none' }}>
                <Entry>
                        <Term>{entry.term}</Term>
                        <Def>{entry.definition}</Def>
                </Entry>
            </Link>
        )
    }
}

class SearchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: this.props.match.params.query,
            entries: []
        }
    }

    componentDidMount = async () => {
        const { query } = this.state
        await api.searchEntries(query).then(entries => {
            this.setState({ entries: entries.data.data })
        })
    }
    
    render() {
        const { entries } = this.state
        return (
            <div>
                <EntryWrapper>
                    <ListHeading>Search Results</ListHeading>
                    <List entries={entries} />
                </EntryWrapper>
            </div>
        )
    }
}

export default SearchList