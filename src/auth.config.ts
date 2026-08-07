import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// PENTING: file ini TIDAK BOLEH import mongoose atau "@/lib/db",
// karena dipakai di middleware.ts yang jalan di Edge Runtime,
// dan mongoose tidak kompatibel dengan Edge Runtime.
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
