import React, { Component } from 'react'
import styled from 'styled-components'
import { Navbar } from 'react-bootstrap'
//import Logo from './Logo' //find open source logo?
import Links from './Links'
import SearchBar from './SearchBar'

const borderColor = "#99bfb3"

const navStyle = {
    "borderTop": `7px solid ${borderColor}`,
    "borderBottom": `7px solid ${borderColor}`
}

const Container = styled.div`
    margin-bottom: 20px;
`

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: false
        }
    }

    render() {
        return(
            <Container>
                <Navbar collapseOnSelect expand="lg" style={navStyle}>
                    <p />
                    <Navbar.Brand href="/" style={{"color": "#585E5E"}}>Web Dev Glossary</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Links />
                        <SearchBar />
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}

export default NavBar