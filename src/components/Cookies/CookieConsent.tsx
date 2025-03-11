"use client";

import { useState, useEffect } from "react";

export default function CookieConsent({ setCookiesRejectedAction }: { setCookiesRejectedAction: () => void }) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (consent: string) => {
    localStorage.setItem("cookieConsent", consent);
    if (consent === "rejected") {
      setCookiesRejectedAction();
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm">
        🍪 This website uses cookies to improve your experience. By continuing, you agree to our{" "}
        <a href="/privacy" className="underline text-yellow-300 hover:text-yellow-400">
          Privacy Policy
        </a>.
      </p>
      <div className="flex space-x-3 mt-3 md:mt-0">
        <button
          onClick={() => handleConsent("accepted")}
          className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-500"
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent("rejected")}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
