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
        <NavigationMenu isFullWidth={false} isMobileMenu={false}/>
        <AuthButton />
        {children}
        <div className="h-[2000px] bg-blue-100">

        </div>
      </body>
    </html>
  );
}
