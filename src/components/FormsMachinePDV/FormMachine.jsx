import React, { Component } from "react";
import UploadWidget from "../UploadWidget";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "../FeedBack";

class FormMachine extends Component {
  static contextType = UserContext;
  state = {
    brand: "",
    model: "",
    httpResponse: null,
    error: null,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data); 

    apiHandler
      .addMachine(this.props.id_PointOfSale,fd)
      .then((data) => {
        this.props.updateMachine(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre machine a bien été créée",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.handleFormMachine();
        }, 2000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message: "Une erreur s'est produite, réessayez plus tard",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 1000);
      });
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
  };

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  render() {
    const { httpResponse} = this.state;
    console.log(this.props.id_PointOfSale)
    return (
      <div className="formMachine-container">
        <form
          className="formMachine"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <p style={{ cursor: "pointer" }} onClick={this.props.handleFormMachine} className="close-link">
            X
        </p>
          <h2>Ajout d'une machine</h2>

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}

          <div className="form-group">
            <label className="label" htmlFor="brand">
              Marque de la machine
          </label> <br />
            <input className="input" type="text" id="brand" placeholder="WMF" name="brand" /> <br />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="model">
              Modèle de la machine
          </label><br />
            <input className="input" type="text" id="model" name="model" /> <br />
          </div>

          <div className="form-group">
            <UploadWidget onFileSelect={this.handleFileSelect} name="image">
              Télécharger une image de la machine
            </UploadWidget>
          </div>

          <button>Ajouter cette machine</button>
        </form>
      </div>

    );
  }
}

export default FormMachine;