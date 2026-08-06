function required(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} belum diisi`);
  }

  return value;
}

export const env = {
  MONGODB_URI: required("MONGODB_URI"),

  AUTH_SECRET: required("AUTH_SECRET"),

  AUTH_GOOGLE_ID: required("AUTH_GOOGLE_ID"),

  AUTH_GOOGLE_SECRET: required("AUTH_GOOGLE_SECRET"),

  TRIPAY_API_KEY: process.env.TRIPAY_API_KEY ?? "",

  TRIPAY_PRIVATE_KEY: process.env.TRIPAY_PRIVATE_KEY ?? "",

  TRIPAY_MERCHANT_CODE: process.env.TRIPAY_MERCHANT_CODE ?? "",

  SMSCODE_API_KEY: process.env.SMSCODE_API_KEY ?? "",
};
