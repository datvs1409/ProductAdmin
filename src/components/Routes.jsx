import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Inventory from "../pages/Inventory";
import Storage from "../pages/Storage";
import SearchFilter from "../pages/SearchFilter";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/goods" component={Products} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/storage" component={Storage} />
      <Route path="/search-filter" component={SearchFilter} />
    </Switch>
  );
};

export default Routes;
