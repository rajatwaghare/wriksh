import { NextResponse } from 'next/server'
import articlesData from '../../../../data/articles.json'

// GET /api/articles/[id] - Get single article
export async function GET(request, { params }) {
  try {
    const article = articlesData.find(a => a.id === parseInt(params.id))
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    return NextResponse.json(article)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 })
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(request, { params }) {
  try {
    const updatedData = await request.json()
    const articleIndex = articlesData.findIndex(a => a.id === parseInt(params.id))
    
    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    // Update article
    articlesData[articleIndex] = { ...articlesData[articleIndex], ...updatedData }
    
    return NextResponse.json(articlesData[articleIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(request, { params }) {
  try {
    const articleIndex = articlesData.findIndex(a => a.id === parseInt(params.id))
    
    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }
    
    // Remove article
    const deletedArticle = articlesData.splice(articleIndex, 1)[0]
    
    return NextResponse.json(deletedArticle)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}
