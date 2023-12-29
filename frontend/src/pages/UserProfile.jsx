import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext.js';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({route, params}) => {

  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState("");

  const { currentUser } = useContext(AuthContext);
  
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async e => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      await axios.put(`/auth/addimage/${currentUser.id}`, {
        image: file ? imgUrl : "",
      });
      setSuccess("Image uploaded successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='userProfile'>
      <h1>Profile</h1>

      <div className="content">
        {currentUser?.image ?
          <div className="imgSection">
            <img src={`../upload/${currentUser?.image}`} alt="" />
            {success ?
              <p className='success'>{success}</p>
              : null
            }
            <input style={{ display: "none" }} type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />

          </div>
          :
          <div className="imgSection">
            <p className='imgTxt'>No image</p>
            {success ?
              <p className='success'>{success}</p>
              : null
            }
            <input style={{ display: "none" }} type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])} />
          </div>
        }
        <div className="details">
          <h2>{currentUser?.fullName}</h2>
          <p>{currentUser?.email}</p>
          <Link to={`/updateuser?update=${currentUser?.id}`} state={currentUser ? { currentUser } : null}>
            <button>Edit Profile</button>
          </Link>
        </div>
      </div>

      {currentUser?.image ?
        <>
          {file != null ?
            <button onClick={handleClick} className='button'>
              <label className='file'>Upload Image</label>
            </button>
            :
            <button className='button'>
              <label className='file' htmlFor="file">Change Image</label>
            </button>
          }
        </>
        :
        <>
          {file != null ?
            <button onClick={handleClick} className='button'>
              <label className='file'>Upload Image</label>
            </button>
            :
            <button className='button'>
              <label className='file' htmlFor="file">+ Choose Image</label>
            </button>
          }
        </>
      }
    </div>
  )
}

export default UserProfile