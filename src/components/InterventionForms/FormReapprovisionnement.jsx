import React from 'react';
import MultiSelect from "@khanacademy/react-multi-select";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

const options = [
    { value: 'Café', label: 'Café' },
    { value: 'Café noisette', label: 'Café noisette' },
    { value: 'Café vanille', label: 'Café vanille' },
    { value: 'Lait', label: 'Lait' },
    { value: 'Chocolat', label: 'Chocolat' },
    { value: 'Thé', label: 'Thé' },
    { value: 'Sucre', label: 'Sucre' },
    { value: 'Touillettes', label: 'Touillettes' },
    { value: 'Petits gobelets', label: 'Petits gobelets' },
    { value: 'Grands gobelets', label: 'Grands gobelets' },
];

class FormReapprovisionnement extends React.Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        error: null,
        title: "Demande réapprovisionnement",
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
            .createIntervention(this.props.id_machine, data)
            .then((data) => {
                this.setState({
                    httpResponse: {
                        status: "success",
                        message: "Votre demande a bien été envoyée",
                    },
                });
                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null });
                    this.props.handleFormReapprovisionnement();
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
                <p style={{ cursor: "pointer" }} onClick={this.props.handleFormReapprovisionnement} className="close-link">
                    X
                </p>
                <h3>Demande Réapprovisionnement</h3>

                {httpResponse && (
                    <FeedBack
                        message={httpResponse.message}
                        status={httpResponse.status}
                    />
                )}

                <MultiSelect
                    options={options}
                    selected={selectedOption}
                    onSelectedChanged={selectedOption => this.setState({ selectedOption })}
                    overrideStrings={{
                        selectSomeItems: "Sélectionner les produits",
                        allItemsAreSelected: "Tous les produits sélectionnés",
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


export default FormReapprovisionnement; 