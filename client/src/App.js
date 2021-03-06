import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import RecipesList from "./components/RecipesList";
import EditRecipe from "./components/EditRecipe";
import CreateRecipe from "./components/CreateRecipe";
import BackupHistory from "./components/BackupHistory";
import Description from "./components/Description";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RecipesList} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/description/:id" component={Description} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/backups/:hidenId" component={BackupHistory} />
      </div>
    </Router>
  );
}

export default App;
