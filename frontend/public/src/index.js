import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import global styles
import App from './App'; // Import the App component
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router for routing


ReactDOM.render(
  <Router> {/* Wrap your App with Router to enable routing */}
    <App />
  </Router>,
  document.getElementById('root') // This targets the div with id 'root' in index.html
);
