import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);

    this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
    this.onChangeRecipeDescription = this.onChangeRecipeDescription.bind(this);
    this.onChangeCookingTime = this.onChangeCookingTime.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      recipeName: "",
      recipeDescription: "",
      cookingTime: 0,
      date: new Date(),
      hidenId: ""
    };
  }

  componentDidMount() {}

  onChangeRecipeName(e) {
    this.setState({
      recipeName: e.target.value
    });
  }

  onChangeRecipeDescription(e) {
    this.setState({
      recipeDescription: e.target.value
    });
  }

  onChangeCookingTime(e) {
    this.setState({
      cookingTime: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const ID = function() {
      return (
        "_" +
        Math.random()
          .toString(32)
          .substr(2, 20)
      );
    };

    const recipe = {
      recipeName: this.state.recipeName,
      recipeDescription: this.state.recipeDescription,
      cookingTime: this.state.cookingTime,
      date: this.state.date,
      hidenId: ID()
    };
    // console.log(recipe);

    const backup = {
      recipeNameBackup: this.state.recipeName,
      recipeDescriptionBackup: this.state.recipeDescription,
      cookingTimeBackup: this.state.cookingTime,
      dateBackup: this.state.date,
      hidenId: recipe.hidenId
    };
    // console.log(backup);

    axios
      .post("http://localhost:5000/recipes/add", recipe)
      .then(res => console.log(res.data));
    axios
      .post("http://localhost:5000/backups/add", backup)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Recipe</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter the name of your recipe: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.recipeName}
              onChange={this.onChangeRecipeName}
            />
          </div>

          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              required
              className="form-control"
              rows="3"
              value={this.state.recipeDescription}
              onChange={this.onChangeRecipeDescription}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Cooking time(in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.cookingTime}
              onChange={this.onChangeCookingTime}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Recipe"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
