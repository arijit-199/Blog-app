import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // console.log(inputs);

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder='Fullname' name="fullName" onChange={handleChange} />
        <input required type="email" placeholder='Email' name="email" onChange={handleChange} />
        <input required type="text" placeholder='Password' name="password" onChange={handleChange} />
        <button className='formButton' onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
    </div>
  )
}

export default Register