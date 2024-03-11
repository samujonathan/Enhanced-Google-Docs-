// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import TextEditor from "./components/TextEditor";
import SignupPage from "./components/SignupPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Render loading indicator while checking authentication status
    return <div>Loading... try reloading the page</div>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/dashboard"
          render={() => (isAuthenticated ? <Dashboard /> : <Redirect to="/" />)}
        />
        <Route
          path="/documents/:id"
          render={() =>
            isAuthenticated ? <TextEditor /> : <Redirect to="/" />
          }
        />
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route path="/signup" component={SignupPage} />
      </Switch>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Please login to access the dashboard.</p>
      <a href="/login">Login</a>
    </div>
  );
}

export default App;
