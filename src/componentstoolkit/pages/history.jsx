import React, { useState, useEffect } from 'react';
import Navigation from '../layout/navbar';
import { Link, Navigate } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { history } from '../../reduxtoolkit/slices/history_slice';

const History = ({ }) => {
    const initial_state = {
        from: null,
        to: null,
        name: null,
        type: 'upload',
        page: null,
        limit: 10,
        id: null,
        msg: null,
        results: null,
        page_info: null
    }
    const [state, setState] = useState(initial_state);
    const dispatch = useDispatch();

    let { from, to, name, type, account_id, page, limit, results } = state
    useEffect(() => {
        dispatch(history(`limit=${limit}&type=${type}`))
            .unwrap()
            .then(res => {
                // console.log('history file---', res?.data?.data)
                setState({
                    ...state,
                    results: res?.data?.data?.response,
                    page_info: res?.data?.data?.page_info
                })
            })
            .catch(err => {
                setState({
                    msg: err.message
                })
            })
    }, [])

    const handle_click = () => {

    }

    const handle_delete = (id) => {
        console.log('id---', id)
        //call delete endpoint
    }

    const history_results = () => {
        const display = state.results ? (
            state.results.map(item => {
                return (
                <tr className='trow' key={item.id}>
                    <td>{item.file_name}</td>
                    {/* <td>{item.key}</td> */}
                    <td>{item.date_created}</td>
                    <td>
                        <a className='download_button' href={`${item.file_url}`} target="_blank">Download</a>
                        <a className='delete_button' href='#' onClick={(e)=>{handle_delete(item.id)}}>Delete</a>
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
    return (
        <main>
            <Navigation />
            <section className="my-contain ">
                <Row className="history_control">
                    <span>
                        <button className="history-button">Uploads</button>
                        <button className="history-button">Conversions</button>
                        <button className="history-button">Filter</button>
                    </span>
                </Row>

                <Row>
                    <table id="history_table">
                        <thead>
                            <tr>
                                <th>File name</th>
                                {/* <th>key</th> */}
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {history_results()}
                        </tbody>
                    </table>
                </Row>
            </section>

        </main>
    )
}

export default History;
