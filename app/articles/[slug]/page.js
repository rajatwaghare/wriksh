import Link from 'next/link'
import { notFound } from 'next/navigation'
import articlesData from '../../../data/articles.json'

// tiny HTML test
const isLikelyHTML = (s) => /<\/?[a-z][\s\S]*>/i.test(s || '')

export async function generateStaticParams() {
  return articlesData.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  }
}

export default function ArticlePage({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const body = article.content ?? ''
  const renderAsHTML = isLikelyHTML(body)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        style={{
          backgroundColor: '#f7f7f7',
          opacity: 0.9,
          background:
            'repeating-linear-gradient(to right, #d3d3d3, #d3d3d3 0.6000000000000001px, #f7f7f7 0.6000000000000001px, #f7f7f7)',
          backgroundSize: '6px 6px',
        }}
        className="bg-white border-b"
      >
        <div className="max-w-4xl mx-auto px-4 py-11">
          <Link
            href="/articles"
            className="text-slate-600 hover:text-slate-800 text-sm font-[300] mb-4 inline-block"
          >
            ← Back to Articles
          </Link>

          <div className="mb-4">
            <span className="text-sm text-slate-600 font-[300]">{article.category}</span>
            <span className="text-sm text-gray-500 ml-2">• {article.readTime}</span>
          </div>

          <h1 className="text-4xl font-[400] text-gray-900 mb-4">{article.title}</h1>

          <div className="flex items-center text-sm text-gray-600">
            <span>By {article.author}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Remove any potential clipping */}
          <div className="max-w-none overflow-visible">
            {renderAsHTML ? (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:mb-2 prose-a:text-slate-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            ) : (
              // If content is plain text/markdown-like, show everything with preserved line breaks.
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {body}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="max-w-4xl mx-auto px-4 pb-32">
        <h3 className="text-2xl font-[400] text-gray-900 mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {(() => {
            const tagScore = (a1, a2) => {
              const s1 = new Set(a1.tags)
              const s2 = new Set(a2.tags)
              let score = 0
              s1.forEach((t) => s2.has(t) && score++)
              return score
            }

            const related = articlesData
              .filter((a) => a.id !== article.id)
              .map((a) => ({ ...a, similarityScore: tagScore(article, a) }))
              .filter((a) => a.similarityScore > 0)
              .sort((a, b) =>
                b.similarityScore !== a.similarityScore
                  ? b.similarityScore - a.similarityScore
                  : new Date(b.publishedAt) - new Date(a.publishedAt)
              )
              .slice(0, 2)

            const fallback =
              related.length === 0
                ? articlesData
                    .filter((a) => a.id !== article.id && a.category === article.category)
                    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                    .slice(0, 2)
                : []

            const toShow = related.length ? related : fallback

            return toShow.map((ra) => (
              <Link
                key={ra.id}
                href={`/articles/${ra.slug}`}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">
                  <span className="text-sm text-slate-600 font-[300]">{ra.category}</span>
                  <span className="text-sm text-gray-500 ml-2">• {ra.readTime}</span>
                </div>
                <h4 className="text-lg font-[300] text-gray-900 mb-2 line-clamp-2">{ra.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{ra.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(ra.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {ra.similarityScore > 0 && (
                    <span className="text-slate-600">
                      {ra.similarityScore} matching tag{ra.similarityScore > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </Link>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}
