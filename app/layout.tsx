import { Inter } from "next/font/google";
import "./globals.css";
import AuthButton from "@/components/header-auth";
import NavigationMenu from "@/components/navigation/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <NavigationMenu />
          <AuthButton />
          {children}
      </body>
    </html>
  );
}
