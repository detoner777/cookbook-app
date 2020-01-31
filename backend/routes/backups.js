const router = require("express").Router();
let Backup = require("../models/backup.model");

router.route("/").get((req, res) => {
  Backup.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json("Error: " + err));
});

//Backup route
router.route("/add").post((req, res) => {
  const recipeNameBackup = req.body.recipeNameBackup;
  const recipeDescriptionBackup = req.body.recipeDescriptionBackup;
  const hidenId = req.body.hidenId;
  const cookingTimeBackup = Number(req.body.cookingTimeBackup);
  const dateBackup = Date.parse(req.body.dateBackup);

  const newBackup = new Backup({
    recipeNameBackup,
    recipeDescriptionBackup,
    hidenId,
    cookingTimeBackup,
    dateBackup
  });

  newBackup
    .save()
    .then(() => res.json("Backup recipe added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
