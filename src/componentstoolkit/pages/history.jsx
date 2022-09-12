import React, { useState, useEffect } from 'react';
import Navigation from '../layout/navbar';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../layout/footer';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { history, deletes } from '../../reduxtoolkit/slices/history_slice';

const History = ({ }) => {
    const initial_state = {
        from: '',
        to: '',
        name: null,
        type: '',
        page: undefined,
        limit: 10,
        id: undefined,
        msg: null,
        results: [],
        page_info: null,
        isOpen: false
    }

    const [state, setState] = useState(initial_state);
    const dropdown = () => {
        setState({ ...state, isOpen: !state.isOpen })
    }

    const dispatch = useDispatch();
    let { from, to, name, type, page, limit, id, results } = state;
    let query = `limit=${limit}`;
    useEffect(() => {
        dispatch(history(query))
            .unwrap()
            .then(res => {
                setState({
                    ...initial_state,
                    results: res?.data?.data?.response,
                    page_info: res?.data?.data?.page_info
                })
            })
            .catch(err => {
                setState({
                    ...initial_state,
                    msg: err.message
                })
            })
    }, []);

    const handle_delete = (id) => {
        dispatch(deletes(id)).unwrap()
            .then(res => {
                setState({
                    ...initial_state,
                })
            })
            .catch(err => {
                setState({
                    ...initial_state,
                    msg: err.message
                })
            })
    }

    const handle_change = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handle_submit = (e) => {
        e.preventDefault();

        if(from)query+=`&from=${from}`;
        if(to)query+=`&to=${to}`;
        if(name)query+=`&name=${name}`;
        if(page)query+=`&page=${page}`;
        if(type)query+=`&type=${type}`;
        console.log('query----',query);
        dispatch(history(query))
            .unwrap()
            .then(res => {
                setState({
                    ...initial_state,
                    results: res?.data?.data?.response,
                    page_info: res?.data?.data?.page_info,
                    isOpen: false
                })
            })
            .catch(err => {
                setState({
                    ...initial_state,
                    msg: err.message,
                    isOpen: false
                })
            })

    }

    const history_results = () => {
        const display = state.results ? (
            state.results.map(item => {
                return (
                    <tr className='trow' key={item.id}>
                        <td>{item.file_name}</td>
                        <td>{item.type}</td>
                        <td>{item.date_created}</td>
                        <td>
                            <a className='download_button' href={`${item.file_url}`} target="_blank">Download</a>
                            <a className='delete_button' href='#' onClick={(e) => { handle_delete(item.id) }}>Delete</a>
                        </td>
                    </tr>
                )
            })
        ) : (
            <tr>
                <td colSpan="4">
                    no results found
                </td>
            </tr>)
        return display
    }
    // console.log('state---', state)
    return (
        <main>
            <Navigation />
            <section className="my-contain ">
                <Row id="filters">
                    <ul id='t-filter'>
                        <li>Total returned: {state.page_info ? state?.page_info?.total_volume : 0}</li>
                        <li onClick={dropdown} className="filter_button">Filter</li>
                        {state.isOpen ? <div className='dropdown-content'>

                            <form className='dropdown-form' onSubmit={handle_submit}>
                                <div className='text-filter'>
                                    <label htmlFor="name">file name</label>
                                    <input type="text" name="name" onChange={handle_change} />
                                </div>
                                <div className='select-div'>
                                    <label htmlFor="type">Type</label>
                                    <select name="type" onChange={handle_change} className="types">
                                        <option value="document upload">Document upload</option>
                                        <option value="image upload">Image upload</option>
                                        <option value="document conversion">Document conversion</option>
                                        <option value="image conversion">Image conversion</option>
                                    </select>
                                </div>
                                <div className='timestamp'>
                                    <div>
                                        <label htmlFor="from">from</label>
                                        <input type="date" name="from" onChange={handle_change} />
                                    </div>
                                    <div>
                                        <label htmlFor="to">to</label>
                                        <input type="date" name="to" onChange={handle_change} />
                                    </div>
                                </div>
                                <div className='apply-button'><button type="submit">Apply</button></div>
                                
                            </form>
                        </div> : null}
                    </ul>

                </Row>

                <Row id="history_table_row">
                    <div>
                        <table id="history_table">
                            <thead>
                                <tr>
                                    <th>File name</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {history_results()}
                            </tbody>
                        </table>
                    </div>

                </Row>
            </section>
            <Footer />
        </main>
    )
}

export default History;
