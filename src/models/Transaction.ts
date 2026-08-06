import { Schema, model, models } from "mongoose";

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

export default models.Transaction ||
model("Transaction", TransactionSchema);
