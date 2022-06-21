import React from 'react';
import ReactDOM from 'react-dom';
import UsersBookings from './UsersBookings';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UsersBookings/>,
    document.body.appendChild(document.createElement('div')),
  )
})