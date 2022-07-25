import React, { useState } from 'react'
import Navigation from '../layout/navbar';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../layout/footer';
import { signup } from '../../reduxtoolkit/slices/auth_slice';
import { LogIn } from 'react-feather';
import { Link, Navigate } from 'react-router-dom'

const SignUp = () => {
  const init_state = {
    email: "",
    password: "",
    username: "",
    msg: null,
  }
  const [state, setState] = useState(init_state)
  const handle_change = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };


  const dispatch = useDispatch();

  const handle_submit = (e) => {
    e.preventDefault();
    const { email, password, username } = state;
    const newUser = {
      username,
      email,
      password,
    };
    dispatch(signup(newUser)).unwrap().then().catch(err => {

      setState({ 
        msg: err.message
      })
    })
  }

  const redux_state = useSelector((mainstate) => {
    return {
      isSignedUp: mainstate.auth.signup_success,
      error: mainstate.error
    }
  })

  const { isSignedUp } = redux_state;
  
  if (isSignedUp) {
    return <Navigate to="/login" />;
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
          <p>{state.msg ? <span className="error">{state.msg}</span> : null}</p>
          <p>Alread have an account? <span><Link to='/login'>Login</Link></span></p>
        </form>
      </section>

      {/* <Footer/> */}
    </main>
  )
}

export default SignUp