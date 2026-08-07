import { Schema, model, models, Model } from "mongoose";

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "deposit",
        "purchase",
        "refund",
        "adjustment"
      ],
      required: true,
    },

    amount: Number,

    balanceBefore: Number,

    balanceAfter: Number,

    note: String,
  },
  {
    timestamps: true,
  }
);

export default (models.Transaction as Model<any>) ||
  model("Transaction", TransactionSchema);
