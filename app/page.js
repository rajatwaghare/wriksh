import Image from "next/image";
import { RxInstagramLogo } from "react-icons/rx";


export default function Home() {
  return (
    <div className="  h-[99vh]  flex flex-col items-center justify-items-center justify-center">
      <div className=" relative h-[90vh] flex flex-col items-center  justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          src="/logo.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
          className="m-auto"
        />
        <p className=" font-[400] opacity-30">Blueprint for Generalists.</p>
      </main>
      <footer className=" absolute bottom-10 left-0 right-0 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex  items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.instagram.com/wriksh.act/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RxInstagramLogo />
          Instagram
        </a>
      </footer>
      </div>
    </div>
  );
}
