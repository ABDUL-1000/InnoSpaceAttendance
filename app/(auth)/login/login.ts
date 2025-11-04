// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { identifier, password } = await request.json();

    // Call your authentication API
    const response = await fetch('https://innospace-iosapi.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await response.json();

    if (data.success && data.token) {
      // Create the response
      const nextResponse = NextResponse.json(
        { success: true, user: data.user },
        { status: 200 }
      );

      // Set cookie server-side
      nextResponse.cookies.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });

      console.log('✅ Server-side cookie set for token');
      return nextResponse;
    } else {
      return NextResponse.json(
        { success: false, message: data.message },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}