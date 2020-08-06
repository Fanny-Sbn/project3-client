import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain" style={{backgroundColor:"#20C9E0", color:"white", marginBottom:"20px"}}>
      <NavLink exact to="/">
        <h3 className="logo" style={{marginRight:"20px"}}>Hodas</h3>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/profile">
                Profil
              </NavLink>
            </li>

            <li>
              <p onClick={handleLogout}>Se déconnecter</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Se connecter</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Créer un compte</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
