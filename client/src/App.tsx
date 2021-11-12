import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const About = lazy(() => import("./about/About"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact></Route>
        <Route path="/blog/create" exact></Route>
        <Route path="/blog/:blogId" exact></Route>
        <Route path="/contact" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact></Route>
        <Route path="/blog/auth" exact></Route>
        <Route path="/contact" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      login: login,
      logout: logout,
      userId: userId,
      token: token
    }}>
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Suspense fallback={<LoadingSpinner asOverlay={false} />}>
          {routes}
        </Suspense>
      </main>
    </BrowserRouter></AuthContext.Provider>
  );
}

export default App;
