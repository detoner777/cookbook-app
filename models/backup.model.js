const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const backupSchema = new Schema(
  {
    recipeNameBackup: { type: String, required: true },
    hidenId: { type: String, required: true },
    recipeDescriptionBackup: { type: String, required: true },
    cookingTimeBackup: { type: Number, required: true },
    dateBackup: { type: Date, required: true }
  },
  {
    timestamps: true
  }
);

const Backup = mongoose.model("Backup", backupSchema);

module.exports = Backup;
