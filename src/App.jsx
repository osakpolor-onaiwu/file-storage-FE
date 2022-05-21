import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import Home from './components/pages/home';
import UploadDoc from './components/pages/upload_doc';
import UploadImage from './components/pages/upload_image';
import ConvertImage from './components/pages/convert_image';
import ConvertDoc from './components/pages/convert_doc';
import Login from './components/auth/login';
import Signup from './components/auth/signup'

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>   
        <Route exact path="/" element={<Home />} />
        <Route path="/upload/doc" element={<UploadDoc />} />
        <Route path="/upload/image" element={<UploadImage />} />
        <Route path="/convert/doc" element={<ConvertDoc />} />
        <Route path="/convert/image" element={<ConvertImage />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        {/* <Route path="/" element={<ConvertDoc />} /> */}
      </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
