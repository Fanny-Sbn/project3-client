import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import FeedBack from "../FeedBack";

import { Avatar, Button, CssBaseline, TextField, Typography, Container, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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
  bold:{
    fontWeight:"bold"
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

class FormProfile extends Component {
  static contextType = UserContext;

  state = {
    httpResponse: null,
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  };

  isValidInput = (key) => {
    if (this.state[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state) {
      if (key === "httpResponse") continue;
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { httpResponse, ...data } = this.state;
    apiHandler
      .updateClient(data)
      .then((data) => {
        this.context.setUser(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Profil mis à jour avec succès",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.history.push("/profile");
        }, 3000);
      })
      .catch((error) => {
        this.setState({
          httpResponse: {
            status: "failure",
            message:
              "Une erreur s'est produite, veuillez réessayer de mettre à jour votre profil ultérieurement",
          },
        });

        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
        }, 2000);
      });
  };


  render() {
    const classes = this.props.classes;
    const { user } = this.context;
    const { httpResponse } = this.state;
    if (!user) return <div>Loading...</div>;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Typography className={classes.bold} component="h1" variant="h4">
            Modification du profil
        </Typography>
        <img style={{ width: "100px" }} src="./../media/coffee.png" alt="coffee" />

          {httpResponse && (
            <FeedBack
              message={httpResponse.message}
              status={httpResponse.status}
            />
          )}
          <form className={classes.form} onChange={this.handleChange} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  className={classes.border}
                  defaultValue={user.firstName}
                />
                {!this.isValidInput("firstName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lname"
                  className={classes.border}
                  defaultValue={user.lastName}
                />
                {!this.isValidInput("lastName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Nom de société"
                  name="companyName"
                  autoComplete="companyName"
                  className={classes.border}
                  defaultValue={user.companyName}
                />
                {!this.isValidInput("companyName") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Téléphone"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  className={classes.border}
                  defaultValue={user.phoneNumber}
                />
                {!this.isValidInput("phoneNumber") && (
                  <p className="input-error">Champ invalide</p>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  className={classes.border}
                  defaultValue={user.email}
                  disabled
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sauvegarder
          </Button>
          </form>
        </div>
      </Container>

    );
  }
}

export default withMaterialStyles(FormProfile);
