import { type NextRequest, NextResponse } from 'next/server';

import { EnumTokens } from './features/auth/services/auth-token.service';
import { PUBLIC_URL } from './shared/config/url.config';

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

  const isAuthPage = request.url.includes(PUBLIC_URL.auth());
  console.log(isAuthPage);

  if (isAuthPage) {
    if (refreshToken) {
      console.log(2);
      return NextResponse.redirect(new URL(PUBLIC_URL.home(), request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken === undefined) {
    console.log(3);
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/store/:path*', '/auth/:path*'],
};
