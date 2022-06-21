import React, { useEffect, useState } from 'react';
import { handleErrors, safeCredentials } from '@utils/fetchHelper';
import { authenticateUser } from '@utils/requests';
import './stylesheets/layout.scss';

const Layout = ( props ) => {

  const [ authenticated, setAuthenticated ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState("");

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
      setCurrentUser(data.username);
    });
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand text-danger" href="/">Airbnb</a>

            <ul className="navbar-nav ms-auto">

              {authenticated ? 
                // if user is logged in - dropdown with username and links to bookings/listings etc.
                <li className="nav-item dropdown me-2">
                  <a className="nav-link dropdown-toggle"id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">@{currentUser}</a>
                  <ul id="dropMenu" className="dropdown-menu" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="/mybookings">My Bookings</a>
                    <a className="dropdown-item" href="#">My Listings</a>
                    <a className="dropdown-item" href="#">Make a New Listing</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/" onClick={handleLogout}>Log Out</a>
                  </ul>
                </li>
                : 
                // user is logged out - show log in button
                <li className="nav-item me-2">
                  <a className="nav-link" href="/login">Log in</a> 
                </li>
              }

            </ul>

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
