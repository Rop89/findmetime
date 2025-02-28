import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,   
  process.env.GOOGLE_CLIENT_SECRET, 
  process.env.GOOGLE_REDIRECT_URI 
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/tasks.readonly',
];

// This function handles all requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle CORS preflight (OPTIONS) request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end(); // Preflight request ends here
  }

  // Handle GET requests to generate the Google OAuth authorization URL
  if (req.method === 'GET') {
    try {
      // Generate the authorization URL
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
      });

      console.log('Generated Google OAuth URL:', authUrl); // Log for debugging

      // Redirect the user to Google's OAuth page
      res.redirect(authUrl);
    } catch (error) {
      console.error('Error during Google OAuth authorization URL generation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Handle POST or any other HTTP methods (optional)
  else if (req.method === 'POST') {
    try {
      const { code } = req.body; // Assuming the code is sent in the body for POST requests

      if (!code) {
        return res.status(400).json({ error: 'No authorization code received' });
      }

      // Exchange the authorization code for tokens
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Optionally, set a cookie with the access token for later use
      res.setHeader('Set-Cookie', `access_token=${tokens.access_token}; Max-Age=3600; Path=/; SameSite=Strict`);

      res.status(200).json({ message: 'Authentication successful', tokens });
    } catch (error) {
      console.error('Error during OAuth token exchange:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  // Handle unsupported HTTP methods
  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
