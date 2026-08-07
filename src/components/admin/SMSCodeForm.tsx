"use client";

import { useState } from "react";

import {
  saveProvider,
} from "@/app/admin/provider/actions";

import {
  testConnection,
} from "@/app/admin/provider/test-action";

import {
  syncServices,
} from "@/app/admin/provider/sync-services";

import {
  syncCountries,
} from "@/app/admin/provider/sync-countries";

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
  const [form, setForm] =
    useState<ProviderSettings>({
      apiKey: provider?.apiKey || "",
      baseUrl:
        provider?.baseUrl ||
        "https://api.smscode.gg/v1",
      syncInterval:
        provider?.syncInterval || 10,
      autoSync:
        provider?.autoSync ?? true,
      active:
        provider?.active ?? true,
    });

  const [loading, setLoading] =
    useState(false);

  const [testing, setTesting] =
    useState(false);

  const [syncingServices, setSyncingServices] =
    useState(false);

  const [syncingCountries, setSyncingCountries] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function save() {
    try {
      setLoading(true);
      setMessage("");

      const result =
        await saveProvider(form);

      setMessage(
        result.message
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Gagal menyimpan pengaturan."
      );
    } finally {
      setLoading(false);
    }
  }

  async function test() {
    try {
      setTesting(true);
      setMessage("");

      const result =
        await testConnection();

      setMessage(
        result.message
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Gagal melakukan test koneksi."
      );
    } finally {
      setTesting(false);
    }
  }

  async function handleSyncServices() {
    try {
      setSyncingServices(true);
      setMessage("");

      const result =
        await syncServices();

      setMessage(
        result.message
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Gagal sinkronisasi service."
      );
    } finally {
      setSyncingServices(false);
    }
  }

  async function handleSyncCountries() {
    try {
      setSyncingCountries(true);
      setMessage("");

      const result =
        await syncCountries();

      setMessage(
        result.message
      );
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Gagal sinkronisasi negara."
      );
    } finally {
      setSyncingCountries(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-white">
          SMSCode
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Kelola API dan sinkronisasi SMSCode.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="space-y-5">

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
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

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
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            <p className="mt-2 text-xs text-slate-500">
              Default: https://api.smscode.gg/v1
            </p>
          </div>

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
                    syncInterval:
                      Math.max(
                        1,
                        Number(
                          e.target.value
                        ) || 1
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

          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

            <div>
              <p className="font-medium text-white">
                Auto Sync
              </p>

              <p className="text-sm text-slate-400">
                Sinkronisasi otomatis.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  autoSync:
                    !form.autoSync,
                })
              }
              className={`relative h-6 w-11 rounded-full ${
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

          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">

            <div>
              <p className="font-medium text-white">
                Status Provider
              </p>

              <p className="text-sm text-slate-400">
                Aktifkan SMSCode.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  active:
                    !form.active,
                })
              }
              className={`relative h-6 w-11 rounded-full ${
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

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-lg font-semibold text-white">
          Sinkronisasi
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Ambil data terbaru dari SMSCode.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">

          <button
            type="button"
            onClick={
              handleSyncServices
            }
            disabled={
              syncingServices
            }
            className="rounded-xl bg-purple-600 px-5 py-3 font-medium text-white hover:bg-purple-500 disabled:opacity-50"
          >
            {syncingServices
              ? "Syncing..."
              : "Sync Services"}
          </button>

          <button
            type="button"
            onClick={
              handleSyncCountries
            }
            disabled={
              syncingCountries
            }
            className="rounded-xl bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-500 disabled:opacity-50"
          >
            {syncingCountries
              ? "Syncing..."
              : "Sync Countries"}
          </button>

        </div>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            type="button"
            onClick={test}
            disabled={testing}
            className="flex-1 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-500 disabled:opacity-50"
          >
            {testing
              ? "Testing..."
              : "Test Connection"}
          </button>

          <button
            type="button"
            onClick={save}
            disabled={loading}
            className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {loading
              ? "Menyimpan..."
              : "Simpan Pengaturan"}
          </button>

        </div>

      </div>

      {message && (
        <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
          {message}
        </div>
      )}

    </div>
  );
}
