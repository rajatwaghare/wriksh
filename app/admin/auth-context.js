'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated')
      const username = localStorage.getItem('admin_user')
      
      if (authStatus === 'true' && username) {
        setIsAuthenticated(true)
        setUser(username)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = (username) => {
    localStorage.setItem('admin_authenticated', 'true')
    localStorage.setItem('admin_user', username)
    setIsAuthenticated(true)
    setUser(username)
  }

  const checkPassword = (password) => {
    const storedPassword = localStorage.getItem('admin_password')
    return password === (storedPassword || 'briefbase@1996')
  }

  const logout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_user')
    setIsAuthenticated(false)
    setUser(null)
    router.push('/admin/login')
  }

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
