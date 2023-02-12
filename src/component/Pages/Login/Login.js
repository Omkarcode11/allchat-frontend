import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { URL } from '../../Utils/BASE_URL';
import { AppContext } from '../../../App';
import { useNavigate } from 'react-router';

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: '',
    password: '',
  });
  const [notify, setNotify] = useState(false);
  const { user, setUser } = useContext(AppContext);

  async function loginHandler() {
    try {
      let user = await axios.post(`${URL}/user/get`, userInfo);
      if (user?.statusText === 'OK') {
        setUser({
          id: user.data['id'],
          name: userInfo.name,
          username: user.data.username,
          authenticated: true,
        });
        navigate('/');
      }
    } catch (err) {}
    setUserInfo({
      name: '',
      password: '',
    });
    setNotify(true);
  }

  useEffect(() => {
    if (notify) {
      setTimeout(() => setNotify(false), 2000);
    }
    if (user.authenticated) {
      navigate('/');
    }
  }, [notify, navigate,user]);

  return (
    <div className="login-layout">
      <div className="login-wrapper">
        <h1 className="login-heading">Login</h1>
        <div className="user-name-input">
          <div>Name</div>
          <input
            type={'text'}
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder="enter name.."
          />
        </div>

        <div className="user-password-input">
          <div>Password</div>
          <input
            type={'password'}
            value={userInfo.password}
            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
            placeholder="enter password.."
          />
        </div>
        <div className="button-log-sign">
          <Link className="btn btn-warning" to={'/signup'}>
            SignUp
          </Link>
          <button className="btn btn-primary" onClick={loginHandler}>
            Login
          </button>
        </div>
        {notify && <h5 className="notify text-danger">Enter valid use</h5>}
      </div>
    </div>
  );
}

export default Login;
