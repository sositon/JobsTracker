import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrf_access_token";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";


const onClick = () => {
  axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, 
    {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err);
    });
}

function App() {
  return (
    <div>
      <Header />
      <header>
        <button onClick={onClick}>
          GET SOME DATA
        </button>
      </header>
    </div>
  );
}

export default App;
