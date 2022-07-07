// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import BookingSuccess from './BookingSuccess';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <BookingSuccess booking_id={data.booking_id} />,
    document.body.appendChild(document.createElement('div')),
  )
})