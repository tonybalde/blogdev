import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserContext";

import { IoLogIn } from "react-icons/io5";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { FaPencil } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";


export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">BlogDev</Link>
        <nav>
          {username && (
            <div className="header-links">
              <Link to="/create"><FaPencil size={20}/>Create new post</Link>
              <a onClick={logout}><IoLogOut size={20} />Logout ({username})</a>
            </div>
          )}
          {!username && (
            <div className="header-links">
              <Link to="/login"><IoLogIn size={20}/>Login</Link>
              <Link to="/register"><HiMiniPencilSquare size={20}/>Register</Link>
            </div>
          )}
        </nav>
    </header>
    
  );
}
