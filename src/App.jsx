import React, {useEffect }from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {login, user} from './reduxtoolkit/slices/auth_slice';
import { useDispatch } from 'react-redux';
import Login from './componentstoolkit/auth/login';
import Signup from './componentstoolkit/auth/signup';
import Home from './componentstoolkit/pages/home';
import UploadDoc from './componentstoolkit/pages/upload_doc';
import UploadImage from './componentstoolkit/pages/upload_image';
import ConvertImage from './componentstoolkit/pages/convert_image';
import ConvertDoc from './componentstoolkit/pages/convert_doc';
import History from './componentstoolkit/pages/history';

const App = ({loadUser, LoginAction}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(user());

    const userDetails = JSON.parse(localStorage.getItem("user details"));
    dispatch(login(userDetails));
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>   
        <Route exact path="/" element={<Home />} />
        <Route exact path="/upload/doc" element={<UploadDoc />} />
        <Route exact path="/upload/image" element={<UploadImage />} />
        <Route exact path="/convert/doc" element={<ConvertDoc />} />
        <Route exact path="/convert/image" element={<ConvertImage />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

