"use client";

import { useState } from "react";
import { savePricing } from "@/app/admin/pricing/actions";

export default function PricingForm({
  pricing,
}: any) {
  const [bronze, setBronze] = useState(pricing.bronze);
  const [silver, setSilver] = useState(pricing.silver);
  const [gold, setGold] = useState(pricing.gold);
  const [platinum, setPlatinum] = useState(pricing.platinum);

  const [providerPrice, setProviderPrice] =
    useState(5000);

  const calc = (margin: number) =>
    Math.ceil(
      providerPrice +
        (providerPrice * margin) / 100
    );

  async function save() {
    await savePricing({
      bronze,
      silver,
      gold,
      platinum,
    });

    alert("Berhasil disimpan");
  }

  return (
    <div className="space-y-6">

      <div className="grid md:grid-cols-2 gap-5">

        <input
          type="number"
          value={bronze}
          onChange={(e)=>setBronze(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Bronze (%)"
        />

        <input
          type="number"
          value={silver}
          onChange={(e)=>setSilver(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Silver (%)"
        />

        <input
          type="number"
          value={gold}
          onChange={(e)=>setGold(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Gold (%)"
        />

        <input
          type="number"
          value={platinum}
          onChange={(e)=>setPlatinum(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Platinum (%)"
        />

      </div>

      <div className="border rounded-xl p-5">

        <h2 className="font-bold mb-3">

          Preview Harga

        </h2>

        <input
          type="number"
          value={providerPrice}
          onChange={(e)=>setProviderPrice(Number(e.target.value))}
          className="border p-3 rounded-xl w-full"
        />

        <div className="mt-5 space-y-2">

          <p>Bronze : Rp {calc(bronze).toLocaleString()}</p>

          <p>Silver : Rp {calc(silver).toLocaleString()}</p>

          <p>Gold : Rp {calc(gold).toLocaleString()}</p>

          <p>Platinum : Rp {calc(platinum).toLocaleString()}</p>

        </div>

      </div>

      <button
        onClick={save}
        className="bg-blue-600 px-5 py-3 rounded-xl text-white"
      >
        Simpan
      </button>

    </div>
  );
}
