import React from 'react'
import Navigation from '../layout/navbar'
// import Footer from '../layout/footer'
import Carousel from '../misc/carousel'
import { connect } from 'react-redux'
import {Row, Col} from 'reactstrap'

export const Home = (props) => {
  return (
    <main>
    <Navigation/>
    <Carousel/>
    <section className='my-contain home'>     
      <Row id='accepted-types'>
        <Row className='types-accepted-doc'>
        <h3>Documents files</h3>
          <Col  sm={12} md={6} lg={4}>
          <h4>JSON</h4>
          <p>JSON files are allowed for upload, and can be converted to csv.</p>
          </Col>
          <Col  sm={12} md={6} lg={4}>
          <h4>CSV</h4>
          <p>Csv files are allowed for upload, and can be convertedto JSON</p>
          </Col>
          <Col  sm={12} md={6} lg={4}>
          <h4>PDF</h4>
          <p>PDF file are supported for uploads only</p>
          </Col>
        </Row>
       
       
        <Row className='types-accepted-img'>
          <h3>Images files</h3>
          <Col  sm={12} md={6} lg={4}>
          <h4>JPEG</h4>
          <p>JPEG files are supported for upload, and can be converted to png</p>
          </Col>
          <Col  sm={12} md={6} lg={4}>
          <h4>PNG</h4>
          <p>PNG files are supported for upload, and can be converted to jpeg</p>
          </Col>
          <Col  sm={12} md={6} lg={4}>
          <h4>SVG</h4>
          <p>SVG image files are suppored for uploads only</p>
          </Col>
        </Row>
        
      </Row>
    </section>

    </main>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)