import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";
import { Avatar, Button, CssBaseline, TextField, Typography, Container, Select } from '@material-ui/core';

class FormEntretien extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        error: null,
        title: "Demande entretien",
        update:"entretien",
        selectedOption: "Changement du filtre"
    };

    handleChange = (event) => {
        const value = event.target.value;
        const key = event.target.name;
        this.setState({ [key]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { httpResponse, error, ...data } = this.state;

        apiHandler
            .createIntervention(this.props.id_pointofSale, this.props.id_machine, data)
            .then((data) => {
                this.setState({
                    httpResponse: {
                        status: "success",
                        message: "Votre demande a bien été envoyée",
                    },
                });
                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null });
                    this.props.handleFormEntretien();
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
        const { httpResponse } = this.state;
        return (
            <div style={{ padding: "10px", border: "1px solid #20C9E0", backgroundColor: "white", borderRadius: "5px" }} className="formMachine-container">
                <form
                    className="formMachine"
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={this.props.handleFormEntretien} className="close-link">
                        X
                    </p> <br />

                    <Typography style={{ fontWeight: "bold" }} component="h1" variant="h5" align="center">
                        Demande entretien
                    </Typography><br />

                    {httpResponse && (
                        <FeedBack
                            message={httpResponse.message}
                            status={httpResponse.status}
                        />
                    )}
                    <div className="form-group">
                        <label>
                            Quel type d'entretien désirez-vous ?
                    <select style={{ borderRadius: "5px", width: "90%" }} value={this.state.value}>
                                <option value="chgt_filtre">Changement du filtre</option>
                                <option value="chgt_joints">Changement des joints d'usure</option>
                                <option value="check_up">Nettoyage/check-up global</option>
                                <option value="autre_entretien">Autre</option>
                            </select>
                        </label>
                    </div>
                    <br />

                    <div className="form-group">
                        <label className="label" htmlFor="description">
                            Description détaillée de la demande (optionnelle)
          </label><br />
                        <input style={{ borderRadius: "5px", borderColor: "grey", width: "90%", border: "1px solid", minHeight: "150px" }} className="input" type="text" id="description" name="description" /> <br />
                    </div>

                    <button style={{ padding: "10px", borderRadius: "50px", textAlign: "center", backgroundColor: "#20C9E0", border: "0px", marginTop: "20px", color: "white", boxShadow: "5px 5px 2px 1px rgba(0, 0, 255, .2)" }}>Envoyer la demande</button>
                </form>
            </div>





        );
    }
}

export default FormEntretien;