import axios from "axios";
import Setting from "@/models/Setting";

interface SMSCodeResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code?: string;
    message?: string;
  };
}

interface SMSCodeConfig {
  apiKey: string;
  baseUrl: string;
  active: boolean;
}

export async function getSMSCodeConfig(): Promise<SMSCodeConfig> {
  const setting = await Setting.findOne().lean();

  if (!setting) {
    throw new Error("Setting belum tersedia.");
  }

  const provider = setting.provider;

  if (!provider?.apiKey) {
    throw new Error(
      "API Key SMSCode belum diatur."
    );
  }

  return {
    apiKey: provider.apiKey,
    baseUrl:
      provider.baseUrl ||
      "https://api.smscode.gg/v1",
    active: provider.active ?? true,
  };
}

async function request<T>(
  endpoint: string
): Promise<T> {
  const config = await getSMSCodeConfig();

  if (!config.active) {
    throw new Error(
      "Provider SMSCode sedang dinonaktifkan."
    );
  }

  const url =
    `${config.baseUrl.replace(/\/$/, "")}` +
    `/${endpoint.replace(/^\//, "")}`;

  try {
    const response =
      await axios.get<SMSCodeResponse<T>>(url, {
        headers: {
          Authorization:
            `Bearer ${config.apiKey}`,
          Accept: "application/json",
        },
        timeout: 15000,
      });

    const result = response.data;

    if (!result.success) {
      throw new Error(
        result.error?.message ||
          "SMSCode API mengembalikan error."
      );
    }

    return result.data;
  } catch (error: any) {
    const apiMessage =
      error?.response?.data?.error?.message;

    if (apiMessage) {
      throw new Error(apiMessage);
    }

    if (error?.response?.status === 401) {
      throw new Error(
        "API Key SMSCode tidak valid."
      );
    }

    if (error?.response?.status === 429) {
      throw new Error(
        "Request SMSCode terlalu banyak. Silakan coba lagi."
      );
    }

    throw new Error(
      error?.message ||
        "Gagal menghubungi SMSCode."
    );
  }
}

export async function testSMSCode() {
  const balance = await request<unknown>(
    "balance"
  );

  return {
    success: true,
    message: "Koneksi SMSCode berhasil.",
    data: balance,
  };
}

export async function fetchServices() {
  return await request<any[]>(
    "catalog/services"
  );
}

export async function fetchCountries() {
  return await request<any[]>(
    "catalog/countries"
  );
}
