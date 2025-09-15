import Link from 'next/link'
import React from 'react'
import articlesData from '../../data/articles.json'

function page() {
    // Sort articles by publishedAt descending (latest first)
    const sortedArticles = [...articlesData].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    return (
        <>
            <div
                style={{
                    backgroundColor: '#f7f7f7',
                    opacity: 0.9,
                    background:
                        'repeating-linear-gradient(to right, #d3d3d3, #d3d3d3 0.6000000000000001px, #f7f7f7 0.6000000000000001px, #f7f7f7)',
                    backgroundSize: '6px 6px'
                }}
                className='w-full h-[300px] flex flex-col text-center items-center justify-center px-4 border-b mb-10'
            >
                <h1 className='text-4xl font-[300]'>Articles</h1>
                <p className='text-lg font-[300] mt-5 text-gray-700'>
                    Welcome to the Articles page. Here you can find a collection of articles on various topics.
                </p>
            </div>

            <div className='max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-32'>
                {sortedArticles.map((article) => (
                    <Link
                        href={`/articles/${article.slug}`}
                        key={article.id}
                        className='bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200'
                    >
                        <div className='mb-3'>
                            <span className='text-sm text-slate-600 font-[300]'>{article.category}</span>
                            <span className='text-sm text-gray-500 ml-2'>• {article.readTime}</span>
                        </div>
                        <h2 className='text-xl font-[300] mb-3 line-clamp-2'>{article.title}</h2>
                        <p className='text-gray-600 font-[300] text-sm mb-4 line-clamp-3'>{article.excerpt}</p>
                        <div className='flex items-center justify-between'>
                            <span className='text-slate-800 text-sm font-[400]'>Read More →</span>
                            <span className='text-xs text-gray-500'>{article.publishedAt}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default page
