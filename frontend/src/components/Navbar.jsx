import React, { useContext } from 'react'
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext.js';


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();


  const userLogout = async e => {
    e.preventDefault();

    await logout();
    navigate("/login");
  }


  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" onClick={() => navigate("/")} />
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>SCINCE</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <Link className="link" to={`/userprofile/${currentUser?.id}`}>
            <span style={{ fontWeight: "bold" }}>{currentUser?.fullName}</span>
          </Link>

          {currentUser ? (
            <span onClick={userLogout} className='button'>Logout</span>
          ) : (
            <Link className="link" to="/login">Login</Link>
          )}

          <span className='write'>
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar