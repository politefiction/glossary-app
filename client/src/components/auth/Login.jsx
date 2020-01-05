import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Wrapper, Label, InputText, Button, ErrorMsg } from '../../style'
import { loginUser } from '../../actions/authActions'

const Column = styled.div.attrs({
  className: 'col-sm'
})``

const FormGroup = styled.div.attrs({
  className: 'form-group'
})`
  margin-top: 10px;
`

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.auth.isAuthenticated) {
      props.history.push('/dashboard')
    }

    if (props.errors) {
      return {
        errors: props.errors
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData)
  }

  render() {
    const { email, password, errors } = this.state

    return (
      <Wrapper>
        <Column>
          <form noValidate onSubmit={this.onSubmit}>
            <h4>Login Below</h4>
            <FormGroup>
              <InputText
                onChange={this.onChange}
                value={email}
                error={errors.email}
                id='email'
                type='email'
                className={classnames({
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <Label htmlFor='email'>Email</Label>
              <ErrorMsg>
                {errors.email}
                {errors.emailnotfound}
              </ErrorMsg>
            </FormGroup>
            <FormGroup>
              <InputText
                onChange={this.onChange}
                value={password}
                error={errors.password}
                id='password'
                type='password'
                className={classnames('', {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <Label htmlFor='password'>Password</Label>
              <ErrorMsg>
                {errors.password}
                {errors.passwordincorrect}
              </ErrorMsg>
            </FormGroup>
            <Button>Login</Button>
          </form>
        </Column>
      </Wrapper>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
