import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    
    const token=request.cookies.get('token')?.value || ""
    const path=request.nextUrl.pathname
    const ispublicpath=path==='/signin' || path==='/signup' || path==='/verifyemail'
    
    if(token && ispublicpath){
        return NextResponse.redirect(new URL('/about', request.url))

    } 
    if(!token && !ispublicpath){
        return NextResponse.redirect(new URL('/signin', request.url))

    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/verifyemail',
    '/about',
  ],
}  