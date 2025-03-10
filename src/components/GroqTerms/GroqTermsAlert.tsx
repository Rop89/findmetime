import React, { useState } from 'react';

interface GroqTermsModalProps {
  onAccept: () => void;
  onDecline: () => void;
}

const GroqTermsAlert: React.FC<GroqTermsModalProps> = ({ onAccept, onDecline }) => {
  const [isOpen, setIsOpen] = useState(true); // State to manage modal visibility

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Render the modal if isOpen is true
  return isOpen ? (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75"
      role="dialog"
      aria-labelledby="groq-terms-heading"
      aria-describedby="groq-terms-description"
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        <h2
          id="groq-terms-heading"
          className="text-2xl font-bold text-gray-800 mb-4"
        >
          Accept Terms to Use Find Me Time
        </h2>
        <p
          id="groq-terms-description"
          className="text-gray-700 mb-4"
        >
          By using Find Me Time, you acknowledge and agree to the following terms:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            <span className="font-semibold">Third-Party GPT Model:</span> Groq is used
            to generate personalized suggestions to help optimize your time.
          </li>
          <li>
            <span className="font-semibold">Data Usage:</span> Only the necessary
            information, such as your google events and tasks, is shared securely with Groq.
          </li>
          <li>
            <span className="font-semibold">Privacy and Security:</span> All shared
            data is encrypted and handled securely.
          </li>
          <li>
            <span className="font-semibold">Compliance:</span> The service adheres
            to Google Chrome Web Store’s policies.
          </li>
        </ul>
        <p className="mt-4 text-gray-700">
          Review additional details here:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>
            <a
              href="http://findmetime.netlify.app/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 underline hover:text-teal-600 focus:outline focus:ring-2 focus:ring-teal-500"
            >
              Our Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://groq.com/terms-of-use/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 underline hover:text-teal-600 focus:outline focus:ring-2 focus:ring-teal-500"
            >
              Groq's Terms of Use
            </a>
          </li>
          <li>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 underline hover:text-teal-600 focus:outline focus:ring-2 focus:ring-teal-500"
            >
              Google Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://developer.chrome.com/docs/webstore/program_policies/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-500 underline hover:text-teal-600 focus:outline focus:ring-2 focus:ring-teal-500"
            >
              Chrome Web Store Developer Program Policies
            </a>
          </li>
        </ul>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={() => {
              closeModal(); // Close modal when Decline is clicked
              onDecline(); // Call onDecline prop
            }}
            className="bg-gray-200 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Decline
          </button>
          <button
            onClick={() => {
              closeModal(); // Close modal when Accept is clicked
              onAccept(); // Call onAccept prop
            }}
            className="bg-teal-500 text-white rounded-full px-4 py-2 hover:bg-teal-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  ) : null; // Render nothing if isOpen is false
};

export default GroqTermsAlert;
