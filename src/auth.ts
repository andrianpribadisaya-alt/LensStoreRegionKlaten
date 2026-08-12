import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { randomString } from "@/lib/utils";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    ...authConfig.providers.filter((p: any) => p.id !== "credentials"),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connectDB();

          const user = await User.findOne({
            email: (credentials.email as string).toLowerCase(),
          });

          if (!user || !user.password) return null;
          if (user.status === "banned") return null;

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) return null;

          await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const email = profile?.email;
          if (!email) return false;

          const exists = await User.findOne({ email });
          if (!exists) {
            await User.create({
              googleId: profile?.sub,
              name: profile?.name,
              email,
              image: (profile as any)?.picture,
              role: "bronze",
              balance: 0,
              apiKey: randomString(40),
              status: "active",
            });
          } else {
            await User.findOneAndUpdate({ email }, { lastLogin: new Date() });
          }
        } catch (e) {
          console.error("signIn error:", e);
          return false;
        }
      }
      return true;
    },

    async jwt({ token }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: token.email });
        if (user) {
          token.role = user.role;
          token.balance = user.balance;
          token.userId = user._id.toString();
        }
      } catch (e) {}
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.userId;
        (session.user as any).role = token.role;
        (session.user as any).balance = token.balance;
      }
      return session;
    },
  },
});
