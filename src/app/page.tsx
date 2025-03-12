'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import EventsTasksList from '@/components/EventsTasksList/EventsTasksList';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import SuggestionsView from '@/components/SuggestionsView/SuggestionsView';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import RateLimitError from '@/components/RateLimitError/RateLimitError';
import GroqTermsAlert from '@/components/GroqTerms/GroqTermsAlert';
import Footer from '@/components/Footer/Footer';
import CookieConsent from '@/components/Cookies/CookieConsent';
interface Event {
  id: string;
  summary: string;
  description: string;
  start: string;
  end: string;
}

interface Task {
  id: string;
  title: string;
  notes: string;
  due: string;
}


interface CombinedItem {
  id: string;
  type: 'event' | 'task';
  title: string;
  details: string;
  start?: string;
  end?: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [combinedItems, setCombinedItems] = useState<CombinedItem[]>([]);
  const [suggestions, setSuggestions] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [storedSuggestions, setStoredSuggestions] = useState<any>({});
  const [selectedItemId, setSelectedItemId] = useState< string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false); 
  const [cookiesRejected, setCookiesRejected] = useState(false);
  const [cookiesNotAccepted, setCookiesNotAccepted] = useState(false);
  const handleCookiesRejectedAction = () => {
    setCookiesRejected(true); // State change when cookies are rejected
  };
  const handleCookiesNotAcceptedAction = () => {
    setCookiesNotAccepted(true); 
  }
  const fetchItems = async () => {
    if (!authToken) {
      setError('No valid Google token found.');
      return;
    }
    setLoading(true);
    setError(null);
  
    try {
      const currentDate = new Date();
      const nextWeekDate = new Date(currentDate);
      nextWeekDate.setDate(currentDate.getDate() + 15);
  
      const timeMin = currentDate.toISOString();
      const timeMax = nextWeekDate.toISOString();
  
      const { data } = await axios.get('/api/events', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: { timeMin, timeMax },
      });
  
      const eventsData: Event[] = data.events || [];
      const tasksData: Task[] = data.tasks || [];
      const limitedEvents = eventsData.slice(0, 5);
      const limitedTasks = tasksData.slice(0, 5);
      setEvents(limitedEvents);
      setTasks(limitedTasks);
  
      const seenTitles = new Set<string>(); // Set to track seen titles
      const combined = [
        ...limitedEvents.map((event) => {
          const title = event.summary;
          // If the title is already seen, skip this event
          if (seenTitles.has(title)) {
            return null; // Return null for duplicate event
          }
          seenTitles.add(title); // Add the title to the set
  
          return {
            id: event.id,
            type: 'event' as 'event',
            title: event.summary,
            details: event.description || 'No description',
            start: event.start,
            end: event.end,
          };
        }),
        ...limitedTasks.map((task) => {
          const title = task.title;
          // If the title is already seen, skip this task
          if (seenTitles.has(title)) {
            return null; // Return null for duplicate task
          }
          seenTitles.add(title); // Add the title to the set
  
          return {
            id: task.id,
            type: 'task' as 'task',
            title: task.title,
            details: task.notes || 'No details',
            start: task.due,
          };
        }),
      ].filter((item) => item !== null); // Remove null values (duplicates)
  
      // Sort combined events and tasks by start date
      combined.sort((a, b) => {
        const dateA = new Date(a.start || 0).getTime();
        const dateB = new Date(b.start || 0).getTime();
        return dateA - dateB;
      });
  
      setCombinedItems(combined);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  

  const analyzeEventsAndTasks = async () => {
    if (combinedItems.length === 0) {
      setError('No events or tasks to analyze.');
      return;
    }

    // Check if there are stored suggestions, if so, use them and return
    if (Object.keys(storedSuggestions).length > 0) {
      setSuggestions(storedSuggestions);  // Directly set stored suggestions
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data: analysis } = await axios.post('/api/analyse', { tasks: combinedItems });

      // Store the analysis (which could be an array) in sessionStorage
      sessionStorage.setItem('suggestions', JSON.stringify(analysis));

      // Log the data after setting it in sessionStorage
      const storedData = sessionStorage.getItem('suggestions');

      // Check if storedData is not null before parsing it
      let parsedData;
      if (storedData !== null) {
          parsedData = JSON.parse(storedData);
      } else {
          parsedData = {}; // Or handle the case when data doesn't exist
      }


      // Set the suggestions and store them in the state
      setSuggestions(parsedData);
      setStoredSuggestions(parsedData);
    } catch (err: any) {
      if (err.response && err.response.status === 429) {
        setError(`We're experiencing high demand. Please try again later or:`);
      } else {
        setError(err.message || 'Failed to analyze events and tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedSuggestionsData = sessionStorage.getItem('suggestions');
    if (storedSuggestionsData) {
      try {
        const parsedData = JSON.parse(storedSuggestionsData);
        
        // Ensure parsedData is an object of type Suggestions, not an array
        if (typeof parsedData === 'object' && parsedData !== null) {
          setStoredSuggestions(parsedData);
        } else {
          console.error('Stored suggestions are not in the expected format.');
        }
      } catch (error) {
        console.error('Error parsing stored suggestions:', error);
      }
    }
  }, []);
  useEffect(() => {
    const token = Cookies.get('access_token');
    setAuthToken(token || null);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [authToken]);

  useEffect(() => {
    analyzeEventsAndTasks();
  }, [combinedItems]);
  useEffect(() => {
    if (!termsAccepted) {
      setIsTermsModalOpen(true);
    }
  }, [termsAccepted]); 
  useEffect(() => {
    // If suggestions are already stored in sessionStorage, load them
    const storedSuggestionsData = sessionStorage.getItem('suggestions');
    if (storedSuggestionsData) {
      setStoredSuggestions(JSON.parse(storedSuggestionsData));
    }
  }, []);

  const handleItemClick = (id: number) => {  // Change to accept 'number'
    setSelectedItemId(id.toString());  // Store it as a string if needed
    setShowSuggestions(true);
  };
  useEffect(() => {
    if (storedSuggestions) {
      setSelectedItemId('0'); // Default to a known key
      setShowSuggestions(true);
    }
  }, [storedSuggestions]);
  const filteredSuggestions = selectedItemId && storedSuggestions?.suggestions?.[selectedItemId]
    ? { [selectedItemId]: storedSuggestions?.suggestions[selectedItemId] }
    : { default: 'No suggestions available' };
  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
      {!loading && authToken && (
        <div className="flex bg-gray-900 text-white flex-col" style={{ marginLeft: '100px', width: '80%' }}>
          {showSuggestions && <SuggestionsView suggestions={filteredSuggestions} />}
          {combinedItems && <EventsTasksList combinedItems={combinedItems} onItemClick={handleItemClick} />}
          {error && <ErrorComponent error={error} />}
          {error === `We're experiencing high demand. Please try again later or:` && (
            <RateLimitError error={error} />
          )}
        </div>
      )}

      {!authToken && (
        <div className='p-12'>
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-yellow-300">
              Find Me Time
            </h1>
            <p className='mb-6 text-lg font-medium text-center'>AI Time Finder</p>
            <div>
            {!termsAccepted || cookiesRejected || !cookiesNotAccepted ? (
              <div>
              <button
                className="bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 p-4 cursor-not-allowed"
                disabled
              >
                Connect Google
              </button>
              {!cookiesNotAccepted && (
                <p className="text-red-500 text-sm mt-2">
                  ⚠️ Please accept cookies to connect Google.
                </p>
              )}
              </div>
            ) : (
              <button
                className="bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition duration-200 p-4"
                onClick={() => (window.location.href = '/api/googleauth')}
              >
                Connect Google
              </button>
            )}
          </div>
            {!termsAccepted && (
              <p onClick={() => { 
                setIsTermsModalOpen(true); 
              }} className="text-red-500 text-m mt-4">
                To continue, please agree to the <u>terms</u>.
              </p>
            )}
          </div>
          <div className="m-6 p-3 pb-8 bg-white rounded-lg shadow-md border border-gray-300 max-w-md mx-auto px-3">
            <p className="text-gray-700 text-lg font-medium text-center">
              This app helps you optimize your weekly schedule by analyzing your calendar with the help of AI to find ways to save time.
            </p>
            <p className='text-gray-700 text-lg font-medium text-center'>
              To optimize effectively, please ensure that the main titles of your google events and tasks contain sufficient and clear information for analysis.
            </p>
            {!authToken && !termsAccepted && (
              <p className="text-gray-600 mt-4 text-center">
                Connect your Google account first. Afterward, please allow a few minutes for the system to analyze your tasks and events. This will enable the AI model to provide feedback based on the information gathered.
              </p>
            )}
          </div>
        </div>
      )}
      {loading && <LoadingSpinner />}
      {isTermsModalOpen && !authToken && (
          <GroqTermsAlert
            onAccept={() => {
              setTermsAccepted(true);  // Accept terms and close modal
              setIsTermsModalOpen(false);  // Close the modal
            }}
            onDecline={() => {
              setTermsAccepted(false);  // Reject terms and close modal
              setIsTermsModalOpen(false);  // Close the modal
            }}
          />
        )}
    </div>
    {!authToken && !cookiesNotAccepted &&
      <div>
        <CookieConsent 
        setCookiesRejectedAction={handleCookiesRejectedAction} 
        setCookiesNotAcceptedAction={handleCookiesNotAcceptedAction}/> 
        <Footer/>
      </div>
    }
    </div>
  );
}
