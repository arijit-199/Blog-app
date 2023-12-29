import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.js';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    };
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input type="text" name="email" placeholder='Email' onChange={handleChange}/>
        <input type="text" name="password" placeholder='Password' onChange={handleChange}/>
        <button className='formButton' onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  )
}

export default Login