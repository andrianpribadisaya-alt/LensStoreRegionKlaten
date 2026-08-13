import type { Metadata } from "next";
import "./global.css";
import SessionWrapper from "@/components/layout/SessionWrapper";

export const metadata: Metadata = {
  title: "LensOtp - Premium OTP Marketplace",
  description: "LensOtp - Premium OTP Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
