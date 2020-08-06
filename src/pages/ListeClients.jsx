import React, { Component } from "react";
import SearchBar from '../components/SearchBar';
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import Client from "../components/AdminComponents/Client";
import {Container, Grid } from '@material-ui/core';


class ListeClients extends Component {
    static contextType = UserContext;
    state = {
        httpResponse: null,
        searchValue: "",
        clients: [],
    };

    componentDidMount() {
        apiHandler
            .getUsers()
            .then((clients) => {
                this.setState({ clients });
                console.log(clients)
            })
            .catch((error) => console.log(error));
    }

    handleSearch = (event) => {
        this.setState({ searchValue: event.target.value })
    }



    render() {
        const { clients } = this.state;
        /* if (!user) return null; */
        const filterClients = clients
            .filter((client) => {
                return client.companyName.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    client.firstName.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                    client.lastName.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })

        return (
            <React.Fragment>
                <Grid style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h2 style={{ textAlign: "center" }}>
                        Liste des clients
                </h2>
                    <SearchBar callback={this.handleSearch} searchValue={this.state.searchValue} />
                </Grid>



                {filterClients.map((client, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Container maxWidth="sl">
                                <Client
                                    key={index}
                                    {...client}
                                />
                            </Container>
                        </React.Fragment>
                    );
                })}

            </React.Fragment>
        );
    }
}

export default ListeClients;
