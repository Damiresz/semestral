import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Список публичных маршрутов, которые не требуют аутентификации
const publicRoutes = ['/auth/login', '/auth/register', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем публичные маршруты
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Проверяем наличие токена
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    // Проверяем валидность токена
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev_secret');
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    // Если токен невалиден, удаляем его и редиректим на страницу входа
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('token');
    return response;
  }
}

// Указываем, для каких маршрутов применять middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 