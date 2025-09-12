import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center justify-center">
      <div className=" relative h-[90vh] flex flex-col items-center  justify-center">
        <main className="text-center">
          <p className="text-center text-4xl w-11/12 m-auto leading-normal mb-10 opacity-70 font-[300]">From Curiosity to Creation of Knowledge.</p>
          <p className="text-center text-xl max-w-lg w-11/12 m-auto leading-normal mb-10 opacity-70 font-[300]">Search for what is good and strong and beautiful in your society and elaborate from there. Push outward. Always create from what you already have. Then you will know what to do. <span className=' font-[400] !text-black !opacity-100' >— Michel Foucault</span></p>
          <Link className='inline-block rounded-lg py-3 px-5  border text-sm' href='/articles'>Read Articles</Link>
        </main>
      </div>
    </div>
  );
}
