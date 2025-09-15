import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { HiOutlineMenu } from "react-icons/hi";


function Header() {
    return (
        <>
            <div className=' border-b fixed top-0 w-full z-10 bg-white  right-0 left-0'>
                <div className='container flex justify-between items-center m-auto  mx-auto p-4 py-2 md:py-6'>
                    <div className=''>
                        <Link href='/'>
                            <Image src="/logo.svg" alt="Next.js logo" width={40} height={38} priority className="m-auto w-6 md:w-10 " />
                        </Link>
                    </div>
                    <div className='text-xs md:text-base flex gap-3 md:gap-12 items-center font-[400]'>
                        <Link className='hidden md:block' href='/articles'>Articles</Link>
                        <Link className='hidden md:block' href='/industries'>Industries</Link>
                        <Link className='hidden md:block' href='/projects'>Projects</Link>
                        <Link className='hidden md:block' href='/about'>About</Link>
                        <Link className='hidden md:block' href='/mission'>Mission</Link>
                        <div className='md:hidden'>
                            <Sheet>
                                <SheetTrigger className="btn btn-ghost inline-flex rounded items-center gap-2 border py-2 px-3 btn-sm rounded-btn">Menu <HiOutlineMenu /></SheetTrigger>
                                <SheetContent className="w-full sm:w-[425px]">
                                    <SheetHeader>
                                        <SheetTitle>
                                            <div className='mb-8'>
                                                <Image src="/logo.svg" alt="Next.js logo" width={40} height={38} priority className="m-auto w-7 md:w-10 " />
                                            </div>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className='flex flex-col gap-4 mt-4'>
                                        <Link href='/projects' className="btn btn-ghost btn-sm rounded-btn w-full text-left">Projects</Link>
                                        <Link href='/articles' className="btn btn-ghost btn-sm rounded-btn w-full text-left">Articles</Link>
                                        <Link href='/industries' className="btn btn-ghost btn-sm rounded-btn w-full text-left">Industries
                                        </Link>
                                        <Link href='/about' className="btn btn-ghost btn-sm rounded-btn w-full text-left">About</Link>
                                        <Link href='/mission' className="btn btn-ghost btn-sm rounded-btn w-full text-left">Mission</Link>
                                    </div>
                                </SheetContent>
                            </Sheet>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header