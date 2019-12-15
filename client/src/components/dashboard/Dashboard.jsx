import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Wrapper, Button } from '../../style'
import { logoutUser } from '../../actions/authActions'

const Row = styled.div.attrs({
    className: 'row'
})``

const Column = styled.div.attrs({
    className: "col-sm"
})``

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault()
        this.props.logoutUser()
    }

    render() {
        const { user } = this.props.auth

        return (
            <Wrapper>
                <Row>
                    <Column>
                        <h4>
                            <b>Welcome, {user.username}!</b>
                            <p>You are now logged in.</p>
                        </h4>
                        <Button onClick={this.onLogoutClick}>Logout</Button>
                    </Column>
                </Row>
            </Wrapper>
        )
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard)