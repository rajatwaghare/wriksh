import { AuthProvider } from './auth-context'

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
