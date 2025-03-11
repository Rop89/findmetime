import React from 'react';
import Footer from '../Footer/Footer';
interface CombinedItem {
  id: string;
  type: 'event' | 'task';
  title: string;
  details: string;
  start?: string;
  end?: string;
}

interface EventsTasksListProps {
  combinedItems: CombinedItem[];
  onItemClick: (id: number) => void;
}

const EventsTasksList: React.FC<EventsTasksListProps> = ({ combinedItems, onItemClick }) => {
  if (combinedItems.length === 0) return null;
  return (
    <div>
   <aside className="fixed top-0 left-0 h-full w-80 bg-gray-800 shadow-lg z-10 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-yellow-400 mb-4">Google Calendar Events & Tasks</h2>
        <div className="mb-6">
          <p className="text-sm text-gray-400">Click an event to see event suggestions</p>
        </div>
        <ul className="space-y-2">
          {combinedItems.map((item, i) => (
            <li
              key={i}
              onClick={() => onItemClick(parseInt(i.toString()))}
              className={`cursor-pointer p-3 rounded-lg shadow-md ${
                item.type === 'event'
                  ? 'bg-teal-800 border-l-4 border-teal-600 hover:bg-teal-700'
                  : 'bg-gray-700 border-l-4 border-gray-500 hover:bg-gray-600'
              }`}
            >
              <div className="font-medium text-sm text-white">{item.title}</div>
            </li>
          ))}
        </ul>
      </div>
      <Footer/>
    </aside>
    </div>
  );
};


export default EventsTasksList;

