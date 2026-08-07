import axios from "axios";
import Setting from "@/models/Setting";

export async function getSMSCodeConfig() {
  const setting = await Setting.findOne();

  if (!setting) throw new Error("Setting belum ada");

  return setting.provider;
}

export async function fetchServices() {
  const config = await getSMSCodeConfig();

  const res = await axios.get(
    `${config.baseUrl}/services`,
    {
      headers: {
        Authorization: config.apiKey,
      },
    }
  );

  return res.data;
}

export async function fetchCountries() {
  const config = await getSMSCodeConfig();

  const res = await axios.get(
    `${config.baseUrl}/countries`,
    {
      headers: {
        Authorization: config.apiKey,
      },
    }
  );

  return res.data;
}
