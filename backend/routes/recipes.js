const router = require("express").Router();
let Recipe = require("../models/recipe.model");

router.route("/").get((req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("Error: " + err));
});

//Create recipe route
router.route("/add").post((req, res) => {
  const recipeName = req.body.recipeName;
  const recipeDescription = req.body.recipeDescription;
  const hidenId = req.body.hidenId;
  const cookingTime = Number(req.body.cookingTime);
  const date = Date.parse(req.body.date);

  const newRecipe = new Recipe({
    recipeName,
    recipeDescription,
    hidenId,
    cookingTime,
    date
  });

  newRecipe
    .save()
    .then(() => res.json("Recipe added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.recipeName = req.body.recipeName;
      recipe.recipeDescription = req.body.recipeDescription;
      recipe.cookingTime = Number(req.body.cookingTime);
      recipe.date = Date.parse(req.body.date);
      recipe.hidenId = req.body.hidenId;

      recipe
        .save()
        .then(() => res.json("Recipe updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
