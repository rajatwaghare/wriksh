import React from 'react'

function page() {
    return (
        <>
            <div style={{
                backgroundColor: '#f1f1f1',
                opacity: 0.9,
                background:
                    'repeating-linear-gradient(to right, #d3d3d3, #d3d3d3 0.6000000000000001px, #f7f7f7 0.6000000000000001px, #f7f7f7)',
                backgroundSize: '6px 6px'
            }}
                className=' h-[100vh] '>
                <div className=' space-y-6 container mx-auto m-auto py-10 px-4 text-lg md:text-3xl'>
                    <p className=' font-[300] md:leading-relaxed'><b>WRIKSH</b> is the beginning of an exploration. Right now, it’s just a seed—an idea that curiosity can lead to the creation of knowledge.</p>
                    <p className=' font-[300] md:leading-relaxed'>Inspired by David Deutsch’s principle of optimism—that all problems are solvable through knowledge—<b>WRIKSH</b> will grow into a space where ideas are tested, shared, and transformed into action.</p>
                    <p className=' font-[300] md:leading-relaxed'>Today, it is nothing more than a name. But like all beginnings, it carries infinite possibilities.</p>
                </div>
            </div>
        </>
    )
}

export default page