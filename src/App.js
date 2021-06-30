import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Customers from "./components/customers";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" component={MovieForm}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/notFound" component={NotFound}></Route>
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
