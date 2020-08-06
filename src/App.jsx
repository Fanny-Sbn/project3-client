import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import MapDisplay from "./pages/MapDisplay";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import FormProfile from "./components/Forms/FormProfile";
import ListeClients from "./pages/ListeClients";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/liste-clients" component={ListeClients} />
        <Route exact path="/carto-point-vente" component={MapDisplay} />
        <ProtectedRoute exact path="/profile/settings" component={FormProfile}/>
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
