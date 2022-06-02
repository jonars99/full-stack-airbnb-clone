import React, { useEffect, useState } from 'react';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import { authenticateUser } from '@utils/requests';
import './stylesheets/layout.scss';

const Layout = ( props ) => {

  const [ authenticated, setAuthenticated ] = useState(false);

  const handleLogout = (e) => {
    if (e) { e.preventDefault() }
  
    fetch('api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(data => {
      if (data.success) {
        const params = new URLSearchParams(window.location.search);
        const redirect_url = params.get('redirect_url') || '/';
        window.location = redirect_url;
      }
    })
    .catch(error => {
      console.log(error);
    })
  };

  useEffect(() => {
    authenticateUser(function (data) {
      setAuthenticated(data.authenticated);
    });
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                {authenticated ? 
                  <a className="nav-link anchor-link" onClick={handleLogout}>Logout</a> : 
                  <a className="nav-link anchor-link" href="/login">Login</a> 
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light">
        <div className="mx-5">
          <p className="me-3 mb-0 text-secondary">Full Stack Airbnb Clone</p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
