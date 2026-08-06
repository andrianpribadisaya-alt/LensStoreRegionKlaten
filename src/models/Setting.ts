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

    payment: {
      provider: {
        type: String,
        default: "tokopay",
      },

      merchantId: {
        type: String,
        default: "",
      },

      secretKey: {
        type: String,
        default: "",
      },

      apiKey: {
        type: String,
        default: "",
      },

      expired: {
        type: Number,
        default: 60,
      },

      uniqueCode: {
        type: Number,
        default: 0,
      },

      active: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Setting || model("Setting", SettingSchema);
