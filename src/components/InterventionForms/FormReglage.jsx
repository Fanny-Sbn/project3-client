import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

class FormReglage extends Component {
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
    const { } = this.state;
    apiHandler
      .updateMachine(this.state)
      .then((data) => {
        /* this.context.setUser(data); */
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre demande a bien été envoyée",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.history.push("/");
        }, 3000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Une erreur s'est produite, veuillez directement contacter le gérant au 0578568879",
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
        <form autoComplete="off" className="form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "15px" }} className="header">Demande de réglages</h3>

            {httpResponse && (
              <FeedBack
                message={httpResponse.message}
                status={httpResponse.status}
              />
            )}

            <div style={{ textAlign: "left", margin: "40px" }}>
              <div className="form-group">
                <label className="label" htmlFor="reglages">Demande de réglages</label> <br />
                <input className="input" id="reglages" type="text" name="reglages"
                /> <br />
                {!this.isValidInput("reglages") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </div>

              <div className="form-group">
                  
                <label className="label" htmlFor="description">Description détaillée de la demande (optionnelle)</label><br />
                <input className="input" id="description" type="text" name="description"/> <br />

                {!this.isValidInput("lastName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </div>

              <button style={{ padding: "10px", borderRadius: "50px", textAlign: "center", backgroundColor: "#20C9E0", border: "0px", marginTop: "35px", color: "white", boxShadow: "5px 5px 2px 1px rgba(0, 0, 255, .2)" }} primary disabled={this.checkError()} >
                Envoyer la demande
            </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default FormReglage;