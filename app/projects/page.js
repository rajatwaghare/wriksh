import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <>
      <div style={{
        backgroundColor: '#f7f7f7',
        opacity: 0.9,
        background:
          'repeating-linear-gradient(to right, #d3d3d3, #d3d3d3 0.6000000000000001px, #f7f7f7 0.6000000000000001px, #f7f7f7)',
        backgroundSize: '6px 6px'
      }}
        className="flex flex-col items-center justify-items-center justify-center">
        <div className=" relative h-[90vh] flex flex-col items-center  justify-center">
          <main className="text-center">
            <p className="text-center text-4xl m-auto leading-normal mb-10 opacity-70 font-[300]">Coming Soon</p>
            <Link className='inline-block rounded-lg py-3 px-5  border text-sm' href='/articles'>Read Articles</Link>
          </main>
        </div>
      </div>
    </>
  )
}

export default page