import React, { useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import Login from './Login';

const SignUpWidget = ({toggle}) => {

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    error: '',
  })

  const handleSignUp = (e) => {
    setUserData({...userData,
      [e.target.name]: e.target.value,
    })
  }

  const login = (e) => {
    if (e) { e.preventDefault() }

    setUserData({...userData,
      error: '',
    })

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password,
        }
      })
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
      setUserData({...userData,
        error: 'Could not log in.',
      })
    })

  }

  const signUp = (e) => {
    if (e) { e.preventDefault() }
    
    setUserData({...userData,
      error: '',
    })

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: userData.email,
          username: userData.username,
          password: userData.password
        }
      })
    }))
    .then(handleErrors)
    .then(data => {
      if (data.user) {
        login();
      }
    })
    .catch(error => {
      setUserData({...userData,
        error: 'Could not sign up.',
      })
    })

  }

  const { email, username, password } = userData

  return(
    <React.Fragment>
      <form onSubmit={signUp}>
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleSignUp}
          className="form-control form-control-lg mb-3"
          required>
        </input>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleSignUp}
          className="form-control form-control-lg mb-3"
          required>
        </input>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleSignUp}
          className="form-control form-control-lg mb-3"
          required>
        </input>
        <button type="submit" className="btn btn-danger w-100">Sign Up</button>
      </form>
      <hr/>
      <p className="mb-0">Already have an account? 
        <a className="text-primary toggle-link" onClick={toggle}> Log in</a>  
      </p>
    </React.Fragment>
  )
}

export default SignUpWidget;