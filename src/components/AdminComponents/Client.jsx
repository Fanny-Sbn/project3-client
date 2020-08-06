import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import { Card, Typography } from '@material-ui/core';

class Clients extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        searchValue: "",
    };

    render() {
        return (
            <React.Fragment>
                <Card xs={12} xl={3} lg={3} sm={6} style={{ border: "1px solid #EBBEA4", margin: "10px 0px", padding: "10px", boxShadow:"5px 5px 2px 1px rgba(182, 127, 97, .3)" }} >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around",margin:"10px 0" }}>
                        <img style={{ width: "40px" }} src="../media/client.png" alt="heads" />
                        <div>
                            <p>{this.props.firstName} &nbsp; {this.props.lastName} </p>
                            <p> Tél : {this.props.phoneNumber} </p>
                            <p>Société&nbsp;:&nbsp;{this.props.companyName}</p>
                            <p>Email&nbsp;:&nbsp;{this.props.email}</p>
                        </div>
                    </div>

                    <div style={{ fontStyle: "oblique", fontWeight: "bold" }}>Points de vente ({this.props.pointsOfSale.length}) : </div>
                    {this.props.pointsOfSale.map((el, i) => {
                        return (<Card style={{margin:"10px 0px",padding:"10px"}}>
                            <img style={{ width: "50px" }} src="../media/shop.png" alt="shop" />
                            <div>{el.name}
                                <Typography style={{fontStyle: "oblique"}} component="h1" variant="body2">
                                {el.location.formattedAddress}
                                </Typography>
                             <p>{el.machines.length}&nbsp;machine(s)</p></div>
                            <ul>{el.machines.map((machine, i) => {
                                return <li style={{listStyle:"inside"}}>{machine.brand}&nbsp;({machine.model})</li>
                            })}
                            </ul>
                        </Card>)

                    })}
                </Card>

            </React.Fragment>
        );
    }
}

export default Clients;

