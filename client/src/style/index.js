import styled from 'styled-components'

// General

export const Wrapper = styled.div.attrs({
  className: 'container'
})``

// Entry Lists

export const EntryWrapper = styled.div`
  margin: 0 30px;
  padding: 0 10px;
  color: #585e5e;
`

export const ListHeading = styled.h2`
  margin: 0 0 15px 5px;
`

export const EntryRow = styled.div.attrs({
  className: 'row text-nowrap'
})`
  border-radius: 2px;
  padding: 10px 5px;
  max-height: 76px;
  max-width: 1870px;
  :hover {
    background: #ddeeee;
    box-shadow: 4px 4px 5px whitesmoke;
  }
`

export const Entry = styled.div.attrs({
  className: 'text-truncate'
})`
  color: #585e5e;
  display: block;
  cursor: pointer;
`

export const Term = styled.h5`
  font-weight: bold;
`

export const Def = styled.em`
  margin: 2px 10px;
`

// Forms

export const FormWrapper = styled.div.attrs({
  className: 'form-group'
})`
  margin: 60px;
`

export const Row = styled.div.attrs({
  className: 'row'
})

export const Title = styled.h1.attrs({
  className: 'h1'
})``

export const InputText = styled.input.attrs({
  className: 'form-control'
})`
  margin: 5px;
`

export const InputArea = styled.textarea.attrs({
  className: 'form-control',
  rows: '4'
})`
  margin: 5px;
`

export const Label = styled.label`
  margin: 5px 0 -5px 0;
`

export const Button = styled.button.attrs({
  className: 'btn btn-primary'
})`
  margin: 15px 15px 15px 5px;
`

export const CancelButton = styled.a.attrs({
  className: 'btn btn-danger'
})`
  margin: 15px 15px 15px 5px;
`

export const ErrorMsg = styled.span`
  display: block;
  margin: 5px 0;
  color: red;
  font-style: italic;
  font-size: 0.9em;
`
