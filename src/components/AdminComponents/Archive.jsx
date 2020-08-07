import React, { Component } from 'react';
import { Card, Typography } from "@material-ui/core";
import apiHandler from '../../api/apiHandler';
import Moment from 'react-moment';

export class InterventionDemande extends Component {
    render() {

        return (
            <React.Fragment>
                <div>Nb d'intervention(s) archivée(s): {this.props.intervention.length}</div>
                {this.props.intervention.map((oneIntervention, i) => {
                    console.log(oneIntervention)
                    return (
                        <Card style={{ padding: "10px", margin: "10px 0" }} key={i}>
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


                            <div style={{ fontWeight: "bold" }}>{oneIntervention.title}
                            (<Moment format="DD/MM/YYYY">
                                    {oneIntervention.date}
                                </Moment>)</div>
                            <ul>{oneIntervention.selectedOption.map((option, i) => {
                                return (<li style={{ listStyle: "inside" }} key={i}>{option}</li>)
                            })}
                            </ul>
                            <br />
                            <div><span style={{ fontWeight: "bold" }}>Description :</span>&nbsp;{oneIntervention.description}</div>
                        </Card>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default InterventionDemande
