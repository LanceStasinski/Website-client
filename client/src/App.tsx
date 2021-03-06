import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import Footer from "./shared/components/Footer/Footer";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { PostContext } from "./shared/context/post-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { usePost } from "./shared/hooks/post-hook";

const About = lazy(() => import("./pages/about/About"));
const Auth = lazy(() => import("./pages/auth/Auth"));
const Blog = lazy(() => import("./pages/blog/Blog"));
const Post = lazy(() => import("./pages/blog/Post"));
const CreatePost = lazy(() => import("./pages/blog/CreatePost"));
const Resume = lazy(() => import("./pages/resume/Resume"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Portfolio = lazy(() => import("./pages/portfolio/Portfolio"));
const MoreInfo = lazy(() => import("./pages/portfolio/MoreInfo"));
function App() {
  const { token, login, logout, userId, username } = useAuth();
  const { post, setContext, clearContext } = usePost();

  let routes;

  if (token && userId === process.env.REACT_APP_ADMIN_USER) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/resume" exact>
          <Resume />
        </Route>
        <Route path="/portfolio" exact>
          <Portfolio />
        </Route>
        <Route path="/portfolio/more-info" exact>
          <MoreInfo />
        </Route>
        <Route path="/blog" exact>
          <Blog />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <PostContext.Provider
          value={{
            post,
            setContext,
            clearContext,
          }}
        >
          <Route path="/blog/create" exact>
            <CreatePost />
          </Route>
          <Route path="/blog/post/:postId" exact>
            <Post />
          </Route>
        </PostContext.Provider>

        <Redirect to="/" />
      </Switch>
    );
  } else if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/resume" exact>
          <Resume />
        </Route>
        <Route path="/portfolio" exact>
          <Portfolio />
        </Route>
        <Route path="/portfolio/more-info" exact>
          <MoreInfo />
        </Route>
        <Route path="/blog" exact>
          <Blog />
        </Route>
        <Route path="/blog/post/:postId" exact>
          <Post />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <About />
        </Route>
        <Route path="/resume" exact>
          <Resume />
        </Route>
        <Route path="/portfolio" exact>
          <Portfolio />
        </Route>
        <Route path="/portfolio/more-info" exact>
          <MoreInfo />
        </Route>
        <Route path="/blog" exact>
          <Blog />
        </Route>
        <Route path="/blog/post/:postId" exact>
          <Post />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
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
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
