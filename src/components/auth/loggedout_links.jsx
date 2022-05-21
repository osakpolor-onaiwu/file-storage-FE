import React from 'react'
import { connect } from 'react-redux';
import { Navbar, NavItem, Nav, Collapse, NavbarBrand, NavbarToggler, NavbarText } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export const Loggedout_links = (props) => {
  return (
    <nav >
    <Navbar
        expand="md"
        className="my-contain"
    >
        <NavbarBrand href="/">
            FileStorage
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() { }} />
        <Collapse navbar>
            <Nav
                className="me-auto"
                navbar
            >
                <NavItem className="nav-links">
                    <NavLink className="navlink-item" to="/upload/doc">
                        Upload
                    </NavLink>
                </NavItem>

                <NavItem className="nav-links">
                    <NavLink className="navlink-item" to="/convert/doc">
                        Transform
                    </NavLink>
                </NavItem>

            </Nav>
            <NavbarText className="nav-links">
                <NavLink className="navlink-item" to="/login">
                    Login
                </NavLink>
            </NavbarText>
            <NavbarText className="nav-links">
                <NavLink className="navlink-item" to="/signup">
                    SignUp
                </NavLink>
            </NavbarText>
        </Collapse>
    </Navbar>
</nav>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Loggedout_links)