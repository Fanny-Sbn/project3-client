import React, { Component } from 'react';
import FormDepannage from '../InterventionForms/FormDepannage';
import FormEntretien from '../InterventionForms/FormEntretien';
import FormReglage from '../InterventionForms/FormReglage';
import FormReapprovisionnement from '../InterventionForms/FormReapprovisionnement';

import { Avatar, Button, CssBaseline, TextField, Typography, Container, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    borderPDV: {
        margin: "10px 0px",
        borderRadius: "5px",
        padding: "20px",
        border: "1px solid #20C9E0"
    },
    machine: {
        margin: "15px 0px",
        textAlign: "left",
        width: "100%"
    },
    machineDetails: {
        display: "inline",
        marginRight: "10px"
    },
    question: {
        margin: "10px 0px"
    },
    title: {
        fontWeight: 'bold',
    },
    oblique: {
        fontStyle: "oblique",
        cursor: "pointer"
    },
    demande: {
        backgroundColor: "#E7FCFC",
        borderRadius: "5px",
        padding: "10px"
    },
    cardDemande: {
        margin: "10px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 10px"
    }

}));

const withMaterialStyles = (ComponentToPassStylesTo) => {
    return (props) => {
        const classes = useStyles();
        return <ComponentToPassStylesTo {...props} classes={classes} />;
    };
};

export class Machine extends Component {
    state = {
        forms: false,
        formReglagle: false,
        formDepannage: false,
        formEntretien: false,
        formReapprovisionnement: false,
        interventions: [],
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
        const classes = this.props.classes;

        return (
            <React.Fragment>
                <Container style={{padding:"10px",border:"1px solid #20C9E0", borderRadius:"5px", boxShadow:"5px 5px 2px 1px rgba(0, 0, 255, .2)"}}align="center" className={classes.machine} >
                    <img style={{ display: "inline", marginRight: "10px", width: "50px", textAlign: "left" }} src={this.props.image} alt="machine" />
                    <Typography className={classes.machineDetails} component="h1" variant="h4">
                        {this.props.brand}
                    </Typography>
                    <Typography className={classes.machineDetails} component="h1" variant="body1">
                        ({this.props.model})
                    </Typography>

                    <Typography align="right" className={classes.machineDetails, classes.oblique} component="h1" variant="h5" onClick={this.displayForms}>
                        Faire une demande
                    </Typography>
                </Container>

                {
                    this.state.forms && (
                        <Container className={classes.demande} align="center">
                            <p style={{ cursor: "pointer", fontWeight: "bold" }} onClick={this.displayForms} className="close-link">
                                X
                            </p>

                            <Typography className={classes.question} align="center" component="h1" variant="h5" onClick={this.displayForms}>
                                Quel est l'objet de votre demande ?
                            </Typography>


                            <Card className={classes.cardDemande} onClick={this.handleFormReapprovisionnement}>
                                <Typography component="h1" variant="h5">
                                    Réapprovisionnement
                                </Typography>
                                <img style={{ width: "30px" }} src="./media/beans-coffee.png" alt="Réa" />
                            </Card>
                            
                            {this.state.formReapprovisionnement && (
                                <FormReapprovisionnement handleFormReapprovisionnement={this.handleFormReapprovisionnement} id_machine={this.props._id} id_pointofSale={this.props.id_pointofSale} />
                            )}

                            <Card className={classes.cardDemande} onClick={this.handleFormDepannage}>
                                <Typography component="h1" variant="h5">
                                    Dépannage
                                </Typography>
                                <img style={{ width: "30px" }} src="./media/tools.png" alt="tools" />
                            </Card>

                            {this.state.formDepannage && (
                                <FormDepannage handleFormDepannage={this.handleFormDepannage} id_machine={this.props._id} id_pointofSale={this.props.id_pointofSale} />
                            )}

                            <Card className={classes.cardDemande} onClick={this.handleFormEntretien}>
                                <Typography component="h1" variant="h5">
                                    Entretien
                                </Typography>
                                <img style={{ width: "30px" }} src="./media/entretien.png" alt="entretien" />
                            </Card>

                            {this.state.formEntretien && (
                                <FormEntretien handleFormEntretien={this.handleFormEntretien} id_machine={this.props._id} id_pointofSale={this.props.id_pointofSale} />
                            )}

                            <Card className={classes.cardDemande} onClick={this.handleFormReglages}>
                                <Typography component="h1" variant="h5">
                                    Réglages
                                </Typography>
                                <img style={{ display: "inline", width: "30px" }} src="./media/settings.png" alt="settings" />
                            </Card>

                            {this.state.formReglage && (
                                <FormReglage handleFormReglages={this.handleFormReglages} id_machine={this.props._id} id_pointofSale={this.props.id_pointofSale} />
                            )}
                        </Container>
                    )
                }

            </React.Fragment>

        )
    }
}

export default withMaterialStyles(Machine)
