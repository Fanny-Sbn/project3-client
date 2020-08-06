import React from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import FormPDV from "../components/FormsMachinePDV/FormPDV";
import InterventionDemande from "../components/AdminComponents/InterventionDemande";
import PointOfSale from "../components/ClientsComponents/PointOfSale";
import apiHandler from "../api/apiHandler";

import { Avatar, Button, CssBaseline, TextField, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  addPDVorMachine: {
    margin: theme.spacing(3, 0, 2),
    color: "#20C9E0",
    fontWeight: "bold",
    cursor: "pointer"
  },
  addPadding: {
    padding: "15px",
  }
}));

const withMaterialStyles = (ComponentToPassStylesTo) => {
  return (props) => {
    const classes = useStyles();
    return <ComponentToPassStylesTo {...props} classes={classes} />;
  };
};

class Home extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      formPDV: false,
      depannage: false,
      entretien: false,
      reglages: false,
      reapprovisionnement: false,
      depannageDemande: [],
      entretienDemande: [],
      reglagesDemande: [],
      reapprovisionnementDemande: [],
      userPointOfSale: [],
    }
  }

  componentDidMount() {
    if (!this.context.isAdmin) {
      apiHandler
        .getUserPointOfSale()
        .then((userPointOfSale) => {
          this.setState({ userPointOfSale });
        })
        .catch((error) => console.log(error))
    }
  }

  updatePointOfSale = (pointOfSale) => {
    this.setState({ userPointOfSale: pointOfSale });
  };

  handleFormPDV = () => {
    this.setState({ formPDV: !this.state.formPDV })
  }

  handleDepannage = () => {
    this.setState({ depannage: !this.state.depannage })
    if (this.state.depannage === false) {
      apiHandler
        .getDepannage()
        .then((depannage) => {
          console.log(depannage, "-----", this.state.depannage)
          this.setState({ depannageDemande: depannage });
        })
        .catch((error) => console.log(error));
    }
  }

  handleEntretien = () => {
    this.setState({ entretien: !this.state.entretien })
    if (this.state.entretien === false) {
      apiHandler
        .getEntretien()
        .then((entretien) => {
          this.setState({ entretienDemande: entretien });
        })
        .catch((error) => console.log(error));
    }
  }

  handleReglages = () => {
    this.setState({ reglages: !this.state.reglages })
    if (this.state.reglages === false) {
      apiHandler
        .getReglages()
        .then((reglage) => {
          this.setState({ reglagesDemande: reglage });
        })
        .catch((error) => console.log(error));
    }
  }

  handleReapprovisionnement = () => {
    this.setState({ reapprovisionnement: !this.state.reapprovisionnement })
    if (this.state.reapprovisionnement === false) {
      apiHandler
        .getReapprovisionnement()
        .then((reapprovisionnement) => {
          console.log(reapprovisionnement)
          this.setState({ reapprovisionnementDemande: reapprovisionnement });
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    const { context } = this.props;
    const { user } = this.context;
    const { formPDV, depannage, entretien, reapprovisionnement, reglages,
      reglagesDemande, entretienDemande, depannageDemande, reapprovisionnementDemande,
      userPointOfSale } = this.state;
    const classes = this.props.classes;
    /* if (!user) return null; */

    return (
      <div>
        {!context.isLoggedIn && (
          <React.Fragment >
            <div style={{ textAlign: "center", margin: "20px" }}>
              <p>La société Hodas vous accompagne dans
              la maintenance de vos machines à café.</p> <br />

              <p>Si vous êtes l’un de nos clients, la création
              d’un compte vous permettra de signaler à
              l’entreprise un problème sur l’une de vos
              machines.</p>
            </div>

            <div style={{ textAlign: "center", textDecoration: "none" }}>
              <NavLink to="/signin"><button style={{ backgroundColor: "#20C9E0", border: "white", padding: "30px", borderRadius: "100px", color: "white", fontWeight: "bold", margin: "30px", width: "200px" }}>Se connecter</button></NavLink>
              <NavLink to="/signup"><button style={{ backgroundColor: "#20C9E0", border: "white", padding: "30px", borderRadius: "100px", color: "white", fontWeight: "bold", margin: "30px", width: "200px" }}>Créer un compte</button></NavLink>
            </div>
          </React.Fragment>)}

        {context.isLoggedIn && !context.isAdmin && (
          <Container className={classes.addPadding} component="main" maxWidth="md" >
            <Typography component="h1" variant="h4" align="center">
              Bienvenue dans votre espace personnel {user.firstName}
            </Typography>
            <Typography className={classes.addPDVorMachine} component="h1" variant="h5" align="right" onClick={this.handleFormPDV}>
              Ajouter un point de vente +
            </Typography>
            {formPDV && (
              <FormPDV displayForm={this.handleFormPDV} updatePointOfSale={this.updatePointOfSale} />
            )}

            {!userPointOfSale.length && (
              <Container component="main" maxWidth="xs">
                <p>Vous n'avez pas encore ajouté de point de vente</p>
                <img style={{ borderRadius: "5px" }} src="/media/magasin.jpg" alt="" />
              </Container>
            )}

            <div className="pointOfSale" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
              {userPointOfSale.map((pointOfSale, index) => {
                return (
                  <React.Fragment key={index}>
                    <PointOfSale
                      key={index}
                      {...pointOfSale}
                    />
                  </React.Fragment>

                );
              })}
            </div>
          </Container>
        )}

        {context.isLoggedIn && context.isAdmin && (
          <React.Fragment>
            <p style={{ textAlign: "center" }}>Bienvenue dans votre espace personnel {user.firstName}</p>
            <Link to="/liste-clients"><button style={{ backgroundColor: "#20C9E0", border: "white", padding: "30px", borderRadius: "100px", color: "white", fontWeight: "bold", margin: "30px", width: "200px" }}>Liste clients</button></Link>
            <Link to="/carto-point-vente"><button style={{ backgroundColor: "#20C9E0", border: "white", padding: "30px", borderRadius: "100px", color: "white", fontWeight: "bold", margin: "30px", width: "200px" }}>Cartographie des points de vente</button></Link>
            <div style={{ backgroundColor: "#B7CECE", borderRadius: "5px", margin: "20px", textAlign: "center" }} >Prochaines visites de contrôle</div>
            <div style={{ borderRadius: "5px", textAlign: "center", width: "40vw", margin: "10px", backgroundColor: "#B7CECE" }} onClick={this.handleDepannage}>Demande dépannage</div>
            {depannage && (
              <InterventionDemande displayForm={this.handleDepannage} test={depannageDemande} />
            )}

            <div style={{ borderRadius: "5px", textAlign: "center", width: "40vw", margin: "10px", backgroundColor: "#B7CECE" }} onClick={this.handleEntretien}>Demande entretien</div>
            {entretien && (
              <InterventionDemande displayForm={this.handleEntretien} test={entretienDemande} />
            )}

            <div style={{ borderRadius: "5px", textAlign: "center", width: "40vw", margin: "10px", backgroundColor: "#B7CECE" }} onClick={this.handleReapprovisionnement}>Demande réapprovisionnement</div>
            {reapprovisionnement && (
              <InterventionDemande displayForm={this.handleReapprovisionnement} test={reapprovisionnementDemande} />
            )}

            <div style={{ borderRadius: "5px", textAlign: "center", width: "40vw", margin: "10px", backgroundColor: "#B7CECE" }} onClick={this.handleReglages}>Demande réglages</div>
            {reglages && (
              <InterventionDemande displayForm={this.handleReglages} test={reglagesDemande} />
            )}
          </React.Fragment>
        )}


      </div>
    );
  }
}

export default withMaterialStyles(withUser(Home));
