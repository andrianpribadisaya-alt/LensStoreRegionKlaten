import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    pricing: {
      bronze: { type: Number, default: 10 },
      silver: { type: Number, default: 7 },
      gold: { type: Number, default: 5 },
      platinum: { type: Number, default: 2 },
    },

    // Margin per tier (dalam persen %)
    margin: {
      bronze: { type: Number, default: 10 },
      silver: { type: Number, default: 8 },
      gold: { type: Number, default: 5 },
      platinum: { type: Number, default: 2 },
    },

    // Batas order untuk naik tier
    tierLimits: {
      silverMin: { type: Number, default: 100 },
      goldMin: { type: Number, default: 500 },
      platinumMin: { type: Number, default: 1000 },
    },

    // Tokopay
    tokopay: {
      merchantId: { type: String, default: "" },
      secretKey: { type: String, default: "" },
      active: { type: Boolean, default: false },
    },

    // Midtrans
    midtrans: {
      serverKey: { type: String, default: "" },
      clientKey: { type: String, default: "" },
      isProduction: { type: Boolean, default: false },
      active: { type: Boolean, default: false },
    },

    // Provider SMSCode
    provider: {
      name: { type: String, default: "smscode" },
      apiKey: { type: String, default: "" },
      baseUrl: { type: String, default: "https://api.smscode.gg/v1" },
      active: { type: Boolean, default: true },
    },

    announcement: {
      enabled: { type: Boolean, default: false },
      title: { type: String, default: "" },
      message: { type: String, default: "" },
    },

    maintenance: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default (models.Setting as any) || model("Setting", SettingSchema);
