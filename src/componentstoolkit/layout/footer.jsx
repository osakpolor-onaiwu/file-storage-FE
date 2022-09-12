import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Row, Col } from 'reactstrap';
import {Facebook, Mail} from 'react-feather'
//import feedback actions here

const Footer = ({ }) => {
    const initial_state = {
        feedbacktype: "question",
        feedback: "",
        msg: null,
    };

    const [state, setState] = useState(initial_state);
    const handle_change = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const dispatch = useDispatch();
    const handle_submit = (e) => {
        e.preventDefault();

        dispatch()
            .unwrap()
            .then()
            .catch(err => {
                setState({
                    msg: err.message
                })
            })
    }
    return (
        <main id='footer'>
            <Row className='my-contain'>
                <Col  sm={12} md={6} lg={6}>
                    <ul>
                        <li><NavLink className='footer-link' to="/faq">Faq</NavLink></li>
                        <li><NavLink className='footer-link' to="/about">About</NavLink></li>
                        <li><NavLink className='footer-link' to="/pricing">Pricing</NavLink></li>
                        <li><NavLink className='footer-link' to="/">Faq</NavLink></li>
                    </ul>
                    <div id='socials'>
                        <Facebook className='social'/>
                        <Mail className='social'/>
                    </div>
                   
                </Col>
                <Col  sm={12} md={6} lg={6}>
                    <form onSubmit={handle_submit}>
                        <label htmlFor="feedbacktype">Feedback type</label>
                        <select name="feedbacktype" className="feedback" id="to" required={true} onChange={handle_change}>
                            <option value="complaint">Complaint</option>
                            <option value="question">Questions</option>
                            <option value="suggestion">Suggestions</option>
                        </select>
                        <label htmlFor="feedback">Feedback</label>
                        <textarea name="feedback" id="feedback" cols="10" rows="5"></textarea>
                    </form>
                </Col>
            </Row>
        </main>
    )
}

export default Footer;