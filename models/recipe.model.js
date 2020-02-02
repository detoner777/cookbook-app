const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    recipeName: { type: String, required: true },
    hidenId: { type: String, required: true },
    recipeDescription: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
