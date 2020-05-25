import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import ContactData from './containers/Checkout/ContactData/ContactData';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
      return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  
  render() {

    let routes = (
      <Switch>
        <Route path = "/auth" component = {asyncAuth}/>
        <Route path ="/" exact component={BurgerBuilder}/>  
        <Redirect to ="/"/>
      </Switch>
    );

    if(this.props.isAthenticated){
      routes = (
          <Switch>
            <Route path ="/checkout" component={asyncCheckout}/>
            <Route path = "/orders" component={asyncOrders}/>
            <Route path = "/auth" component = {asyncAuth}/>
            <Route path = "/logout" component = {Logout}/>
            <Route path ="/" exact component={BurgerBuilder}/>
            <Redirect to ="/"/>
          </Switch>
      );
    }

    return (
      <div >
        <Layout>
          {routes}
         </Layout>
        
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
   isAthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch =>{
 return {
   onTryAutoSignUp: () => dispatch(actions.authCheckState())
 };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
