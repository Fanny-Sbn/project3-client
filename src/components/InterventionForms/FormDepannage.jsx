import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

import { Avatar, Button, CssBaseline, TextField, Typography, Container, Select } from '@material-ui/core';


class FormDepannage extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        error: null,
        title: "Demande dépannage",
        update:"depannage",
        selectedOption: "Compteur volumétrique"
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
                    this.props.handleFormDepannage();
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
                    <p style={{ fontWeight: "bold", cursor: "pointer" }} onClick={this.props.handleFormDepannage} className="close-link">
                        X
                    </p> <br/>

                    <Typography style={{fontWeight:"bold"}} component="h1" variant="h5" align="center">
                        Demande Dépannage
                    </Typography><br />

                    {httpResponse && (
                        <FeedBack
                            message={httpResponse.message}
                            status={httpResponse.status}
                        />
                    )}

                    <div className="form-group">
                        <label>
                            Erreur affichée sur la machine:
          <select style={{ borderRadius: "5px", width: "90%" }} value={this.state.value} name="selectedOption">
                                <option value="Compteur volumétrique">Compteur volumétrique</option>
                                <option value="Panne eau">Panne eau</option>
                                <option value="Panne air break">Panne air break</option>
                                <option value="Panne groupe café">Panne groupe café</option>
                                <option value="Panne doseur café">Panne doseur café</option>
                                <option value="Intallation chaudière">Installation chaudière</option>
                                <option value="Panne moulin">Panne Moulin</option>
                                <option value="Autre dépannage">Autre</option>
                                <option value="Pas d'erreur affichée">Pas d'erreur affichée</option>
                            </select>
                        </label>
                    </div><br />

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

export default FormDepannage;

/* class FormDepannage extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        error: null,
        title: "Demande dépannage",
        selectedOption:"Compteur volumétrique"
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
            .createIntervention(this.props.id_pointofSale,this.props.id_machine, data)
            .then((data) => {
                this.setState({
                    httpResponse: {
                        status: "success",
                        message: "Votre demande a bien été envoyée",
                    },
                });
                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null});
                    this.props.handleFormDepannage();
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
            <div className="formMachine-container">
                <form
                    className="formMachine"
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                >
                    <p style={{ cursor: "pointer" }} onClick={this.props.handleFormDepannage} className="close-link">
                        X
        </p>
                    <h2>Demande Dépannage</h2>

                    {httpResponse && (
                        <FeedBack
                            message={httpResponse.message}
                            status={httpResponse.status}
                        />
                    )}

                    <div className="form-group">
                        <label>
                            Erreur affichée sur la machine:
          <select value={this.state.value} name="selectedOption">
                                <option value="Compteur volumétrique">Compteur volumétrique</option>
                                <option value="Panne eau">Panne eau</option>
                                <option value="Panne air break">Panne air break</option>
                                <option value="Panne groupe café">Panne groupe café</option>
                                <option value="Panne doseur café">Panne doseur café</option>
                                <option value="Intallation chaudière">Installation chaudière</option>
                                <option value="Panne moulin">Panne Moulin</option>
                                <option value="Autre dépannage">Autre</option>
                                <option value="Pas d'erreur affichée sur la machine">Pas d'erreur affichée sur la machine</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="description">
                            Description détaillée de la demande (optionnelle)
          </label><br />
                        <input className="input" type="text" id="description" name="description" /> <br />
                    </div>

                    <button>Envoyer la demande</button>
                </form>
            </div>

        );
    }
}

export default FormDepannage; */