import React from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import FormPDV from "../components/FormsMachinePDV/FormPDV";
import InterventionDemande from "../components/AdminComponents/InterventionDemande";
import Archive from "../components/AdminComponents/Archive";
import PointOfSale from "../components/ClientsComponents/PointOfSale";
import apiHandler from "../api/apiHandler";

import { Typography, Container, Card, Grid } from '@material-ui/core';
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
      archive: false,
      reapprovisionnement: false,
      archiveIntervention: [],
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

  handleArchive = () => {
    this.setState({ archive: !this.state.archive })
    if (this.state.archive === false) {
      apiHandler
        .getArchive()
        .then((archive) => {
          this.setState({ archiveIntervention: archive });
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
    const { context } = this.props;
    const { user } = this.context;
    const { formPDV, depannage, entretien, reapprovisionnement, reglages,
      reglagesDemande, entretienDemande, depannageDemande, reapprovisionnementDemande,
      userPointOfSale, archive, archiveIntervention } = this.state;
    const classes = this.props.classes;
    /* if (!user) return null; */

    return (
      <div>
        {!context.isLoggedIn && (
          <React.Fragment >
            <div style={{ textAlign: "center", margin: "20px" }}>
              <p>La société Coffee&Trust vous accompagne dans
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
              <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid #20C9E0" }} component="main" maxWidth="xs">

                <p style={{ textAlign: "center" }}>Vous n'avez pas encore ajouté de point de vente</p>
                <img style={{ textAlign: "center", borderRadius: "5px", width: "200px" }} src="/media/magasin.jpg" alt="" />

              </Container>
            )}

            <div className="pointOfSale" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
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
          <Container className={classes.addPadding} component="main" maxWidth="md">
            <Typography style={{ margin: "10px 0px" }} component="h1" variant="h4" align="center">
              Bienvenue dans votre espace personnel {user.firstName}
            </Typography>

            <Link to="/liste-clients">
              <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", height: "60px", lineHeight: "60px", boxShadow: "5px 5px 2px 1px rgba(32, 201, 224, .2)" }} align="center">Liste clients</Card>
            </Link>
            <Link to="/carto-point-vente">
              <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", height: "60px", lineHeight: "60px", boxShadow: "5px 5px 2px 1px rgba(32 , 201, 224, .2)" }} align="center">Cartographie des points de vente</Card>
            </Link>
            {/*             <div style={{ backgroundColor: "#B7CECE", borderRadius: "5px", margin: "20px", textAlign: "center" }} >Prochaines visites de contrôle</div> */}

            <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px", boxShadow: "5px 5px 2px 1px rgba(182, 127, 97, .4)" }} onClick={this.handleDepannage}>
              <Typography component="h1" variant="h5">
                Demande dépannage
              </Typography>
              <img style={{ width: "40px" }} src="./media/tools.png" alt="Réa" />
            </Card>
            {depannage && (
              <InterventionDemande displayForm={this.handleDepannage} intervention={depannageDemande} />
            )}

            <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px", boxShadow: "5px 5px 2px 1px rgba(182, 127, 97, .4)" }} onClick={this.handleEntretien}>
              <Typography component="h1" variant="h5">
                Demande entretien
              </Typography>
              <img style={{ width: "40px" }} src="./media/entretien.png" alt="Réa" />
            </Card>
            {entretien && (
              <InterventionDemande displayForm={this.handleEntretien} intervention={entretienDemande} />
            )}

            <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px", boxShadow: "5px 5px 2px 1px rgba(182, 127, 97, .4)" }} onClick={this.handleReapprovisionnement}>
              <Typography component="h1" variant="h5">
                Demande réapprovisionnement
              </Typography>
              <img style={{ width: "40px" }} src="./media/beans-coffee.png" alt="Réa" />
            </Card>
            {reapprovisionnement && (
              <InterventionDemande displayForm={this.handleReapprovisionnement} intervention={reapprovisionnementDemande} />
            )}

            <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px", boxShadow: "5px 5px 2px 1px rgba(182, 127, 97, .4)" }} onClick={this.handleReglages}>
              <Typography component="h1" variant="h5">
                Demande réglages
              </Typography>
              <img style={{ width: "40px" }} src="./media/settings.png" alt="Réa" />
            </Card>
            {reglages && (
              <InterventionDemande displayForm={this.handleReglages} intervention={reglagesDemande} />
            )}

            <Card style={{ margin: "15px 0px", borderRadius: "10px", border: "1px solid #E5F4F4", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 10px", boxShadow: "5px 5px 2px 1px rgba(182, 127, 97, .4)" }} onClick={this.handleArchive}>
              <Typography component="h1" variant="h5">
                Interventions effectuées
              </Typography>
              <img style={{ width: "40px" }} src="./media/done.png" alt="Réa" />
            </Card>
            {archive && (
              <Archive displayForm={this.handleArchive} intervention={archiveIntervention} />
            )}
          </Container>
        )}


      </div>
    );
  }
}

export default withMaterialStyles(withUser(Home));
