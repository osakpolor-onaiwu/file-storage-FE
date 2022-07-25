import React, { useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../layout/navbar';
import Footer from '../layout/footer';
import {login, user} from '../../reduxtoolkit/slices/auth_slice'
import { Link, Navigate } from 'react-router-dom';
import { LogIn } from 'react-feather';

const Login =()=> {
  const init_state = {
    email: "",
    password: "",
    msg: null,
  };

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
    const { email, password } = state;
    const logging_user = { email, password };
    dispatch(login(logging_user)).unwrap().then(res=>{
      dispatch(user())
    }).catch(err=>{
      setState({ 
        msg: err.message
      })
    })  
  };
  //useSelector functions as mapStateToProps
  const redux_state = useSelector((mainstate)=>{
    return{
        isAuthenticated:mainstate.auth.isAuthenticated,
        error: mainstate.error
    }
  })

    const { isAuthenticated } = redux_state;
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }

    return (
      <main>
        <Navigation />
        <section className="my-contain">

          <form className="auth-form" onSubmit={handle_submit}>
            <LogIn size={44} color="#141515" />
            <label htmlFor="email"></label>
            <input type="email" name="email" placeholder="Email" required={true} id="email" onChange={handle_change} />
            <label htmlFor="password"></label>
            <input type="password" autoComplete='true' name="password" placeholder="Password" required={true} id="password" onChange={handle_change} />
            <button className="auth-button" type="submit">
              Login
            </button>
            <p>{state.msg ? <span className="error">{state.msg}</span> : null}</p>
            <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>
          </form>
        </section>
        {/* <Footer/> */}
      </main>
    )
}

export default Login