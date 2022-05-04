import React, { useEffect, useState } from 'react';
import Layout from '@src/Layout';
import LoginWidget from './LoginWidget';
import SignUpWidget from './SignUpWidget';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import '../stylesheets/login.scss';

const Login = () => {

  const [checkUser, setCheckUser] = useState(
  {
    authenticated: false,
    show_login: true,
  });

  const toggle = () => {
    setCheckUser({...checkUser,
      show_login: !checkUser.show_login,
    })
  };
  
  useEffect(() => {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        setCheckUser({...checkUser,
          authenticated: data.authenticated
        })
      })
  }, []);

  const { authenticated, show_login } = checkUser

  if (authenticated) {
    return(
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="border rounded p-4">
                <p className="text-center mb-0">You are already logged in 🙂</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  return(
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
            <div className="border rounded p-4">
              {show_login ? <LoginWidget toggle={toggle} /> : <SignUpWidget toggle={toggle} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )

}

export default Login;