import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Step 1 of the admin login: send the editor to GitHub to authorize the
 * site. Requires a GitHub OAuth App whose callback URL is
 * https://<domain>/api/decap/callback, with its keys stored in Vercel as
 * DECAP_GITHUB_CLIENT_ID and DECAP_GITHUB_CLIENT_SECRET.
 */
export function GET(request: NextRequest) {
  const clientId = process.env.DECAP_GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse('Connexion non configurée : la variable DECAP_GITHUB_CLIENT_ID est absente sur Vercel.', { status: 500 });
  }

  const state = randomBytes(16).toString('hex');
  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', `${request.nextUrl.origin}/api/decap/callback`);
  url.searchParams.set('scope', request.nextUrl.searchParams.get('scope') || 'repo');
  url.searchParams.set('state', state);

  const response = NextResponse.redirect(url);
  response.cookies.set('decap_oauth_state', state, {
    httpOnly: true,
    secure: request.nextUrl.protocol === 'https:',
    sameSite: 'lax',
    path: '/api/decap',
    maxAge: 600,
  });
  return response;
}
