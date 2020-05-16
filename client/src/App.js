import React, { Component } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';


const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route {...rest} render={(props) => (localStorage.getItem('jwt-Token') ? <Component {...props}/>
       : <Redirect strict to={{ pathname: "/home", state: { from: props.location }}} /> )}
   />
);

class App extends Component {

  componentDidMount() {
    if(localStorage.getItem('jwt-Token')) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return(
        <div>
          <Switch>
            <PrivateRoute path="/dashboard" />
            <Route component={HomePage} />
          </Switch>
        </div>
    )
  }

}

export default (App);
