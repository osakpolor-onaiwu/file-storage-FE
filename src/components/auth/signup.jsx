import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Navigation from '../layout/navbar';
import Footer from '../layout/footer';
import { LogIn } from 'react-feather';
import { } from 'reactstrap';
import { Link } from 'react-router-dom'
// import {clear_err} from '../../redux/action/err';
// import signup_action from '../../redux/action/signup';

export const Signup = ({ }) => {
    const initial_state = {
        email: "",
        password: "",
        username: "",
        msg: null,
    }

    const [state, setState] = useState(initial_state)
    const handle_change = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handle_submit = (e) => {
        e.preventDefault();
        const { email, password, username } = state;
    }

    return (
        <main >
            <Navigation />
            <section className="my-contain">
              
                <form className="auth-form" onSubmit={handle_submit}>
                    <LogIn size={44} color="#141515" />
                    <label htmlFor="email"></label>
                    <input type="email" name="email" placeholder="Email" required={true} id="email" onChange={handle_change} />
                    <label htmlFor="username"></label>
                    <input type="text" name="username" placeholder="Username" required={true} id="username" onChange={handle_change} />
                    <label htmlFor="password"></label>
                    <input type="password" name="password" placeholder="Password" required={true} id="password" onChange={handle_change} />

                    <button className="auth-button" type="submit">
                        SignUp
                    </button>
                    <p>{state.msg ? <span>{state.msg}</span> : null}</p>
                    <p>Alread have an account? <span><Link  to='/login'>Login</Link></span></p>
                </form>
            </section>

            {/* <Footer/> */}
        </main>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)