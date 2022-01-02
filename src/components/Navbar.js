import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, hadnleLogout, handleLogin, loginStatus } = useAppContext();

  return (
    <NavbarWrapper>
      <ul className="list">
        <li>home</li>
        <li>profile</li>
        <li>edit</li>
      </ul>
      {loginStatus && (
        <div className="user">
          <h3 className="username">{user.name}</h3>
            <img src={user.image} alt={user.name} />
        </div>
      )}

      <button onClick={loginStatus ? hadnleLogout : handleLogin}>
        {loginStatus ? "Logout" : "Login"}
      </button>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.header`
  width: 100%;
  background: #222;
  color: white;

  display: flex;
  justify-content: space-around;
  .user{
      display:flex;
      justify-content:space-between;
      align-items:center;
      img{
        border-radius:50%;
        width:40px;
        height:40px;
      }
  }
`;

export default Navbar;
