import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './output.css';
import Weathernow from './Weathernow';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>


  // <BrowserRouter>
  //      <App/>
  // </BrowserRouter>
  <Weathernow/>
);

