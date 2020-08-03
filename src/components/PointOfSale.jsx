import React, { Component } from 'react'
import FormMachine from "../components/FormsMachinePDV/FormMachine";
import Machine from "./Machine"
import apiHandler from "../api/apiHandler";

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
        this.setState({machinePointOfSale: [...this.state.machinePointOfSale, machine] })
    };

    formMachine = () => {
        this.setState({ form: !this.state.form })
    }

    render() {
        return (
            <div>
                <h3>{this.props.name}</h3>
                <p>{this.props.location.formattedAddress}</p>
                <p style={{ textAlign: "right", color: "#20C9E0", fontWeight: "bold" }} onClick={this.formMachine}>Ajout d'une machine +</p>

                {this.state.form && (
                    <FormMachine handleFormMachine={this.formMachine} id_PointOfSale={this.props._id} updateMachine={this.updateMachine} />
                )}

                {!this.state.machinePointOfSale.length && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <p>Vous n'avez pas encore ajouté de machine pour ce point de vente</p>
                        <img style={{ width: "60vw", borderRadius: "5px" }} src="/media/magasin.jpg" alt="" />

                    </div>
                )}

                <div className="pointOfSale">
                    {this.state.machinePointOfSale.map((machine, index) => {
                        return (
                            <div key={index} style={{ margin: "20px", borderRadius: "5px", padding: "20px", border: "1px solid #B7CECE", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Machine
                                    key={index}
                                    {...machine}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default PointOfSale
