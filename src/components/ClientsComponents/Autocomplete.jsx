import React, { Component } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: "75px",
    height: "auto",
    margin: theme.spacing(3),
    backgroundColor: "transparent",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#20C9E0",
    fontWeight: "bold"
  },
  border: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "brown"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#20C9E0",
    }
  }
}));

const withMaterialStyles = (ComponentToPassStylesTo) => {
  return (props) => {
    const classes = useStyles();
    return <ComponentToPassStylesTo {...props} classes={classes} />;
  };
};



class AutocompletePlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      isLoading: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.setState({
      search: e.target.value,
      isLoading: true,
    });

    // Stop the previous setTimeout if there is one in progress
    clearTimeout(this.timeoutId);

    // Launch a new request in 1000ms (1s) => Avoids excessive requests to the end point.
    this.timeoutId = setTimeout(() => {
      this.performSearch();
    }, 1000);
  }

  performSearch() {
    if (this.state.search === "") {
      this.setState({
        results: [],
        isLoading: false,
      });
      return;
    }

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.search}.json?proximity=2.34809,48.85993&country=fr&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      )
      .then((response) => {
        this.setState({
          results: response.data.features,
          isLoading: false,
        });
      });
  }

  handleItemClicked(place) {
    this.setState({
      search: place.place_name,
      results: [],
    });

    this.props.onSelect(place);
  }

  render() {
    const { results, isLoading } = this.state;
    const classes = this.props.classes;

    return (
      <div className="AutocompletePlace">
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="address"
              label="Adresse du point de vente"
              id="address"
              className={classes.border}
              onChange={this.handleSearchChange}
              value={this.props.defaultValue || this.state.search}
            />
          
        <ul className="AutocompletePlace-results">
          {results.map((place) => (
            <li
              key={place.id}
              className="AutocompletePlace-items"
              onClick={() => this.handleItemClicked(place)}
            >
              {place.place_name}
            </li>
          ))}
          {isLoading && <li className="AutocompletePlace-items">Chargement...</li>}
        </ul>
      </div>
    );
  }
}

export default withMaterialStyles(AutocompletePlace);


