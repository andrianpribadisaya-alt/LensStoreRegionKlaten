import { Schema, model, models } from "mongoose";

const CountrySchema = new Schema(
  {
    countryId: {
      type: String,
      unique: true,
      index: true,
    },

    name: String,

    code: String,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Country || model("Country", CountrySchema);
