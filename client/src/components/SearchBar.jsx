import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form.attrs({
    className: 'form-inline my-2 my-lg-0'
})``

const Input = styled.input.attrs({
    className: 'form-control mr-sm-2',
    name: 'query',
    type: 'search',
    placeholder: 'Search...'
})``

const Button = styled.button.attrs({
    className: 'btn btn-outline-secondary my-2 my-sm-0',
    type: 'submit'
})``

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ""
        }
    }

    saveTerm = (event) => {
        this.setState({ 
            searchTerm: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        window.location.href = `/entries/search/${this.state.searchTerm}`
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Input onChange={this.saveTerm} />
                <Button>Search</Button>
            </Form>      
        )
    }
}


export default SearchBar