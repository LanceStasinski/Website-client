import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const About = lazy(() => import("./pages/about/About"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const Blog = lazy(() => import('./pages/blog/Blog'))
const Post = lazy(() => import('./pages/blog/Post'))

function App() {
  const { token, login, logout, userId, username } = useAuth();

  let routes;

  if (token && userId === process.env.REACT_APP_ADMIN_USER) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact><Blog /></Route>
        <Route path="/blog/create" exact></Route>
        <Route path="/blog/:blogId" exact><Post /></Route>
        <Route path="/contact" exact></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/cv" exact></Route>
        <Route path="/portfolio" exact></Route>
        <Route path="/blog" exact><Blog /></Route>
        <Route path="/blog/:postId" exact><Post /></Route>
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
        <Route path="/blog" exact><Blog /></Route>
        <Route path="/blog/:blogId" exact><Post /></Route>
        <Route path="/contact" exact></Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login: login,
        username: username,
        logout: logout,
        userId: userId,
        token: token,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Suspense fallback={<LoadingSpinner asOverlay={false} />}>
            {routes}
          </Suspense>
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
