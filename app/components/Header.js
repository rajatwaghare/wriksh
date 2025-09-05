import Link from 'next/link'
import React from 'react'
import Image from "next/image";

function Header() {
    return (
        <>
            <div className=' border-b fixed top-0 w-full z-10 bg-white  right-0 left-0'>
                <div className='container flex justify-between m-auto  mx-auto p-4'>
                    <div className='text-xs md:text-base flex gap-3 md:gap-6'>
                        <Link href='/'>Projects</Link>
                        <Link href='/'>Articles</Link>
                    </div>
                    <div className=''>
                        <Link href='/'>
                            <Image src="/logo.svg" alt="Next.js logo" width={40} height={38} priority className="m-auto w-6 md:w-10 " /></Link>
                    </div>
                    <div className='text-xs md:text-base flex gap-3 md:gap-6'>
                        <Link href='/about'>About</Link>
                        <Link href='/mission'>Mission</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header