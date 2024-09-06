import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrf_access_token";
axios.defaults.xsrfHeaderName = "X-CSRF-TOKEN";


function App() {
  return (
    <div>
      <Header />
      <header>
      </header>
    </div>
  );
}

export default App;
