import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import apiHandler from "../api/apiHandler";
import MarkerDisplay from "../components/AdminComponents/MarkerDisplay"

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});


export class MapDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 2.351027,
            lat: 48.855,
            zoom: 11,
            pointOfSale: null,
            pointsOfSales: [],
        };
    }

    componentDidMount() {
        apiHandler
            .getAllPointsOfSales()
            .then((pdv) => {
                this.setState({ pointsOfSales: pdv });
            })
            .catch((error) => console.log(error));
    }

    markerClick = (pointOfSale) => {
        this.setState({ pointOfSale: pointOfSale })
    }

    handleClose = () => {
        this.setState({ pointOfSale: null });
    };

    render() {
        console.log(this.state.pointOfSale)
        return (
            <div>
                {this.state.pointOfSale !== null && (
                    <MarkerDisplay
                        pdv={this.state.pointOfSale}
                        handleClose={this.handleClose}
                    />
                )}

                <Map
                    style="mapbox://styles/mapbox/streets-v8"
                    containerStyle={{
                        height: "100vh",
                        width: "100vw",
                    }}
                    center={[2.351027, 48.855]}
                >
                    {this.state.pointsOfSales.map((marker, _id) => {
                        
                        if (marker.location.coordinates.length !== 0) {
                           return <Marker
                                key={marker._id}
                                coordinates={marker.location.coordinates}
                                anchor="bottom"
                                onClick={(event) => {
                                    this.markerClick(marker);
                                }}
                            >
                                <img src="../media/coffee-cup.png" style={{ width: 45, height: 45 }} alt="marker" />
                            </Marker>
                        }

                    })}
                </Map>

            </div>
        );
    }
}

export default MapDisplay;