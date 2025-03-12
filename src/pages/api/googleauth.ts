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
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',

];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Generate the authorization URL
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline', 
        prompt: 'consent',
        scope: SCOPES,
        include_granted_scopes:false,
      });
      console.log('Google Redirect URI:', process.env.GOOGLE_REDIRECT_URI);
      console.log('Auth Url:', authUrl);
      // Redirect the user to Google's OAuth page
      res.redirect(authUrl);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error during Google OAuth:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
