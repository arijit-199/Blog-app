import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const UpdateUser = () => {

  const { currentUser } = useContext(AuthContext);
  console.log("currentUser===>", currentUser);


  const [fullName, setFullName] = useState(currentUser?.fullName);
  const [email, setEmail] = useState(currentUser?.email);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.put(`/auth/${currentUser.id}`, {
        fullName,
        email,
      });
      navigate(`/userprofile/${currentUser?.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <h1>Update your profile</h1>
      <form>
        <input required type="text" placeholder='Fullname' name="fullName" onChange={e => setFullName(e.target.value)} />
        <input required type="email" placeholder='Email' name="email" onChange={e => setEmail(e.target.value)} />
        <button className='formButton' onClick={handleSubmit}>Update</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default UpdateUser