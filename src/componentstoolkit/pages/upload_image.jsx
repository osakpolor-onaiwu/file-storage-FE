import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react'
import Navigation from '../layout/navbar';
import Footer from '../layout/footer';
// import { } from 'react-feather';
import { upload_img } from '../../reduxtoolkit/slices/upload_img_slices';
import { Row, Col } from 'reactstrap';
import { Link , Navigate } from 'react-router-dom'

const Upload_image = (props) => {
  const initial_state = {
    type: "jpeg",
    url: null,
    name: null,
    file: null,
    msg: null,
    none: 1
  }

  const [state, setState] = useState(initial_state)
  const handle_change = (e) => {
    let file_upload = null;
    if (e.target.files) file_upload = e.target.files[0];

    setState((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
        file: file_upload
      }
    })
  }

  const dispatch = useDispatch();
  const handle_submit = (e) => {
    e.preventDefault();
    const { type, url, name, file } = state;
    const formData = new FormData();
    console.log(state)

    if (url) formData.append('url', url);
    if (name) formData.append('name', name);
    if (type) formData.append('type', type);
    if (file) formData.append('file', file);
    dispatch(upload_img(formData))
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
            <Link to='/upload/doc' className='page-button'> Document Upload</Link>
            <Link to="/upload/image" className='page-button'>Image Upload</Link>
          </span>

        </Row>
        <Row className='main-body'>

          <Col lg={6} xs={12} md={5} className='left-col'>
            <form onSubmit={handle_submit} >
              <label htmlFor="type">Type</label>
              <select name="type" id="type" required={true} onChange={handle_change} defaultValue={state.type} className="types">
                <option value="jpeg">jpeg</option>
                <option value="png">png</option>
                <option value="svg">svg</option>
              </select>
              <label htmlFor="name">Name of file</label>
              <input type="text" name="name" required={true} id="name" onChange={handle_change} />
              <label htmlFor="url">Url</label>
              <input type="url" name="url" id="url" onChange={handle_change} />
              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" onChange={handle_change} />
              <button type="submit" className='submit-button'>Upload</button>

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

export default Upload_image;