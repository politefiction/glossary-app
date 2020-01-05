import React, { Component } from 'react'
import api from '../api'
import {
  InputText,
  InputArea,
  FormWrapper,
  Label,
  Title,
  ErrorMsg,
  Button,
  CancelButton
} from '../style'

class EntriesUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
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

  handleUpdateEntry = async event => {
    const { id, term, definition } = this.state
    const payload = { term, definition }

    await api.updateEntryById(id, payload).then(res => {
      if (res.status === 200) {
        window.alert(`Entry updated successfully`)
        window.location.href = `/entries/view/${this.state.id}`
        this.setState({
          term: '',
          definition: ''
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

  componentDidMount = async () => {
    const { id } = this.state
    const entry = await api.getEntryById(id)

    this.setState({
      term: entry.data.data.term,
      definition: entry.data.data.definition
    })
  }

  render() {
    const { term, definition } = this.state

    return (
      <FormWrapper>
        <Title>Update Entry</Title>

        <Label>Term: </Label>
        <InputText
          type='text'
          value={term}
          onChange={this.handleChangeInputTerm}
        />
        <ErrorMsg>{this.state.errors.term}</ErrorMsg>

        <Label>Definition: </Label>
        <InputArea value={definition} onChange={this.handleChangeInputDef} />
        <ErrorMsg>{this.state.errors.definition}</ErrorMsg>

        <Button onClick={this.handleUpdateEntry}>Update Entry</Button>
        <CancelButton href={'/entries/list'}>Cancel</CancelButton>
      </FormWrapper>
    )
  }
}

export default EntriesUpdate
