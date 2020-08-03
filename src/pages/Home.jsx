import React from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import FormReglage from "../components/InterventionForms/FormReglage";
import FormPDV from "../components/FormsMachinePDV/FormPDV";
import PointOfSale from "../components/PointOfSale";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      formPDV: false,
      userPointOfSale: [],
    }
  }

  componentDidMount() {
    apiHandler
      .getUserPointOfSale()
      .then((userPointOfSale) => {
        this.setState({ userPointOfSale });
      });
  }

  updatePointOfSale = (pointOfSale) => {
    this.setState({ userPointOfSale: pointOfSale });
  };

  handleFormPDV = () => {
    this.setState({ formPDV: !this.state.formPDV })
  }

  render() {
    const { context } = this.props;
    const { user } = this.context;
    const { formDepannage, formEntretien, formReglage, formPDV, userPointOfSale} = this.state;
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

        {context.isLoggedIn && (
          <React.Fragment>
            <p style={{ textAlign: "center" }}>Bienvenue dans votre espace personnel {user.firstName}</p>
            <p style={{ textAlign: "right", color: "#20C9E0", fontWeight: "bold", cursor:"pointer" }} onClick={this.handleFormPDV}>Ajouter un point de vente +</p>
            {formPDV && (
              <FormPDV displayForm={this.handleFormPDV} updatePointOfSale={this.updatePointOfSale}/>
            )}

            {!userPointOfSale.length && (
              <div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
                <p>Vous n'avez pas encore ajouté de point de vente</p>
                <img style={{ width: "60vw", borderRadius: "5px"}} src="/media/magasin.jpg" alt="" />

              </div>
            )}

            <div className="pointOfSale">
              {userPointOfSale.map((pointOfSale, index) => {
                return (
                  <div key={index} style={{ margin: "20px", borderRadius: "5px", padding: "20px", border: "1px solid #B7CECE", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <PointOfSale
                      key={index}
                      {...pointOfSale}
                    />
                  </div>
                );
              })}
            </div>

            {formReglage && (
              <FormReglage />
            )}
          </React.Fragment>
        )}


      </div>
    );
  }
}

export default withUser(Home);
