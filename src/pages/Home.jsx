import React from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../components/Auth/UserContext";
import { withUser } from "../components/Auth/withUser";
import FormReglage from "../components/InterventionForms/FormReglage";
import FormPDV from "../components/FormsMachinePDV/FormPDV";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state={
      displayForm: false,
      displayFormPDV:false,
      userPointOfSale:[],
    }
  };

  componentDidMount() {
    apiHandler
    .getUserPointOfSale()
    .then((data) => {
      this.setState({ userPointOfSale: data });
    });
  }


  handleForm =()=>{
    this.setState({displayFormPDV : !this.state.displayFormPDV})
  }

  render() {
    const { context } = this.props;
    const { user } = this.context;
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
            <p style={{textAlign: "center" }}>Bienvenue dans votre espace personnel {user.firstName}</p>

            {/* POINT DE VENTE */}
            <p style={{textAlign:"right"}} onClick={this.handleForm}>Ajouter un point de vente +</p>
            {this.state.displayFormPDV &&(
              <FormPDV displayForm={this.handleForm}/>
            )}
            <div style={{border:"1px solid black"}}>


            </div>

            {this.state.displayForm &&(
              <FormReglage />
            )}
          </React.Fragment>
        )}


      </div>
    );
  }
}

export default withUser(Home);
