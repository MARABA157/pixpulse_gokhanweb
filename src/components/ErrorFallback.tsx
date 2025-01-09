import React from 'react';
import { FallbackProps } from 'react-error-boundary';

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Bir Hata Oluştu</h2>
        <p className="text-gray-300 mb-4">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition-colors duration-200"
        >
          Yeniden Dene
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
