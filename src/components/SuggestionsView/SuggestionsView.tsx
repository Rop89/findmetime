import React from 'react';

interface SuggestionsViewProps {
  suggestions: { [key: string]: any | string[] };
}

const SuggestionsView: React.FC<SuggestionsViewProps> = ({ suggestions }) => {

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mt-2" style={{ marginLeft: '250px', width: '80%' }}>
      {Object.keys(suggestions).map((key, index) => {
        return Array.isArray(suggestions[key]) ? (
          suggestions[key].map((item, subIndex) => (
            <div
              key={subIndex}  // Use subIndex for a unique key
              className="text-gray-300 p-4 bg-teal-700 rounded-lg shadow-md border-l-4 border-teal-500 break-words"
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/,/g, '') // Remove commas
                  .replace(/:/g, ': ') // Add space after colon
                  .replace(/\n/g, '<br /><br />') // Add double line breaks for paragraph spacing
                  .replace(/([^\n]+)/g, '<p>$1</p>') // Wrap each line in a <p> tag
                  .replace(/&/g, '&amp;') // Escape ampersand
                  .replace(/'/g, '&rsquo;') // Escape apostrophes (if needed)
              }} // Makes each sentence more structured
            />
          ))
        ) : (
          <div
            key={index}  // Use index for unique key
            className="text-gray-300 p-4 bg-teal-700 rounded-lg shadow-md border-l-4 border-teal-500 break-words"
            dangerouslySetInnerHTML={{
              __html: (suggestions[key] as string)
                .replace(/,/g, '') // Remove commas
                .replace(/:/g, ': ') // Add space after colon
                .replace(/\n/g, '<br /><br />') // Add double line breaks for paragraph spacing
                .replace(/([^\n]+)/g, '<p>$1</p>') // Wrap each line in a <p> tag
                .replace(/&/g, '&amp;') // Escape ampersand
                .replace(/'/g, '&rsquo;') // Escape apostrophes (if needed)
            }} // Wrap each suggestion text in <p> for clarity
          />
        )
      })}
    </div>
  );
};

export default SuggestionsView;
