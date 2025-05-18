import { Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',            
  variable: '--font-fraunces' 
})



export const metadata = {
  title: "Wriksh - Anchor of Clarity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={fraunces.className}
      >
        {children}
      </body>
    </html>
  );
}
