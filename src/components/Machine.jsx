import React, { Component } from 'react';
import FormDepannage from './InterventionForms/FormDepannage';
import FormEntretien from './InterventionForms/FormEntretien';
import FormReglage from './InterventionForms/FormReglage';
import FormReapprovisionnement from './InterventionForms/FormReapprovisionnement';

export class Machine extends Component {
    state = {
        forms: false,
        formReglagle: false,
        formDepannage: false,
        formEntretien: false,
        formReapprovisionnement: false,
        interventions:[],
    }

    displayForms = () => {
        this.setState({ forms: !this.state.forms })
    }

    handleFormReglages = () => {
        this.setState({ formReglage: !this.state.formReglage })
    }

    handleFormEntretien = () => {
        this.setState({ formEntretien: !this.state.formEntretien })
    }

    handleFormReapprovisionnement = () => {
        this.setState({ formReapprovisionnement: !this.state.formReapprovisionnement })
    }

    handleFormDepannage = () => {
        this.setState({ formDepannage: !this.state.formDepannage })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ display: "inline", textAlign: "left" }}>
                    <img style={{ display: "inline", marginRight: "10px", width: "50px", textAlign: "left" }} src={this.props.image} alt="machine" />
                    <h3 style={{ display: "inline", marginRight: "10px" }}>{this.props.brand}</h3>
                    <p style={{ display: "inline", marginRight: "10px" }}>{this.props.model}</p>
                    <p onClick={this.displayForms} style={{ display: "inline", marginRight: "10px" }}>+</p>
                </div>

                {
                    this.state.forms && (
                        <React.Fragment>
                            <p style={{ cursor: "pointer" }} onClick={this.displayForms} className="close-link">
                                X
                            </p>

                            <div>
                                <p>Quel est l'objet de votre demande ?</p>
                            </div>

                            <div onClick={this.handleFormReapprovisionnement}>
                                <p>Réapprovisionnement</p>
                                <img style={{ width: "30px" }} src="./media/beans-coffee.png" alt="Réa" />
                            </div>
                            {this.state.formReapprovisionnement &&(
                                <FormReapprovisionnement handleFormReapprovisionnement={this.handleFormReapprovisionnement} id_machine={this.props._id}/>
                            )}

                            <div onClick={this.handleFormDepannage}>
                                <p>Dépannage</p>
                                <img style={{ width: "30px" }} src="./media/tools.png" alt="tools" />
                            </div>

                            {this.state.formDepannage &&(
                                <FormDepannage handleFormDepannage={this.handleFormDepannage} id_machine={this.props._id}/>
                            )}

                            <div onClick={this.handleFormEntretien}>
                                <p>Entretien</p>
                                <img style={{ width: "30px" }} src="./media/entretien.png" alt="entretien" />
                            </div>

                            {this.state.formEntretien &&(
                                <FormEntretien handleFormEntretien={this.handleFormEntretien} id_machine={this.props._id}/>
                            )}

                            <div onClick={this.handleFormReglages}>
                                <p>Réglages</p>
                                <img style={{ width: "30px" }} src="./media/settings.png" alt="settings" />
                            </div>

                            {this.state.formReglage &&(
                                <FormReglage handleFormReglages={this.handleFormReglages} id_machine={this.props._id}/>
                            )}
                        </React.Fragment>
                    )
                }

            </React.Fragment>

        )
    }
}

export default Machine
