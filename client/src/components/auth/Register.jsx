import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { registerUser } from '../../actions/authActions'

const Wrapper = styled.div.attrs({
    className: "container"
})``

const Row = styled.div.attrs({
    className: "row"
})``

const Column = styled.div.attrs({
    className: "col-sm"
})``

const FormGroup = styled.div.attrs({
    className: "form-group"
})``

const Input = styled.input.attrs({
    className: "form-control"
})``

const ErrorMsg = styled.span`
    display: block;
    margin-top: -10px;
    color: red;
    font-style: italic;
    font-size: 0.9em;
`

const Button = styled.button.attrs({
    className: "btn btn-primary",
    type: "submit"
})``

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: "",
            passwordval: "",
            adminCode: "",
            errors: {}
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.errors) {
            return {
                errors: props.errors
            }
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard")
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        const { username, email, password, passwordval, adminCode } = this.state
        const newUser = {
            username: username,
            email: email,
            password: password,
            passwordval: passwordval,
            adminCode: adminCode
        }
        this.props.registerUser(newUser, this.props.history)
    }

    
    render () {
        const { username, email, password, passwordval, adminCode, errors } = this.state

        return (
            <Wrapper>
                <Row>
                    <Column>
                        <Column>
                            <h4><b>Register</b> below</h4>
                            <p>Already have an account? <Link to="/login"> Login </Link></p>
                        </Column>
                        <form noValidate onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Input 
                                    onChange={this.onChange}
                                    value={username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                    className={classnames("", {invalid: errors.username})}
                                />
                                <label htmlFor="username">Username</label>
                                <ErrorMsg>{errors.username}</ErrorMsg>
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    onChange={this.onChange}
                                    value={email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {invalid: errors.email})}
                                />
                                <label htmlFor="email">Email</label>
                                <ErrorMsg>{errors.email}</ErrorMsg>
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    onChange={this.onChange}
                                    value={password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {invalid: errors.password})}
                                />
                                <label htmlFor="password">Password</label>
                                <ErrorMsg>{errors.password}</ErrorMsg>
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    onChange={this.onChange}
                                    value={passwordval}
                                    error={errors.passwordval}
                                    id="passwordval"
                                    type="password"
                                    className={classnames("", {invalid: errors.passwordval})}
                                />
                                <label htmlFor="passwordval">Confirm Password</label>
                                <ErrorMsg>{errors.passwordval}</ErrorMsg>
                            </FormGroup>
                            <FormGroup>
                                <Input 
                                    onChange={this.onChange}
                                    value={adminCode}
                                    error={errors.adminCode}
                                    id="adminCode"
                                    type="text"
                                    className={classnames("", {invalid: errors.adminCode})}
                                />
                                <label htmlFor="adminCode">Admin Code</label>
                                <ErrorMsg>{errors.adminCode}</ErrorMsg>
                            </FormGroup>
                            <Button>Sign up</Button>
                        </form>
                    </Column>
                </Row>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register))