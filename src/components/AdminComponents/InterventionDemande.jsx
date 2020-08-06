import React, { Component } from 'react'

export class InterventionDemande extends Component {

    removeFromList =(id)=>{
        console.log(id)
    }
    render() {

        return (
            <React.Fragment>
                <div>{this.props.test.length}</div>
                {this.props.test.map((oneIntervention, i) => {
                    return (
                        <div>
                            <div>{oneIntervention.title}</div>
                            <div>{oneIntervention.selectedOption.map((option, i) => {
                                return (<div>{option}</div>)
                            })}
                            </div>
                            <div>{oneIntervention.date}</div>
                            <div>{oneIntervention.description}</div>
                            <button onClick={()=>this.removeFromList(oneIntervention._id)}>Supprimer de la liste</button>
                        </div>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default InterventionDemande
