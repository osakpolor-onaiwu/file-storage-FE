import React from 'react';
import { Navbar, NavItem, Nav, Collapse, NavbarBrand, NavbarToggler, NavbarText } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useSelector,  useDispatch, shallowEqual} from 'react-redux';
import {logout} from '../../reduxtoolkit/slices/auth_slice';

export const Loggedin_link = (props) => {
  
    const dispatch = useDispatch();

    const logout =()=>{
        const signout_object = {
            user_id: redux_state.user.user_id,
            refresh_token: localStorage.getItem('refresh_token'),
            access_token_id: ""
        }
        dispatch(logout(signout_object));
    }

    const redux_state = useSelector((mainstate) => {
        return {
            isSignedUp: mainstate.auth.signup_success,
            user: mainstate.auth.user,
        }
    },
    shallowEqual
    )

    return (
        <nav >
            <Navbar
                expand="md"
                className="my-contain"
            >
                <NavbarBrand color='#ffffff' href="/">
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
                        <NavItem className="nav-links">
                            <NavLink className="navlink-item" to="/history">
                                History
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText className="nav-links">
                        <NavLink className="navlink-item" to="/login">
                            {redux_state?.user?.username}
                        </NavLink>
                    </NavbarText>
                    <NavbarText className="nav-links">
                        <NavLink className="navlink-item" to="/signup">
                            Logout
                        </NavLink>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </nav>
    )
}

export default Loggedin_link