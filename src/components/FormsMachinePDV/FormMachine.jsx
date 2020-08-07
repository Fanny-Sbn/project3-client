import React, { Component } from "react";
import UploadWidget from "../UploadWidget";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import FeedBack from "../FeedBack";

//material-ui
import {Avatar, Button, CssBaseline, TextField, Typography, Container} from '@material-ui/core';
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

class FormMachine extends Component {
  static contextType = UserContext;
  state = {
    brand: "",
    model: "",
    httpResponse: null,
    error: null,
  };

  handleChange = (event) => {
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .addMachine(this.props.id_PointOfSale, fd)
      .then((data) => {
        this.props.updateMachine(data);
        this.setState({
          httpResponse: {
            status: "success",
            message: "Votre machine a bien été créée",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.setState({ httpResponse: null });
          this.props.handleFormMachine();
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

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ image: file });
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
          <p style={{ cursor: "pointer", fontWeight: "bold" }} onClick={this.props.handleFormMachine} className="close-link">
            X
        </p>
          <Avatar className={classes.avatar}>
            <img src="../media/blue-machine.png" alt="coffee-cup" />
          </Avatar>

          <Typography component="h1" variant="h5">
            Ajout d'une machine
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
              id="brand"
              label="Marque de la machine"
              name="brand"
              autoComplete="brand"
              autoFocus
              className={classes.border}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="model"
              label="Modèle de la machine"
              name="model"
              autoComplete="model"
              className={classes.border}
            />

            <div className="form-group">
              <UploadWidget onFileSelect={this.handleFileSelect} name="image">
                Télécharger une image de la machine
              </UploadWidget>
            </div>



            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ajouter cette machine
          </Button>
          </form>
        </div>
      </Container>

    );
  }
}

export default withMaterialStyles(FormMachine);