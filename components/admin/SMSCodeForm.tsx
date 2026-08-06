"use client";

import { useState } from "react";

import { saveProvider } from "@/app/admin/provider/actions";

import { testConnection } from "@/app/admin/provider/test-action";

export default function SMSCodeForm({provider}:any){

const [form,setForm]=useState(provider);

async function save(){

await saveProvider(form);

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

placeholder="API Key"

value={form.apiKey}

onChange={e=>setForm({...form,apiKey:e.target.value})}

/>

<input

className="input"

placeholder="Base URL"

value={form.baseUrl}

onChange={e=>setForm({...form,baseUrl:e.target.value})}

/>

<input

type="number"

className="input"

value={form.syncInterval}

onChange={e=>setForm({...form,syncInterval:Number(e.target.value)})}

/>

<label>

<input

type="checkbox"

checked={form.autoSync}

onChange={e=>setForm({...form,autoSync:e.target.checked})}

/>

Auto Sync

</label>

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

className="bg-green-600 text-white px-5 py-3 rounded-xl"

>

Test Connection

</button>

<button

onClick={save}

className="bg-blue-600 text-white px-5 py-3 rounded-xl"

>

Simpan

</button>

</div>

</div>

)

}
