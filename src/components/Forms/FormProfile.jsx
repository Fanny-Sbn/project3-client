import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

class FormProfile extends Component {
  static contextType = UserContext;

  state = {
    httpRespone: null,
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  isValidInput = (key) => {
    if (this.state[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state) {
      if (key === "httpResponse") continue;
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, firstName, lastName, companyName, phoneNumber } = this.state;
    apiHandler
      .updateClient(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profil mis à jour avec succès",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.history.push("/profile");
        }, 3000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Une erreur s'est produite, veuillez réessayer de mettre à jour votre profil ultérieurement",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };


  render() {
    const { user } = this.context;
    const { httpResponse } = this.state;
    if (!user) return <div>Loading...</div>;
    return (
      <section className="form-section">
        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "15px" }} className="header">Modification du profil</h3>

            {httpResponse && (
              <FeedBack
                message={httpResponse.message}
                status={httpResponse.status}
              />
            )}
            <div style={{ textAlign: "left", margin: "40px" }}>
              <div className="form-group">
                <label className="label" htmlFor="firstName">
                  Prénom
            </label> <br />
                <input
                  className="input"
                  id="firstName"
                  type="text"
                  name="firstName"
                  defaultValue={user.firstName}
                /> <br />
                {!this.isValidInput("firstName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </div>

              <div className="form-group">
                <label className="label" htmlFor="lastName">
                  Nom
            </label><br />
                <input
                  className="input"
                  id="lastName"
                  type="text"
                  name="lastName"
                  defaultValue={user.lastName}
                /> <br />
                {!this.isValidInput("lastName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </div>

              <div className="form-group">
                <label className="label" htmlFor="companyName">
                  Nom de société
            </label> <br />
                <input
                  className="input"
                  id="companyName"
                  type="text"
                  name="companyName"
                  defaultValue={user.companyName}
                /> <br />
                {!this.isValidInput("companyName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </div>

              <div className="form-group">
                <label className="label" htmlFor="email">
                  Email
            </label> <br />
                <input
                  className="input"
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  disabled
                /> <br />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
            </label> <br />
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                /> <br />
                {!this.isValidInput("phoneNumber") && (
                  <p className="input-error">Champ invalid</p>
                )}
              </div>
              <button style={{ padding: "10px", borderRadius: "50px", textAlign: "center", backgroundColor: "#20C9E0", border: "0px", marginTop: "35px", color: "white", boxShadow: "5px 5px 2px 1px rgba(0, 0, 255, .2)" }} primary disabled={this.checkError()} >
                Sauvegarder
          </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default FormProfile;
