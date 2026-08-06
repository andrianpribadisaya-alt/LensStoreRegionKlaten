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

      callbackUrl: {
        type: String,
        default: "",
      },
    },

    smscode: {
      apiKey: {
        type: String,
        default: "",
      },

      baseUrl: {
        type: String,
        default: "https://smscode.gg/api",
      },
    },

    maintenance: {
      enabled: {
        type: Boolean,
        default: false,
      },

      message: {
        type: String,
        default: "",
      },
    },

    announcement: {
      enabled: {
        type: Boolean,
        default: false,
      },

      title: {
        type: String,
        default: "",
      },

      message: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Setting || model("Setting", SettingSchema);
