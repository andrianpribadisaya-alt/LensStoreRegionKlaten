import { Schema, model, models, Model } from "mongoose";

const CountrySchema = new Schema(
  {
    countryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    code: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      required: true,
    },

    dialCode: {
      type: String,
      default: "",
    },

    emoji: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
    },

    providerActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (models.Country as any) ||
  model("Country", CountrySchema);
