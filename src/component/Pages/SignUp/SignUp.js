import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';
import axios from 'axios';
import { URL } from '../../Utils/BASE_URL';

function SignUp() {
  const navigate = useNavigate();
  const [notify, setNotify] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    username : ''
  });

  async function addUserHandler() {
    let res = await axios.post(`${URL}/user/add`, newUser);
    console.log(res)
    if (res.statusText === 'OK') {
      navigate('/login');
    } else {
        setNotify(true)
        console.log('not caller')
    }

  }

  useEffect(() => {
    if (notify) {
      setTimeout(() => setNotify(false), 2000);
    }

  }, [notify]);

  return (
    <div className="login-layout">
      <div className="login-wrapper">
        <h1 className="login-heading">SighUp</h1>
        <div className="user-name-input">
          <div>Name</div>
          <input
          value={newUser.name}
            type={'text'}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="enter name.."
          />
        </div>
        <div className="user-username-input">
          <div>username</div>
          <input
          value={newUser.username}
            type={'text'}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            placeholder="enter username.."
          />
        </div>
        <div className="user-password-input">
          <div>Email</div>
          <input
          value={newUser.email}
            type={'email'}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            placeholder="enter email.."
          />
        </div>
        <div className="user-password-input">
          <div>Password</div>
          <input
          value={newUser.password}
            type={'password'}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="enter password.."
          />
        </div>
        <div className="button-log-sign">
          <Link className="btn btn-primary" to={'/login'}>
            Login
          </Link>
          <button onClick={addUserHandler} className="btn btn-warning" to={'/'}>
            SignUp
          </button>
        </div>
        {notify && <h5 className="text-danger notify">Invalid value Enter </h5>}
      </div>
    </div>
  );
}

export default SignUp;
