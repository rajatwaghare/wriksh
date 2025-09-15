'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import articlesData from '../../data/articles.json'
import ProtectedRoute from './protected-route'
import { useAuth } from './auth-context'
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";




function AdminPageContent() {
  const [articles, setArticles] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const { user, logout } = useAuth()

  useEffect(() => {
    setArticles(articlesData)
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const updatedArticles = articles.filter(article => article.id !== id)
      setArticles(updatedArticles)
      // In a real app, you'd save this to your backend
      console.log('Article deleted:', id)
    }
  }

  const handleEdit = (article) => {
    setEditingArticle(article)
    setShowAddForm(true)
  }

  const handleAddNew = () => {
    setEditingArticle(null)
    setShowAddForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-[400] text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-1">Manage your articles and content</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user}</span>
              <Link 
                href="/articles" 
                className="text-slate-600 hover:text-slate-800 text-sm font-[300]"
              >
                ← View Articles
              </Link>
              <Link 
                href="/admin/settings" 
                className="text-slate-600 hover:text-slate-800 text-sm font-[300]"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 text-sm font-[300]"
              >
                Logout
              </button>
              <button
                onClick={handleAddNew}
                className="bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-[300] hover:bg-slate-700 transition-colors"
              >
                Add New Article
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {showAddForm ? (
          <ArticleForm 
            article={editingArticle}
            onSave={(articleData) => {
              if (editingArticle) {
                // Update existing article
                const updatedArticles = articles.map(article => 
                  article.id === editingArticle.id ? { ...article, ...articleData } : article
                )
                setArticles(updatedArticles)
              } else {
                // Add new article
                const newArticle = {
                  ...articleData,
                  id: Math.max(...articles.map(a => a.id)) + 1,
                  publishedAt: new Date().toISOString().split('T')[0]
                }
                setArticles([...articles, newArticle])
              }
              setShowAddForm(false)
              setEditingArticle(null)
            }}
            onCancel={() => {
              setShowAddForm(false)
              setEditingArticle(null)
            }}
          />
        ) : (
          <ArticleList 
            articles={articles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}

function ArticleList({ articles, onEdit, onDelete }) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-[400] text-gray-900">All Articles ({articles.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{article.excerpt}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{article.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {article.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(article)}
                        className="text-slate-600 hover:text-slate-900"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => onDelete(article.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function ArticleForm({ article, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    readTime: '',
    category: '',
    tags: ''
  })

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || '',
        slug: article.slug || '',
        excerpt: article.excerpt || '',
        content: article.content || '',
        author: article.author || '',
        readTime: article.readTime || '',
        category: article.category || '',
        tags: article.tags ? article.tags.join(', ') : ''
      })
    }
  }, [article])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const articleData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }

    onSave(articleData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-[400] text-gray-900 mb-6">
        {article ? 'Edit Article' : 'Add New Article'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="auto-generated from title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content (HTML) *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 font-mono text-sm"
            placeholder="Enter HTML content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time *
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
              placeholder="e.g., 5 min read"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="comma-separated tags"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            {article ? 'Update Article' : 'Create Article'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminPageContent />
    </ProtectedRoute>
  )
}
