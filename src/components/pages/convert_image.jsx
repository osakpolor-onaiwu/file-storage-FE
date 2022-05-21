import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react'
import Navigation from '../layout/navbar';
import Footer from '../layout/footer';
import { } from 'react-feather';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

const Upload_image = (props) => {
  const initial_state = {
    type: "json",
    url: "",
    from: null,
    to: null,
    file: "",
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
    const { type, raw_data, url, name, file } = state;
    console.log(state)
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

          <Col lg={6} xs={12} md={5} >
            <form onSubmit={handle_submit} className='right-col'>
              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" onChange={handle_change} />
              <label htmlFor="url">Url</label>
              <input type="url" name="url" id="url" onChange={handle_change} />
              <label htmlFor="type">Type</label>
              <select name="type" id="type" required={true} onChange={handle_change} defaultValue={state.type} className="types">
                <option value="jpeg">jpeg</option>
                <option value="png">png</option>
                <option value="svg">svg</option>
              </select>
              <span>
              <label htmlFor="from">From</label>
              <select name="from" className="from-to" id="from" required={true} onChange={handle_change}>
                <option value="json">json</option>
                <option value="csv">csv</option>
              </select>
              <label htmlFor="to">To</label>
              <select name="to"  className="from-to"  id="to" required={true} onChange={handle_change}>
                <option value="json">json</option>
                <option value="csv">csv</option>
              </select>
              </span>
              <button type="submit" className='submit-button'>Convert</button>
            </form>
          </Col>

          <Col lg={6} xs={12} md={7}>
            //progress bar go here
          </Col>
        </Row>
      </section>

      {/* <Footer/> */}
    </main>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Upload_image)