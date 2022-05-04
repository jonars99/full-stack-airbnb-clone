import React, { useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

const LoginWidget = ( {toggle} ) => {

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    error: '',
  })

  const handleInput = (e) => {
    setUserData({...userData,
      [e.target.name]: e.target.value,
    })
  }

  const login = (e) => {
    if (e) { e.preventDefault() } 

    setUserData({...userData,
      error: '',
    });

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
          window.location = redirect_url
        }
      })
      .catch(error => {
        setUserData({...userData,
          error: 'Could not log in.',
        })
        console.log(error)
      })
  }

  const { email, password, error } = userData

  return(
    <React.Fragment>
      <form onSubmit={login}>
        <input  
          name="email" 
          type="text" 
          placeholder='Email' 
          value={email} 
          onChange={handleInput} 
          className="form-control form-control-lg mb-3" 
          required >
        </input>
        <input  
          name="password" 
          type="password" 
          placeholder='Password' 
          value={password} 
          onChange={handleInput} 
          className="form-control form-control-lg mb-3" 
          required >
        </input>
        <button type="submit" className="btn btn-danger w-100">Log in</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
      <hr/>
      <p className="mb-0">Don't have an account? 
        <a className="text-primary toggle-link" onClick={toggle}> Sign up</a>
      </p>
    </React.Fragment>
  )

}

export default LoginWidget;