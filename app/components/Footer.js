import React from 'react'
import { RxInstagramLogo } from "react-icons/rx";

function Footer() {
    return (
        <>
            <footer className=" fixed z-10 bg-white bottom-0 border-t py-4 left-0 right-0 row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex  items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.instagram.com/wriksh.progress/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <RxInstagramLogo />
                    Instagram
                </a>
            </footer>
        </>
    )
}

export default Footer