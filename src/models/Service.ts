import { Schema, model, models, Model } from "mongoose";

const ServiceSchema = new Schema(
  {
    serviceId: {
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

export default (models.Service as Model<any>) ||
    model("Service", ServiceSchema);
