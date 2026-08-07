"use client";

import { useState } from "react";
import { savePayment } from "@/app/admin/payment/actions";

export default function TokopayForm({
  payment,
}: any) {
  const [merchantId, setMerchantId] = useState(payment.merchantId);
  const [secretKey, setSecretKey] = useState(payment.secretKey);
  const [apiKey, setApiKey] = useState(payment.apiKey);
  const [expired, setExpired] = useState(payment.expired);
  const [uniqueCode, setUniqueCode] = useState(payment.uniqueCode);
  const [active, setActive] = useState(payment.active);

  async function save() {
    await savePayment({
      provider: "tokopay",
      merchantId,
      secretKey,
      apiKey,
      expired,
      uniqueCode,
      active,
    });

    alert("Berhasil disimpan");
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <input
          type="text"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          className="border p-3 rounded-xl"
          placeholder="Merchant ID"
        />

        <input
          type="text"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          className="border p-3 rounded-xl"
          placeholder="Secret Key"
        />

        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="border p-3 rounded-xl"
          placeholder="API Key"
        />

        <input
          type="number"
          value={expired}
          onChange={(e) => setExpired(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Masa Berlaku (menit)"
        />

        <input
          type="number"
          value={uniqueCode}
          onChange={(e) => setUniqueCode(Number(e.target.value))}
          className="border p-3 rounded-xl"
          placeholder="Kode Unik"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Aktifkan Tokopay
      </label>

      <button
        onClick={save}
        className="bg-blue-600 px-5 py-3 rounded-xl text-white"
      >
        Simpan
      </button>
    </div>
  );
}
