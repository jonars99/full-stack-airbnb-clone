// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => (
  <h1>Home page</h1>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
