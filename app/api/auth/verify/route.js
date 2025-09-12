import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const sessionToken = cookies().get('admin_session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ 
        authenticated: false 
      }, { status: 401 })
    }
    
    // In production, verify JWT token here
    // For now, just check if token exists
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8')
    const [username] = decoded.split(':')
    
    return NextResponse.json({ 
      authenticated: true,
      user: username 
    })
  } catch (error) {
    return NextResponse.json({ 
      authenticated: false 
    }, { status: 401 })
  }
}
