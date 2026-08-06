import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    pricing: {
      bronze: {
        type: Number,
        default: 10,
      },
      silver: {
        type: Number,
        default: 7,
      },
      gold: {
        type: Number,
        default: 5,
      },
      platinum: {
        type: Number,
        default: 2,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Setting || model("Setting", SettingSchema);
