import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import Card from '@material-ui/core/Card';

class Clients extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        searchValue: "",
    };

    render() {
        return (
            <React.Fragment>
                <Card xs={12} xl={3} lg={3} sm={6} >
                    <p>{this.props.firstName} &nbsp; {this.props.lastName} Tél : {this.props.phoneNumber} </p>
                    <p>Nom de société:{this.props.companyName}</p>

                    <div>Points de vente :</div>
                    {this.props.pointsOfSale.map((el, i) => {
                        return (<div>
                            <div>{el.name}(<span style={{fontStyle:"oblique"}}>{el.location.formattedAddress}</span>)&nbsp;:&nbsp;{el.machines.length}&nbsp;machine(s)</div>
                            <ul>{el.machines.map((machine, i) => {
                                return <li>{machine.brand}</li>
                            })}
                            </ul>
                        </div>)

                    })}
                </Card>

            </React.Fragment>
        );
    }
}

export default Clients;

