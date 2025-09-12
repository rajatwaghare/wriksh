import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Clear the session cookie
    cookies().delete('admin_session')
    
    return NextResponse.json({ 
      success: true 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Logout failed' 
    }, { status: 500 })
  }
}
