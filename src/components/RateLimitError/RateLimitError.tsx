import React from 'react';

interface RateLimitErrorProps {
  error: string | null;
}

const RateLimitError: React.FC<RateLimitErrorProps> = ({ error }) => {
  const subject = "Request for More Tokens";
  const body = "Dear Find Me Time Team,\n\nI have exceeded my rate limit and would like to request additional tokens to continue using the service.\n\nThank you!";
  
  return (
    <>
      {error === `We're experiencing high demand. Please try again later or:` && (
        <div className="text-white p-4 rounded-lg mb-6 shadow-lg text-center" style={{ marginLeft: '350px', width: '80%' }}>
        <a 
          href={`mailto:contact@findmetime.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`} 
          className="inline-block p-6 bg-teal-500 text-white font-semibold rounded-full shadow-lg hover:bg-teal-600 transition duration-200"
        >
          Click to Contact Find Me Time to get more tokens
        </a>
      </div>
      
      )}
    </>
  );
};

export default RateLimitError;
