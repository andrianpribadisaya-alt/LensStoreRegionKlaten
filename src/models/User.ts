import { Schema, model, models, Model } from "mongoose";

export type UserRole =
  | "admin"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum";

export type UserStatus =
  | "active"
  | "banned";

const UserSchema = new Schema(
  {
    googleId: {
      type: String,
      default: null,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: [
        "admin",
        "bronze",
        "silver",
        "gold",
        "platinum",
      ],
      default: "bronze",
    },

    balance: {
      type: Number,
      default: 0,
    },

    apiKey: {
      type: String,
      unique: true,
      sparse: true,
    },

    totalDeposit: {
      type: Number,
      default: 0,
    },

    totalOrder: {
      type: Number,
      default: 0,
    },

    totalSpent: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "banned"],
      default: "active",
    },

    lastLogin: Date
  },
  {
    timestamps: true,
  }
);

export default (models.User as any) || model("User", UserSchema);
