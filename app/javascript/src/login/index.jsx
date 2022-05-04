import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement('div')),
  )
})
