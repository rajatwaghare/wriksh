import { NextResponse } from 'next/server'
import articlesData from '../../../data/articles.json'

// GET /api/articles - Get all articles
export async function GET() {
  try {
    return NextResponse.json(articlesData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 })
  }
}

// POST /api/articles - Create new article
export async function POST(request) {
  try {
    const newArticle = await request.json()
    
    // Generate new ID
    const newId = Math.max(...articlesData.map(a => a.id)) + 1
    
    // Add timestamp
    const article = {
      ...newArticle,
      id: newId,
      publishedAt: newArticle.publishedAt || new Date().toISOString().split('T')[0]
    }
    
    // In a real app, you'd save to database here
    // For now, we'll just return the article
    articlesData.push(article)
    
    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}
