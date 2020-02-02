import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
const eyeIcon = <FontAwesomeIcon icon={faEye} />;
const clockIcon = <FontAwesomeIcon icon={faClock} />;

const Recipe = props => (
  <tr>
    <td className="recipe-name">{props.recipe.recipeNameBackup}</td>
    <td className="description-desktop">
      {props.recipe.recipeDescriptionBackup}
    </td>
    <td className="description-mobile">
      <Link
        to={{
          pathname: "/description/" + props.recipe._id,
          state: { name: `${props.recipe.recipeDescriptionBackup}` }
        }}
      >
        click to {eyeIcon}
      </Link>
    </td>
    <td>{props.recipe.cookingTimeBackup} min</td>
    <td>{props.recipe.dateBackup.substring(0, 10)}</td>
  </tr>
);

export default class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.toggleSortDate = this.toggleSortDate.bind(this);

    this.state = {
      recipes: [],
      isLoading: true
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
      .get(
        "https://cook-book-777.herokuapp.com/backups/" +
          this.props.match.params.hidenId
      )
      .then(response => {
        this.setState({ recipes: response.data, isLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  recipeList() {
    if (this.state.isLoading) {
      return <h3>Loading..</h3>;
    } else {
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
  }

  render() {
    return (
      <div>
        <h3>Recipe change history:</h3>
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
                  className="btn btn-outline-secondary"
                  onClick={this.toggleSortDate}
                  style={{ width: "60px" }}
                >
                  Date
                </button>
              </th>
            </tr>
          </thead>

          <tbody>{this.recipeList()}</tbody>
        </table>
      </div>
    );
  }
}
