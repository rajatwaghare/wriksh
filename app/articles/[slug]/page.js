import Link from 'next/link'
import { notFound } from 'next/navigation'
import articlesData from '../../../data/articles.json'

export async function generateStaticParams() {
  return articlesData.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }) {
  const article = articlesData.find(article => article.slug === params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

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
  const article = articlesData.find(article => article.slug === params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
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
            <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-blockquote:border-l-4 prose-blockquote:border-slate-500 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal prose-li:mb-2 prose-a:text-slate-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
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
            // Function to calculate tag similarity score
            const calculateTagSimilarity = (article1, article2) => {
              const tags1 = new Set(article1.tags);
              const tags2 = new Set(article2.tags);
              const intersection = new Set([...tags1].filter(tag => tags2.has(tag)));
              return intersection.size;
            };

            // Get related articles based on tag matching
            const relatedArticles = articlesData
              .filter(a => a.id !== article.id)
              .map(relatedArticle => ({
                ...relatedArticle,
                similarityScore: calculateTagSimilarity(article, relatedArticle)
              }))
              .filter(relatedArticle => relatedArticle.similarityScore > 0)
              .sort((a, b) => {
                // First sort by similarity score (descending)
                if (b.similarityScore !== a.similarityScore) {
                  return b.similarityScore - a.similarityScore;
                }
                // Then sort by publish date (descending - latest first)
                return new Date(b.publishedAt) - new Date(a.publishedAt);
              })
              .slice(0, 2);

            // If no articles with matching tags, fallback to latest articles from same category
            const fallbackArticles = relatedArticles.length === 0 
              ? articlesData
                  .filter(a => a.id !== article.id && a.category === article.category)
                  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                  .slice(0, 2)
              : [];

            const articlesToShow = relatedArticles.length > 0 ? relatedArticles : fallbackArticles;

            return articlesToShow.map((relatedArticle) => (
              <Link 
                key={relatedArticle.id}
                href={`/articles/${relatedArticle.slug}`}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">
                  <span className="text-sm text-slate-600 font-[300]">{relatedArticle.category}</span>
                  <span className="text-sm text-gray-500 ml-2">• {relatedArticle.readTime}</span>
                </div>
                <h4 className="text-lg font-[300] text-gray-900 mb-2 line-clamp-2">{relatedArticle.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{relatedArticle.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(relatedArticle.publishedAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                  {relatedArticle.similarityScore > 0 && (
                    <span className="text-slate-600">
                      {relatedArticle.similarityScore} matching tag{relatedArticle.similarityScore > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              </Link>
            ));
          })()}
        </div>
      </div>
    </div>
  )
}
