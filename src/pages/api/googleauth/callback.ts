import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
console.log('Using redirect URI:', process.env.GOOGLE_REDIRECT_URI);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  console.log('Received authorization code:', code, req,res);
  if (!code) {
    return res.status(400).json({ error: 'Code is missing from the query' });
  }

  try {
    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);
    
    // Set the access token in an HttpOnly cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('access_token', tokens.access_token as string, {
        httpOnly: false,
        secure: true,
        maxAge: 3600, // 1 hour
        path: '/',
        sameSite: 'strict', 
      })
    );

    // Redirect to the homepage or wherever you want to display the calendar
    res.redirect('/');  // Redirects to home after successful authentication
  }  catch (error: any) {
    console.error('OAuth Error:', error.response?.data || error.message);
  
    if (error.response?.data?.error === 'invalid_grant') {
      console.log('Authorization code expired or already used. Redirecting to login.');
      res.redirect('/api/auth'); // Restart OAuth flow
    } else {
      res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
  }
}

