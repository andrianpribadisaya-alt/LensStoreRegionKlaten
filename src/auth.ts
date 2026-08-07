import NextAuth from "next-auth";

import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { randomString } from "@/lib/utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  callbacks: {
    async signIn({ profile }) {
      await connectDB();

      const email = profile?.email;

      if (!email) return false;

      const exists = await User.findOne({ email });

      if (!exists) {
        await User.create({
          googleId: profile?.sub,
          name: profile?.name,
          email,
          image: profile?.picture,
          role: "bronze",
          balance: 0,
          apiKey: randomString(40),
          status: "active",
        });
      }

      return true;
    },

    async jwt({ token }) {
      await connectDB();

      const user = await User.findOne({
        email: token.email,
      });

      if (user) {
        token.role = user.role;
        token.balance = user.balance;
        token.userId = user._id.toString();
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId as string;
      session.user.role = token.role as string;
      session.user.balance = token.balance as number;

      return session;
    },
  },
});
