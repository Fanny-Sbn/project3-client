import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, Typography } from "@material-ui/core";
import apiHandler from '../../api/apiHandler';

export class InterventionDemande extends Component {
    state = {
        httpResponse: null,
    };
    removeFromList = (id, update) => {
        apiHandler
            .updateIntervention(id, update)
            .then((data) => {
                this.setState({
                    httpResponse: {
                        status: "success",
                        message: "L'intervention a bien été supprimée",
                    },
                });
                this.timeoutId = setTimeout(() => {
                    this.setState({ httpResponse: null });
                    this.props.displayForm();
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

        return (
            <React.Fragment>
                <div>Nb d'intervention(s) : {this.props.intervention.length}</div>
                {this.props.intervention.map((oneIntervention, i) => {
                    console.log(oneIntervention)
                    return (
                        <Card style={{ padding: "10px" }} key={i}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "10px 0" }}>
                                <img style={{ width: "40px" }} src="../media/client.png" alt="heads" />
                                <div>
                                    <p>{oneIntervention.id_user.firstName} &nbsp; {oneIntervention.id_user.lastName} </p>
                                    <p> Tél : {oneIntervention.id_user.phoneNumber} </p>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", margin: "10px 0" }}>
                                <div>
                                    <p style={{ fontWeight: "bold" }}>{oneIntervention.id_pointofSale.name} </p>
                                    <Typography style={{ fontStyle: "oblique" }} component="h1" variant="body2">
                                        {oneIntervention.id_pointofSale.location.formattedAddress}
                                    </Typography>
                                </div>
                                <img style={{ width: "50px" }} src="../media/shop.png" alt="shop" />

                            </div>

                            <div>
                                <p style={{ fontWeight: "bold" }}>
                                    Machine :&nbsp; {oneIntervention.id_machine.brand}&nbsp;({oneIntervention.id_machine.model})
                                </p>


                            </div>


                            <div style={{ fontWeight: "bold" }}>{oneIntervention.title}
                                (<Moment format="DD/MM/YYYY">
                                    {oneIntervention.date}
                                </Moment>)
                            </div>
                            <ul>{oneIntervention.selectedOption.map((option, i) => {
                                return (<li style={{ listStyle: "inside" }} key={i}>{option}</li>)
                            })}
                            </ul>
                            <br />
                            <div><span style={{ fontWeight: "bold" }}>Description :</span>&nbsp;{oneIntervention.description}</div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <button style={{ padding: "10px", borderRadius: "50px", backgroundColor: "#FA8181", border: "0px", marginTop: "35px", color: "white", boxShadow: "5px 5px 2px 1px rgba(32, 201, 224, .2)" }} onClick={() => this.removeFromList(oneIntervention._id, oneIntervention.update)}>Supprimer de la liste</button>
                            </div>
                        </Card>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default InterventionDemande
