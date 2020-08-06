import React, { Component } from 'react'
import FormMachine from "../FormsMachinePDV/FormMachine";
import Machine from "./Machine"
import apiHandler from "../../api/apiHandler";

import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    borderPDV: {
        margin: "10px 0px",
        borderRadius: "5px",
        padding: "20px",
        border: "1px solid #20C9E0"
    },
    addPDVorMachine: {
        margin: theme.spacing(3, 0, 2),
        color: "#20C9E0",
        fontWeight: "bold",
        cursor: "pointer"
    },
    title: {
        fontWeight: 'bold',
    },
    address: {
        fontStyle: "oblique"
    }

}));

const withMaterialStyles = (ComponentToPassStylesTo) => {
    return (props) => {
        const classes = useStyles();
        return <ComponentToPassStylesTo {...props} classes={classes} />;
    };
};

export class PointOfSale extends Component {
    state = {
        form: false,
        machinePointOfSale: [],
    }

    componentDidMount() {
        apiHandler
            .getMachinePointOfSale(this.props._id)
            .then((machines) => {
                this.setState({ machinePointOfSale: machines });
            })
            .catch((error) => {
                console.log(error)
            });
    }

    updateMachine = (machine) => {
        this.setState({ machinePointOfSale: [...this.state.machinePointOfSale, machine] })
    };

    formMachine = () => {
        this.setState({ form: !this.state.form })
    }

    render() {
        const classes = this.props.classes;

        return (
            <Container className={classes.borderPDV} maxWidth="xs">
                <Typography className={classes.title} component="h1" variant="h4">
                    {this.props.name}
                </Typography>
                <Typography className={classes.address} component="h1" variant="body1">
                    {this.props.location.formattedAddress}
                </Typography>

                <Typography className={classes.addPDVorMachine} component="h5" variant="h5" align="right" onClick={this.formMachine}>
                    Ajout d'une machine +
                </Typography>

                {this.state.form && (
                    <FormMachine handleFormMachine={this.formMachine} id_PointOfSale={this.props._id} updateMachine={this.updateMachine} />
                )}

                {!this.state.machinePointOfSale.length && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography component="h5" variant="h5" align="center">
                            Vous n'avez pas encore ajouté de machine pour ce point de vente
                        </Typography>
                        
                        <img style={{ width: "100px", borderRadius: "5px" }} src="/media/machine-jura.png" alt="" />

                    </div>
                )}

                <div className="pointOfSale">
                    {this.state.machinePointOfSale.map((machine, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Machine
                                    key={index}
                                    {...machine}
                                    id_pointofSale={this.props._id}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </Container>
        )
    }
}

export default withMaterialStyles(PointOfSale)
