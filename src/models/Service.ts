import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    serviceId: {
      type: String,
      unique: true,
      index: true,
    },

    name: String,

    category: String,

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Service || model("Service", ServiceSchema);
