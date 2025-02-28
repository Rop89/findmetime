import { google } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { timeMin, timeMax } = req.query;
  const { access_token } = req.cookies;

  if (!access_token) {
    return res.status(401).json({ error: 'Access token is missing' });
  }

  oauth2Client.setCredentials({ access_token });

  try {
    // Initialize the Google Calendar API
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const eventsPromise = calendar.events.list({
      calendarId: 'primary',
      timeMin: timeMin as string,
      timeMax: timeMax as string,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Initialize the Google Tasks API
    const tasks = google.tasks({ version: 'v1', auth: oauth2Client });
    const taskLists = await tasks.tasklists.list(); // Fetch task lists
    const taskPromises = taskLists.data.items?.map((taskList) =>
      tasks.tasks.list({
        tasklist: taskList.id as string,
        showCompleted: true,
        dueMin: timeMin as string,
        dueMax: timeMax as string,
      })
    );

    // Wait for all promises to resolve
    const [events, tasksResponses] = await Promise.all([
      eventsPromise,
      Promise.all(taskPromises || []),
    ]);

    // Flatten tasks from all task lists
    const tasksData = tasksResponses
      .flatMap((response) => response?.data.items || [])
      .filter(Boolean); // Remove any undefined tasks

    res.status(200).json({
      events: events.data.items,
      tasks: tasksData,
    });
  } catch (error: unknown) {
      // Narrow the type to a more specific object with a `code` property
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const e = error as { code: number }; // Assert that error has a `code` property
        if (e.code === 403) {
          console.error('Insufficient permissions. Please ensure the correct scopes are included.');
          res.status(403).json({ error: 'Insufficient permissions' });
        } else {
          console.error('Unexpected error:', error);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        }
      } else {
        // Handle case where error doesn't have a `code` property
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      }
  }
}
