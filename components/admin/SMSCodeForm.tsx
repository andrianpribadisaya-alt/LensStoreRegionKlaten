"use client";

import { useState } from "react";

import { saveProvider } from "@/app/admin/provider/actions";
import { testConnection } from "@/app/admin/provider/test-action";
import { syncServices } from "@/app/admin/provider/sync-services";
import { syncCountries } from "@/app/admin/provider/sync-countries";

interface ProviderSettings {
  apiKey: string;
  baseUrl: string;
  syncInterval: number;
  autoSync: boolean;
  active: boolean;
}

interface SMSCodeFormProps {
  provider: ProviderSettings;
}

export default function SMSCodeForm({
  provider,
}: SMSCodeFormProps) {
  const [form, setForm] = useState<ProviderSettings>({
    apiKey: provider?.apiKey || "",
    baseUrl: provider?.baseUrl || "https://smscode.gg/api",
    syncInterval: provider?.syncInterval || 10,
    autoSync: provider?.autoSync ?? true,
    active: provider?.active ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [syncingServices, setSyncingServices] = useState(false);
  const [syncingCountries, setSyncingCountries] = useState(false);

  const [message, setMessage] = useState("");

  async function save() {
    try {
      setLoading(true);
      setMessage("");

      await saveProvider(form);

      setMessage("Pengaturan SMSCode berhasil disimpan.");
    } catch (error) {
      console.error(error);

      setMessage(
        "Gagal menyimpan pengaturan SMSCode."
      );
    } finally {
      setLoading(false);
    }
  }

  async function test() {
    try {
      setTesting(true);
      setMessage("");

      const res = await testConnection();

      setMessage(
        res?.message ||
          "Koneksi SMSCode berhasil."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Gagal melakukan test koneksi SMSCode."
      );
    } finally {
      setTesting(false);
    }
  }

  async function handleSyncServices() {
    try {
      setSyncingServices(true);
      setMessage("");

      const res = await syncServices();

      setMessage(
        `Berhasil sync ${res.total} service.`
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Gagal melakukan sinkronisasi service."
      );
    } finally {
      setSyncingServices(false);
    }
  }

  async function handleSyncCountries() {
    try {
      setSyncingCountries(true);
      setMessage("");

      const res = await syncCountries();

      setMessage(
        `Berhasil sync ${res.total} negara.`
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Gagal melakukan sinkronisasi negara."
      );
    } finally {
      setSyncingCountries(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          SMSCode
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Kelola koneksi dan sinkronisasi provider SMSCode.
        </p>
      </div>

      {/* Settings Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="space-y-5">

          {/* API Key */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              API Key
            </label>

            <input
              type="password"
              value={form.apiKey}
              onChange={(e) =>
                setForm({
                  ...form,
                  apiKey: e.target.value,
                })
              }
              placeholder="Masukkan API Key SMSCode"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Base URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Base URL
            </label>

            <input
              type="text"
              value={form.baseUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  baseUrl: e.target.value,
                })
              }
              placeholder="https://smscode.gg/api"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-500"
            />
          </div>

          {/* Sync Interval */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sync Interval
            </label>

            <div className="flex items-center gap-3">

              <input
                type="number"
                min={1}
                value={form.syncInterval}
                onChange={(e) =>
                  setForm({
                    ...form,
                    syncInterval: Math.max(
                      1,
                      Number(e.target.value) || 1
                    ),
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <span className="text-sm text-slate-400">
                menit
              </span>

            </div>
          </div>

          {/* Auto Sync */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

            <div>
              <p className="font-medium text-white">
                Auto Sync
              </p>

              <p className="text-sm text-slate-400">
                Sinkronisasi data secara otomatis.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  autoSync: !form.autoSync,
                })
              }
              className={`relative h-6 w-11 rounded-full transition ${
                form.autoSync
                  ? "bg-blue-600"
                  : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  form.autoSync
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

          {/* Active */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

            <div>
              <p className="font-medium text-white">
                Status Provider
              </p>

              <p className="text-sm text-slate-400">
                Aktifkan atau nonaktifkan SMSCode.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  active: !form.active,
                })
              }
              className={`relative h-6 w-11 rounded-full transition ${
                form.active
                  ? "bg-green-600"
                  : "bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  form.active
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

      </div>

      {/* Sync */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-lg font-semibold text-white">
          Sinkronisasi
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Ambil data terbaru dari provider SMSCode dan simpan ke MongoDB.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          <button
            type="button"
            onClick={handleSyncServices}
            disabled={syncingServices}
            className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {syncingServices
              ? "Syncing Services..."
              : "Sync Services"}
          </button>

          <button
            type="button"
            onClick={handleSyncCountries}
            disabled={syncingCountries}
            className="rounded-xl bg-orange-600 px-5 py-3 font-medium text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {syncingCountries
              ? "Syncing Countries..."
              : "Sync Countries"}
          </button>

        </div>

      </div>

      {/* Actions */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={test}
            disabled={testing}
            className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {testing
              ? "Testing..."
              : "Test Connection"}
          </button>

          <button
            type="button"
            onClick={save}
            disabled={loading}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : "Simpan Pengaturan"}
          </button>

        </div>

      </div>

      {/* Message */}
      {message && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          {message}
        </div>
      )}

    </div>
  );
}
