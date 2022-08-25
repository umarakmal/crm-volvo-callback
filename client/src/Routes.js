import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Signin from "./auth/Signin";
import AdminRoute from "./auth/AdminRoute";
import PageNotFound from "./component/PageNotFound";
import HomeUser from "./component/user/HomeUser";
import AddUser from "./component/user/AddUser";
import EditUser from "./component/user/EditUser";
import Report from "./component/Report";
import ChurnData from "./component/ChurnData";
import Agent from "./component/Agent";
import InputForm from "./component/InputForm";

const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoute path="/input" exact component={InputForm} />
        <AdminRoute path="/reportadmin" exact component={Report} />
        <AdminRoute path="/admin" exact component={App} />
        <AdminRoute path="/users" exact component={HomeUser} />
        <AdminRoute path="/adduser" exact component={AddUser} />
        <AdminRoute path="/edit/user/:id" exact component={EditUser} />
        <AdminRoute path="/churn" exact component={ChurnData} />
        <AdminRoute path="/agent" exact component={Agent} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
