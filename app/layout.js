import { Fraunces } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-fraunces'
})

export const metadata = {
  title: "Wriksh - From Curiosity to Creation of Knowledge.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fraunces.className}>
        <Header />
        <div className=" mt-12 md:mt-14">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
