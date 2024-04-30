// src/components/Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../features/user/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { isLoading, error } = useSelector((state) => state.user);

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
      <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
