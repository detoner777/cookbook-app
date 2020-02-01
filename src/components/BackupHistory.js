import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
const clockIcon = <FontAwesomeIcon icon={faClock} />;

const Recipe = props => (
  <tr>
    <td>{props.recipe.recipeNameBackup}</td>
    <td>{props.recipe.recipeDescriptionBackup}</td>
    <td>{props.recipe.cookingTimeBackup} min</td>
    <td>{props.recipe.dateBackup.substring(0, 10)}</td>
  </tr>
);

export default class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.toggleSortDate = this.toggleSortDate.bind(this);

    this.state = {
      recipes: []
    };
  }

  sortByDate() {
    const sortRecipes = this.state.recipes;
    sortRecipes
      .sort((a, b) => {
        return (
          new Date(a.dateBackup).getTime() - new Date(b.dateBackup).getTime()
        );
      })
      .reverse();
    this.setState({
      recipes: sortRecipes
    });
  }

  toggleSortDate(e) {
    this.sortByDate();
    e.preventDefault();
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/backups/" + this.props.match.params.hidenId)
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // deleteRecipe(id) {
  //   axios.delete("http://localhost:5000/recipes/" + id).then(response => {
  //     console.log(response.data);
  //   });

  //   this.setState({
  //     recipes: this.state.recipes.filter(el => el._id !== id)
  //   });
  // }

  recipeList() {
    return this.state.recipes.map(currentrecipe => {
      return (
        <Recipe
          recipe={currentrecipe}
          // deleteRecipe={this.deleteRecipe}
          key={currentrecipe._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>All recipes:</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Dish</th>
              <th>Description</th>

              <th style={{ width: "80px" }}>{clockIcon}</th>
              <th style={{ width: "108px" }}>
                {" "}
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  onClick={this.toggleSortDate}
                  style={{ width: "60px" }}
                >
                  Date
                </button>
              </th>
              <th style={{ width: "108px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>{this.recipeList()}</tbody>
        </table>
      </div>
    );
  }
}
