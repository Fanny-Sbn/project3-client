import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";
import { reglagesOptions } from '../../data/options';

class FormReglage extends React.Component {
  static contextType = UserContext;
  state = {
    httpResponse: null,
    error: null,
    title: "Demande réglages",
    selectedOption: [],
  }

  handleChangeDescription = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { httpResponse, error, ...data } = this.state;

    apiHandler
      .createIntervention(this.props.id_pointofSale,this.props.id_machine, data)
      .then((data) => {
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre demande a bien été envoyée",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.handleFormReglages();
        }, 1000);
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

  render() {
    const { httpResponse, selectedOption } = this.state;
    return (
      <form className="formMachine" onSubmit={this.handleSubmit}>
        <p style={{ cursor: "pointer" }} onClick={this.props.handleFormReglages} className="close-link">
          X
                </p>
        <h3>Demande Réglages</h3>

        {httpResponse && (
          <FeedBack
            message={httpResponse.message}
            status={httpResponse.status}
          />
        )}

        <MultiSelect
          options={reglagesOptions}
          selected={selectedOption}
          onSelectedChanged={selectedOption => this.setState({ selectedOption })}
          overrideStrings={{
            selectSomeItems: "Sélectionner des réglages",
            allItemsAreSelected: "Tous les réglages sélectionnés",
            selectAll: "Tout sélectionner",
            search: "Rechercher",
        }}
        />

        <div className="form-group">
          <label className="label" htmlFor="description">
            Description détaillée de la demande (optionnelle)
                    </label><br />
          <input className="input" type="text" id="description" name="description" onChange={this.handleChangeDescription} /> <br />
        </div>

        <button>Envoyer la demande</button>
      </form>
    )
  }
}


export default FormReglage; 