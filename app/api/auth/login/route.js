import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const { username, password } = await request.json()
    
    // Check credentials
    if (username === 'rajatdwaghare' && password === 'briefbase@1996') {
      // Create session token (in production, use JWT)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      // Set secure cookie
      cookies().set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
      
      return NextResponse.json({ 
        success: true, 
        user: username 
      })
    }
    
    return NextResponse.json({ 
      error: 'Invalid credentials' 
    }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Login failed' 
    }, { status: 500 })
  }
}
