import React, { Component } from "react";
import Autocomplete from "../Autocomplete";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

class FormPDV extends Component {
  static contextType = UserContext;
  state = {
    httpResponse: null,
  };

  /* formRef = React.createRef(); */

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { httpResponse, ...data } = this.state;
    apiHandler
      .addPointOfSale(data)
      .then((data) => {
        /* this.formRef.current.reset(); 
        this.props.addItem(data);*/
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre point de vente a bien été créé",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.displayForm();
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

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  render() {
    const { httpResponse } = this.state;

    return (
      <div className="formPDV-container">
        <form
          /* ref={this.formRef} */
          className="FormPDV"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <p onClick={this.props.displayForm} className="close-link">
            X
          </p>
          <h2>Ajout d'un point de vente</h2>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <div className="form-group">
            <label className="label" htmlFor="name">
              Nom du point de vente
            </label> <br/>
            <input
              className="input"
              type="text"
              placeholder="Boulangerie Beaugrenelle"
              name="name"
            /> <br/>
          </div>
          
          <div className="form-group">
            <label className="label" htmlFor="location">
              Adresse du point de vente
            </label><br/>
            <Autocomplete
              onSelect={this.handlePlace}
            /> <br/>
          </div>
      
          <button primary>Ajouter ce point de vente</button>
        </form>
      </div>
    );
  }
}

export default FormPDV;
