import { NextRequest, NextResponse } from 'next/server';

/**
 * Step 2 of the admin login: GitHub sends the editor back here with a
 * one-time code, which is exchanged for an access token. The token is then
 * handed to the admin window (and only to a window on this same site)
 * using the message protocol Decap CMS expects.
 */
function page(status: 'success' | 'error', payload: Record<string, string>, origin: string) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Connexion…</title></head>
<body style="font-family:system-ui;padding:24px;color:#0e1a26">
<p>${status === 'success' ? 'Connexion réussie, vous pouvez fermer cette fenêtre.' : 'La connexion a échoué. Fermez cette fenêtre et réessayez.'}</p>
<script>
(function () {
  var origin = ${JSON.stringify(origin)};
  var message = ${JSON.stringify(message)};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(message, origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  if (window.opener) window.opener.postMessage('authorizing:github', origin);
})();
</script></body></html>`;
  const res = new NextResponse(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  res.cookies.delete({ name: 'decap_oauth_state', path: '/api/decap' });
  return res;
}

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const expected = request.cookies.get('decap_oauth_state')?.value;

  if (!code || !state || !expected || state !== expected) {
    return page('error', { message: 'Requête de connexion invalide ou expirée.' }, origin);
  }

  const clientId = process.env.DECAP_GITHUB_CLIENT_ID;
  const clientSecret = process.env.DECAP_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return page('error', { message: 'Connexion non configurée sur le serveur.' }, origin);
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: `${origin}/api/decap/callback` }),
      cache: 'no-store',
    });
    const data = (await res.json()) as { access_token?: string; error_description?: string };
    if (!data.access_token) {
      return page('error', { message: data.error_description || 'GitHub a refusé la connexion.' }, origin);
    }
    return page('success', { token: data.access_token, provider: 'github' }, origin);
  } catch {
    return page('error', { message: 'Impossible de joindre GitHub.' }, origin);
  }
}
