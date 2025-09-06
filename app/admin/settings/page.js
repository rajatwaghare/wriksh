'use client'

import { useState } from 'react'
import { useAuth } from '../auth-context'
import ProtectedRoute from '../protected-route'

function SettingsPageContent() {
  const { user, logout } = useAuth()
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('New passwords do not match')
      setIsLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long')
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check current password
    if (passwordData.currentPassword !== 'briefbase@1996') {
      setMessage('Current password is incorrect')
      setIsLoading(false)
      return
    }

    // Update password in localStorage (in a real app, this would be sent to server)
    localStorage.setItem('admin_password', passwordData.newPassword)
    
    setMessage('Password updated successfully!')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-[400] text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your admin account settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user}</span>
              <a 
                href="/admin" 
                className="text-slate-600 hover:text-slate-800 text-sm font-[300]"
              >
                ← Back to Admin
              </a>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 text-sm font-[300]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-[400] text-gray-900 mb-6">Change Password</h2>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password *
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password *
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Enter new password (min 6 characters)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                placeholder="Confirm new password"
              />
            </div>

            {message && (
              <div className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <h2 className="text-2xl font-[400] text-gray-900 mb-6">Account Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="text-gray-900">{user}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Type</label>
              <p className="text-gray-900">Administrator</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Login</label>
              <p className="text-gray-900">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>For security reasons, password changes are stored locally in this demo. In a production environment, passwords should be securely stored on the server and properly hashed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsPageContent />
    </ProtectedRoute>
  )
}
