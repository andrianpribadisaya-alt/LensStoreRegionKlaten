import { Schema, model, models } from "mongoose";

const SettingSchema = new Schema(
  {
    pricing: {
      bronze: { type: Number, default: 10 },
      silver: { type: Number, default: 7 },
      gold: { type: Number, default: 5 },
      platinum: { type: Number, default: 2 },
    },

    // Batas order untuk naik tier (diatur dari admin panel)
    tierLimits: {
      silverMin:  { type: Number, default: 100 },
      goldMin:    { type: Number, default: 500 },
      platinumMin:{ type: Number, default: 1000 },
    },

    payment: {
      provider:   { type: String, default: "tokopay" },
      merchantId: { type: String, default: "" },
      secretKey:  { type: String, default: "" },
      apiKey:     { type: String, default: "" },
      expired:    { type: Number, default: 60 },
      uniqueCode: { type: Number, default: 0 },
      active:     { type: Boolean, default: true },
    },

    provider: {
      name:         { type: String, default: "smscode" },
      apiKey:       { type: String, default: "" },
      baseUrl:      { type: String, default: "https://api.smscode.gg/v1" },
      autoSync:     { type: Boolean, default: true },
      syncInterval: { type: Number, default: 10 },
      active:       { type: Boolean, default: true },
    },

    announcement: {
      enabled: { type: Boolean, default: false },
      title:   { type: String, default: "" },
      message: { type: String, default: "" },
      color:   { type: String, default: "blue" },
    },

    maintenance: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: "" },
    },

    security: {
      maxLogin:   { type: Number, default: 5 },
      maxRequest: { type: Number, default: 100 },
      banMinutes: { type: Number, default: 30 },
    },
  },
  { timestamps: true }
);

export default (models.Setting as any) || model("Setting", SettingSchema);
