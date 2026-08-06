import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
    },

    value: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

export default models.Setting ||
model("Setting", SettingSchema);
