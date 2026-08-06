import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    service: String,

    country: String,

    phone: String,

    price: Number,

    sms: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "WAITING_SMS",
        "SUCCESS",
        "CANCELLED"
      ],
      default: "PENDING",
    },

    provider: {
      type: String,
      default: "smscode",
    }
  },
  {
    timestamps: true,
  }
);

export default models.Order || model("Order", OrderSchema);
