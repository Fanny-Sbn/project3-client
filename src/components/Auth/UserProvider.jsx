import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import UserContext from "./UserContext";

class UserProvider extends Component {
  state = {
    user: null,
    isLoggedIn: false,
    isAdmin:false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        console.log(data)
        if (data.role === "admin"){
          this.setState({ user: data, isLoggedIn: true, isAdmin: true, isLoading: false });
        }
        else{
          this.setState({ user: data, isLoggedIn: true, isAdmin: false, isLoading: false });
        }
       
      })
      .catch((error) => {
        console.log(error);
        this.setState({ user: null, isLoggedIn: false, isAdmin:false, isLoading: false });
      });
  }

  setUser = (user) => {
    if (user.role ==="client"){
      this.setState({ user, isLoggedIn: true, isAdmin: false });
    } else{
      this.setState({ user, isLoggedIn: true, isAdmin: true });
    }
  };

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false, isAdmin:false });
  };

  render() {
    //  Setup all the values/functions you want to expose to anybody reading
    // from the AuthContext.
    const authValues = {
      user: this.state.user,
      setUser: this.setUser,
      removeUser: this.removeUser,
      isLoggedIn: this.state.isLoggedIn,
      isAdmin: this.state.isAdmin,
      isLoading: this.state.isLoading,
    };

    return (
      <UserContext.Provider value={authValues}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
