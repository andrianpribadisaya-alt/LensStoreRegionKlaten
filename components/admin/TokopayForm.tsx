"use client";

import { useState } from "react";

import { savePayment } from "@/app/admin/payment/actions";

import { testConnection } from "@/app/admin/payment/test-action";

export default function TokopayForm({payment}:any){

const [form,setForm]=useState(payment);

async function save(){

await savePayment(form);

alert("Berhasil disimpan");

}

async function test(){

const res=await testConnection();

alert(res.message);

}

return(

<div className="space-y-5">

<input

className="input"

placeholder="Merchant ID"

value={form.merchantId}

onChange={e=>setForm({...form,merchantId:e.target.value})}

/>

<input

className="input"

placeholder="Secret Key"

value={form.secretKey}

onChange={e=>setForm({...form,secretKey:e.target.value})}

/>

<input

className="input"

placeholder="API Key"

value={form.apiKey}

onChange={e=>setForm({...form,apiKey:e.target.value})}

/>

<input

type="number"

className="input"

value={form.expired}

onChange={e=>setForm({...form,expired:Number(e.target.value)})}

/>

<input

type="number"

className="input"

value={form.uniqueCode}

onChange={e=>setForm({...form,uniqueCode:Number(e.target.value)})}

/>

<label>

<input

type="checkbox"

checked={form.active}

onChange={e=>setForm({...form,active:e.target.checked})}

/>

Aktif

</label>

<div className="flex gap-3">

<button

onClick={test}

className="bg-green-600 px-5 py-3 rounded-xl text-white"

>

Test Connection

</button>

<button

onClick={save}

className="bg-blue-600 px-5 py-3 rounded-xl text-white"

>

Simpan

</button>

</div>

</div>

)

}
