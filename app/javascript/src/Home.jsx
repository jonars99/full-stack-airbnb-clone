import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="container">
        <h1>Home</h1>
      </div>
    </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
