import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";

class Profile extends Component {
  static contextType = UserContext;
  state = {
    httpResponse: null,
  };



  render() {
    const { user } = this.context;
    if (!user) return null;

    return (
      <section style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="Profile">
        <h3 style={{ margin: "15px" }}>Informations personnelles</h3>
        <img style={{ width: "100px" }} src="./../media/coffee.png" alt="coffee" />
        <div style={{textAlign:"center"}} className="user-presentation">
          <p style={{ textAlign: "center", margin: "10px 0px 20px", fontWeight: "bold" }} className="title">
            {user.firstName} {user.lastName}
          </p>
          <div style={{ width:"80vw", border: "1px solid #B7CECE", padding: "15px", borderRadius: "5px", textAlign:"center", marginTop:"35px" }}>
            <p>
              Nom de société : {user.companyName}
            </p>
            <p>
              Téléphone : {user.phoneNumber}
            </p>
            <p>
              Email : {user.email}
            </p>
          </div>
          <Link style={{textAlign:"center"}}className="link" to="/profile/settings">
            <button style={{padding:"10px", borderRadius:"50px", textAlign:"center", backgroundColor:"#20C9E0", border:"0px", marginTop:"35px", color:"white", boxShadow:"5px 5px 2px 1px rgba(32, 201, 224, .2)"}}>
              Modifier le profil
            </button>
          </Link>
        </div>
      </section>
    );
  }
}

export default Profile;
