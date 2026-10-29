import React from 'react';
import { NavigationPage } from '../types';
import { ArrowLeft, Home } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-28 text-center space-y-6">
      <span className="text-6xl sm:text-7xl font-extrabold font-mono text-[#0878F9] block tracking-tighter">
        404
      </span>
      <h1 className="text-2xl sm:text-3xl font-bold text-[#071A42]">
        Page Not Located
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
        The requested resource does not exist or may have been relocated. Return to the homepage to explore our Odoo ERP solutions.
      </p>
      <div className="pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 text-sm font-semibold text-white bg-[#0878F9] hover:bg-[#0666d6] rounded-xl shadow transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </div>
  );
};
