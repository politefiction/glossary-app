import React, { Component } from 'react'
//import { connect } from 'react-redux'
//import PropTypes from 'prop-types'
import api from '../api'
import { InputText, InputArea, FormWrapper, Label, Title, ErrorMsg, Button, CancelButton } from '../style'

class EntriesInsert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            definition: '',
            errors: {
                term: '',
                definition: ''
            }
        }
    }

    handleChangeInputTerm = async event => {
        const term = event.target.value 
        this.setState({ term })
    }

    handleChangeInputDef = async event => {
        const definition = event.target.value
        this.setState({ definition })
    }

    handleIncludeEntry = async event => {
        const { term, definition } = this.state
        const payload = { term, definition }

        await api.insertEntry(payload).then(res => {
            if (res.body) {
                window.alert(`Entry inserted successfully`)
                window.location.href = `/entries/view/${res.data.id}`
                this.setState({
                    term: '',
                    definition: '',
                    errors: {
                        term: '',
                        definition: ''
                    }
                })
            } else {               
                let resErrors = res.response.data.error.errors
                let termErr = resErrors.term ? resErrors.term.message : ''
                let defErr = resErrors.definition ? resErrors.definition.message : ''
                this.setState({
                    errors: {
                        term: termErr,
                        definition: defErr
                    }
                })
            }
        })
    }

    render() {
        const { term, definition } = this.state
        return (
            <FormWrapper>
                <Title>Create Entry</Title>

                <Label>Term: </Label>
                <InputText 
                    type="text"
                    value={term}
                    onChange={this.handleChangeInputTerm}
                />
                <ErrorMsg>{this.state.errors.term}</ErrorMsg>

                <Label>Definition: </Label>
                <InputArea 
                    value={definition}
                    onChange={this.handleChangeInputDef}
                />
                <ErrorMsg>{this.state.errors.definition}</ErrorMsg>

                <Button onClick={this.handleIncludeEntry}>Add Entry</Button>
                <CancelButton href={'/entries/list'}>Cancel</CancelButton>
            </FormWrapper>
        )
    }
}


export default EntriesInsert