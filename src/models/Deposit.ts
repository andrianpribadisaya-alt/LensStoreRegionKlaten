import { Schema, model, models, Model } from "mongoose";

const DepositSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    reference: {
      type: String,
      unique: true,
      required: true,
    },

    method: String,

    amount: Number,

    fee: Number,

    total: Number,

    status: {
      type: String,
      enum: [
        "UNPAID",
        "PAID",
        "EXPIRED",
        "FAILED"
      ],
      default: "UNPAID",
    },

    paidAt: Date
  },
  {
    timestamps: true,
  }
);

export default (models.Deposit as any) || model("Deposit", DepositSchema);
