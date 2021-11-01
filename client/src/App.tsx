import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

function App() {
  let token = true;

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact></Route>
        <Route path="/blog/create" exact></Route>
        <Route path='/blog/:blogId'></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact></Route>
        <Route path="/blog/auth" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App;
