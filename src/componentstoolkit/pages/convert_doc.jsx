import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import Navigation from '../layout/navbar';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../layout/footer';
import { convert_doc } from '../../reduxtoolkit/slices/convert_doc_slices';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { } from 'react-feather';
import { Row, Col } from 'reactstrap';

const Convert_doc = ({ }) => {
  const initial_state = {
    raw_data: null,
    url: null,
    name: null,
    type: null,
    from: null,
    to: null,
    file: null,
    msg: null,
    none: 1
  }

  const [state, setState] = useState(initial_state)
  const handle_change = (e) => {
    let file_upload = null;
    if (e.target.files) file_upload = e.target.files[0];

    setState({
      ...state,
      [e.target.name]: e.target.value,
      file: file_upload
    })
  }

  const dispatch = useDispatch();
  const handle_submit = (e) => {
    e.preventDefault();
    const { from, to, raw_data, url,type, name, file } = state;
    console.log(state)
    const formData = new FormData();

    if (from) formData.append('from', from);
    if (to) formData.append('to', to);
    if (url) formData.append('url', url);
    if (raw_data) formData.append('raw_data', raw_data);
    if (name) formData.append('name', name);
    if (type) formData.append('type', type);
    if (file) formData.append('file', file);
    dispatch(convert_doc(formData))
    .unwrap()
    .then()
    .catch(err => {
      setState({
        msg: err.message
      })
    })
  }

  const redux_state = useSelector((mainstate) => {
    return {
      isAuthenticated: mainstate.auth.isAuthenticated
    }
  })

  const is_uploaded = () => {
    if (state.none) return null;

  }
  const { isAuthenticated } = redux_state;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <main>
      <Navigation />
      <section className="my-contain ">
        <Row className="upload">
          <span>
            <Link to='/convert/doc' className='page-button'> Convert Document </Link>
            <Link to="/convert/image" className='page-button'>Convert Image</Link>
          </span>

        </Row>
        <Row className='main-body'>

          <Col lg={6} xs={12} md={5} className='left-col'>
            <form onSubmit={handle_submit} >
              <section>
                <div>
                  <label htmlFor="type">Type</label>
                  <select name="type" className="from-to types" id="type" required={true} onChange={handle_change}>
                    <option value="json">json</option>
                    <option value="csv">csv</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="from">From</label>
                  <select name="from" className="from-to types" id="from" required={true} onChange={handle_change}>
                    <option value="json">json</option>
                    <option value="csv">csv</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="to">To</label>
                  <select name="to" className="from-to types" id="to" required={true} onChange={handle_change}>
                    <option value="json">json</option>
                    <option value="csv">csv</option>
                  </select>
                </div>

              </section>
              <label htmlFor="name">Name of file</label>
              <input type="text" name="name" required={true} id="name" onChange={handle_change} />
              <label htmlFor="url">Url</label>
              <input type="url" name="url" id="url" onChange={handle_change} />
              <label htmlFor="raw_data">Raw data</label>
              <textarea name="raw_data" id="raw_data" cols="30" rows="7" onChange={handle_change}></textarea>
              <div className="button-wrap">
                <label htmlFor="file" className="new-button">File</label>
                <input type="file" name="file" id="file" onChange={handle_change} />
              </div>
              <button type="submit" className='submit-button'>Convert</button>
              <p>{state.msg ? <span className="error">{state.msg}</span> : null}</p>
            </form>


          </Col>

          <Col lg={6} xs={12} md={7} className='right-col'>
            <div><h2>progress bar go here</h2></div>
            {/* spinner */}
            <div class="lds-spinner">
              <div></div><div></div><div></div>
            </div>
            <h5>Upload in progress</h5>
          </Col>
        </Row>
      </section>

      {/* <Footer/> */}
    </main>
  )
}

export default Convert_doc