import React from 'react';

interface ErrorComponentProps {
  error: string | null;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="bg-red-600 text-white rounded-lg m-6 shadow-lg text-center p-4" style={{ marginLeft: '300px', width: '80%' }}>
      {error}
    </div>
  );
};

export default ErrorComponent;