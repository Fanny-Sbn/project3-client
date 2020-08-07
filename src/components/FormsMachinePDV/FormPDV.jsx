import React, { Component } from "react";
import Autocomplete from "../ClientsComponents/Autocomplete";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

//material-ui
import {Avatar, Button, CssBaseline, TextField, Typography, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
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

class FormPDV extends Component {
  static contextType = UserContext;
  state = {
    httpResponse: null,
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { httpResponse, ...data } = this.state;
    apiHandler
      .addPointOfSale(data)
      .then((allPDV) => {
        this.props.updatePointOfSale(allPDV)
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre point de vente a bien été créé",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.displayForm();
        }, 3000);
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

  handlePlace = (place) => {
    const location = place.geometry;
    location.formattedAddress = place.place_name;
    this.setState({ location });
  };

  render() {
    const classes = this.props.classes;
    const { httpResponse } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <p style={{ cursor: "pointer", fontWeight:"bold" }} onClick={this.props.displayForm} className="close-link">
            X
        </p>
          <Avatar className={classes.avatar}>
            <img src="../media/shop2.png" alt="coffee-cup" />
          </Avatar>

          <Typography component="h1" variant="h5">
            Ajout d'un point de vente
        </Typography>
          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <form className={classes.form} onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nom du point de vente"
              name="name"
              autoComplete="name"
              autoFocus
              className={classes.border}
            />

            <Autocomplete
              onSelect={this.handlePlace}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter ce point de vente
          </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withMaterialStyles(FormPDV);
