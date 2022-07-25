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
    name: null,
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
            <Link to='/convert/doc' className='page-button'> Convert Document </Link>
            <Link to="/convert/image" className='page-button'>Convert Image</Link>
          </span>

        </Row>
        <Row className='main-body'>

          <Col lg={6} xs={12} md={5} className='left-col'>
            <form onSubmit={handle_submit}>
              <section>
                <div>
                  <label htmlFor="type">Type</label>
                  <select name="type" id="type" className="from-to types" required={true} onChange={handle_change} defaultValue={state.type}>
                    <option value="jpeg">jpeg</option>
                    <option value="png">png</option>
                    <option value="svg">svg</option>
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

              <label htmlFor="file">File</label>
              <input type="file" name="file" id="file" onChange={handle_change} />
              
              <button type="submit" className='submit-button'>Convert</button>
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