import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
const clockIcon = <FontAwesomeIcon icon={faClock} />;

const Recipe = props => (
  <tr>
    <td>{props.recipe.recipeName}</td>
    <td>{props.recipe.recipeDescription}</td>
    <td>{props.recipe.cookingTime} min</td>
    <td>{props.recipe.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.recipe._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteRecipe(props.recipe._id);
        }}
      >
        delete
      </a>{" "}
      | <Link to={"/history/" + props.recipe._id}>history</Link> |
    </td>
  </tr>
);

export default class RecipesList extends Component {
  constructor(props) {
    super(props);

    this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = {
      recipeName: "",
      recipeDescription: "",
      cookingTime: 0,
      date: new Date(),
      hidenId: "",
      recipes: []

      // users: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/recipes/")
      .then(response => {
        this.setState({ recipes: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/recipes/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          recipeName: response.data.recipeName,
          recipeDescription: response.data.recipeDescription,
          cookingTime: response.data.cookingTime,
          date: new Date(response.data.date),
          hidenId: response.data.hidenId
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    console.log(this.props.match.params.id);
  }

  deleteRecipe(id) {
    axios.delete("http://localhost:5000/recipes/" + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      recipes: this.state.recipes.filter(el => el._id !== id)
    });
  }

  recipeList() {
    return this.state.recipes.map(currentrecipe => {
      return (
        <Recipe
          recipe={currentrecipe}
          deleteRecipe={this.deleteRecipe}
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
              <th style={{ width: "108px" }}>Date</th>
              <th style={{ width: "108px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>{this.recipeList()}</tbody>
        </table>
      </div>
    );
  }
}
