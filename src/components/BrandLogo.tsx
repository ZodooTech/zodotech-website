import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false,
}) => {
  const isLight = variant === 'light';
  
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Emblem with Orbital Ring and Gradient 'Z' */}
      <div className={`relative shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            <linearGradient id="zodoGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0878F9" />
              <stop offset="50%" stopColor="#00D5F2" />
              <stop offset="100%" stopColor="#8B18F5" />
            </linearGradient>
            <linearGradient id="orbitGradient" x1="0" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B18F5" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#0878F9" />
              <stop offset="100%" stopColor="#00D5F2" />
            </linearGradient>
          </defs>

          {/* Deep Navy Emblem Base Background */}
          <rect width="100" height="100" rx="22" fill={isLight ? '#0B2256' : '#071A42'} />

          {/* Elliptical Orbital Ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="42"
            ry="18"
            transform="rotate(-26 50 50)"
            stroke="url(#orbitGradient)"
            strokeWidth="4.5"
            strokeDasharray="6 2"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Stylized Sharp 'Z' Core Geometry */}
          <path
            d="M 28 30 L 72 30 L 72 37 L 43 63 L 72 63 L 72 70 L 28 70 L 28 63 L 57 37 L 28 37 Z"
            fill="url(#zodoGradient)"
          />

          {/* Orbital Satellite Node */}
          <circle cx="82" cy="36" r="4.5" fill="#00D5F2" />
          <circle cx="18" cy="64" r="3.5" fill="#8B18F5" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight ${textSizes[size]} ${
            isLight ? 'text-white' : 'text-[#071A42]'
          }`}
        >
          Zodo<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0878F9] to-[#00D5F2]">Tech</span>
        </span>
        {showTagline && (
          <span
            className={`text-[10px] font-semibold tracking-wider uppercase mt-0.5 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Build · Customize · Grow
          </span>
        )}
      </div>
    </div>
  );
};
