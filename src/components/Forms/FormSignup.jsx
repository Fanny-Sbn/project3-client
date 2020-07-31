import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    firstName:"",
    lastName:"",
    companyName:"",
    phoneNumber:"",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">Prénom</label><br/>
        <input type="text" id="firstName" name="firstName" /><br/>

        <label htmlFor="lastName">Nom</label><br/>
        <input type="text" id="lastName" name="lastName" /><br/>

        <label htmlFor="companyName">Nom de société</label><br/>
        <input type="text" id="companyName" name="companyName" /><br/>

        <label htmlFor="phoneNumber">Téléphone</label><br/>
        <input type="text" id="phoneNumber" name="phoneNumber" /><br/>

        <label htmlFor="email">Email</label><br/>
        <input type="email" id="email" name="email" /><br/>

        <label htmlFor="password">Password</label><br/>
        <input type="password" id="password" name="password" /><br/>

        <button>Créer un compte</button>
      </form>
    );
  }
}

export default withRouter(FormSignup);
