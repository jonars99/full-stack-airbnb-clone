// home.jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => {
  console.log(process.env.TEST_ENV_VARIABLE);
  return <h1>Home page</h1>;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
