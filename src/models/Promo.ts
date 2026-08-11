import { Schema, model, models } from "mongoose";

const PromoSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discount: { type: Number, required: true }, // persen, misal 10 = 10%
  maxUses: { type: Number, default: 0 }, // 0 = unlimited
  usedCount: { type: Number, default: 0 },
  minDeposit: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null },
}, { timestamps: true });

export default (models.Promo as any) || model("Promo", PromoSchema);
