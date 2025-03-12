import { NextApiRequest, NextApiResponse } from 'next';
import Groq from 'groq-sdk';

interface Event {
  id: string;
  summary: string;
  title: string;
  description: string;
  start: string;
  end: string;
}

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const previousEventTitles: Set<string> = new Set();

const analyzeWithGroq = async (eventSummary: string): Promise<string[]> => {
  try {
    // Check if this event title has been analyzed before
    if (previousEventTitles.has(eventSummary)) {
      console.log(`Event with title "${eventSummary}" has already been analyzed. Skipping prompt request.`);
      return []; // Return empty array as no new prompt is needed
    }

    // Set up the prompt for Groq API
    const prompt = `Analyse the following event summary: "${eventSummary}". Based on the event details, provide specific time optimisation suggestions, such as rearranging tasks for efficiency, identifying potential areas for automation, or recommending ways to streamline the process. Suggest appropriate tools or methods to implement automation and focus on practical and actionable improvements. If the event summary is unclear or too vague, assume a typical scenario and provide time optimization suggestions accordingly. Instead of asking more questions, directly suggest improving the Google event or task title to make it clearer and more descriptive for better analysis. Your response should be returned as HTML content that can be rendered using 'dangerouslySetInnerHTML'. Please ensure that the text is properly formatted (e.g., using <ul>, <li>, <p>, etc.) to be easily displayed on a web page.`;



    // Perform the chat completion call
    const response = await groq.chat.completions.create({
      model: 'gemma2-9b-it', // Ensure the model is available and adjust as needed
      messages: [
        { role: 'system', content: 'You are an assistant that provides time optimisation suggestions for events.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_completion_tokens: 7000,
      top_p: 1,
      stop: null,
      stream: false,
    });

    // Check if response.choices exists and has at least one element
    const choices = response.choices;
    if (choices && choices.length > 0) {
      const choice = choices[0];

      // Check if message exists on the first choice
      if (choice?.message?.content) {
        const suggestions = choice.message.content
          .split('\n')
          .map((line: string) => line.trim())
          .filter(Boolean);

        // Add event title to the set of previously analyzed titles
        previousEventTitles.add(eventSummary);

        return suggestions || [];
      }
    }

    // Return an empty array if no suggestions are available
    return [];
  } catch (error: unknown) {
    // Check if the error is a standard JavaScript Error
    if (error instanceof Error) {
      // Now that we know it's a standard Error, we can safely access error.message
      console.error('Error during NLP analysis with Groq:', error.message);
  
      // Handle specific error messages or conditions
      if (error.message === 'You have run out of tokens') {
        throw new Error('You have run out of tokens'); // Example custom error handling
      }
  
      throw error; // Rethrow the error for proper handling
    } else {
      // If the error is not an instance of Error, handle it here
      console.error('Unknown error type:', error);
      throw error; // Rethrow the error for proper handling
    }
  }
  
};

const analyzeEvents = async (events: Event[]): Promise<string[]> => {
  const suggestions: string[] = [];

  for (const event of events) {
    if (event) {
      try {
        const nlpSuggestions = await analyzeWithGroq(event.title);
        if (nlpSuggestions.length > 0) {
          suggestions.push(`Suggestions for "${event.title}": ${nlpSuggestions.join(', ')}`);
        }
      } catch (error) {
        console.error('Error during NLP analysis:', error);
      }
    }
  }
  return suggestions;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  previousEventTitles.clear(); // Reset on each request

  const events: Event[] = req.body.tasks; // Get events from the request body

  if (!events || events.length === 0) {
    return res.status(400).json({ error: 'No events provided.' });
  }

  try {
    const optimizationSuggestions = await analyzeEvents(events); // Analyze the events for optimization

    res.status(200).json({ suggestions: optimizationSuggestions });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error during event analysis:', error.message);

      if (error.message === 'You have run out of tokens') {
        return res.status(429).json({ error: `We're experiencing high demand. Please try again later or:` });
      }

      res.status(500).json({ error: 'Error during event analysis.' });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}

