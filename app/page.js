import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center justify-center">
      <div className=" relative h-[90vh] flex flex-col items-center  justify-center">
      <main className="text-center">
        <p className="text-center text-4xl w-11/12 m-auto leading-normal mb-10 opacity-70 font-[300]">From Curiosity to Creation of Knowledge.</p>
            <Link className='inline-block rounded-lg py-3 px-5  border text-sm' href='/articles'>Read Articles</Link>
      </main>
      </div>
    </div>
  );
}
