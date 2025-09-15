import React from 'react'
import Link from 'next/link'
import { Wheat, Stethoscope, Leaf, Globe, Train, BookOpen, FlaskConical, Factory, Landmark, Palette, Bot, Rocket, Dna, CloudSun, Brain, } from 'lucide-react'

const industries = [
    {
        title: 'Agriculture & Food Systems',
        description: 'From farming to food technology → ensures survival, nutrition, and stability.',
        icon: Wheat
    },
    {
        title: 'Healthcare & Life Sciences',
        description: 'Medicine, biotechnology, and public health → extend life and improve well-being.',
        icon: Stethoscope
    },
    {
        title: 'Energy & Environment',
        description: 'Renewable energy, nuclear power, and sustainability → powering civilization responsibly.',
        icon: Leaf
    },
    {
        title: 'Information & Communication',
        description: 'From the printing press to the internet → spreading knowledge and connection.',
        icon: Globe
    },
    {
        title: 'Transportation & Infrastructure',
        description: 'Roads, railways, aviation, and space travel → expanding human reach.',
        icon: Train
    },
    {
        title: 'Education & Knowledge Systems',
        description: 'Schools, universities, and online learning → shaping minds and fueling innovation.',
        icon: BookOpen
    },
    {
        title: 'Science & Research',
        description: 'Physics, chemistry, biology, and social sciences → building the foundation for progress.',
        icon: FlaskConical
    },
    {
        title: 'Manufacturing & Industry',
        description: 'From the Industrial Revolution to automation → driving productivity and growth.',
        icon: Factory
    },
    {
        title: 'Finance & Trade',
        description: 'Banking, markets, and global commerce → connecting economies and enabling growth.',
        icon: Landmark
    },
    {
        title: 'Art, Culture & Philosophy',
        description: 'Storytelling, ethics, and design → shaping meaning, values, and human identity.',
        icon: Palette
    },
    {
        title: 'Artificial Intelligence & Robotics',
        description: 'Enhancing productivity, intelligence, and automation across industries.',
        icon: Bot
    },
    {
        title: 'Space Exploration',
        description: 'Expanding human presence and opportunities beyond Earth.',
        icon: Rocket
    },
    {
        title: 'Genetics & Synthetic Biology',
        description: 'Redefining health, longevity, and even evolution itself.',
        icon: Dna
    },
    {
        title: 'Climate Tech',
        description: 'Innovations to restore balance and protect Earth’s ecosystems.',
        icon: CloudSun
    },
    {
        title: 'Neurotech & Human Enhancement',
        description: 'Expanding cognitive and physical potential with cutting-edge science.',
        icon: Brain
    }
]

export default function Page() {
    return (
        <>
            <div
                style={{
                    backgroundColor: '#fafafa',
                    opacity: 0.9,
                    background:
                        'repeating-linear-gradient(to right, #d3d3d3, #d3d3d3 0.6000000000000001px, #f7f7f7 0.6000000000000001px, #f7f7f7)',
                    backgroundSize: '6px 6px'
                }}
                className='w-full h-[300px] flex flex-col text-center items-center justify-center px-4 border-b mb-10'
            >
                <h1 className='text-4xl font-[300]'>Industries</h1>
                <p className='text-lg font-[300] mt-5 text-gray-700'>
                    The purpose is to discover what is finite in these industries and explore how we might transcend toward the infinite.
                </p>
            </div>
            <div className='max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-32'>
                {industries.map((industry, index) => {
                    const Icon = industry.icon
                    return (
                        <Link
                            key={index}
                            href=''
                            className='bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 flex items-start gap-4'
                        >
                            <Icon className='w-6 h-6 text-gray-700 mt-1' />
                            <div>
                                <h2 className='text-xl font-[300] mb-3'>{industry.title}</h2>
                                <p className='text-gray-600 font-[300] text-sm'>{industry.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
