import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Delete from "../images/Delete.jpg";
import Edit from "../images/images.png";
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../context/authContext.js';


const Single = () => {

  const [post, setPost] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        console.log("singlepost===>", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);


  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.image}`} alt="" />
        <div className="user">
          {post.userImg ? (
            <img src={`../upload/${post.userImg}`} alt="" />
          ) : null}
          <div className="info">
            <span>{post.fullName}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.fullName === post.fullName ? (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img className="edit" src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} className="delete" src={Delete} alt="" />
            </div>
          ) : null}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single