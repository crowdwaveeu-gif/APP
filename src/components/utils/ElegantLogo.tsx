import React from 'react';

interface ElegantLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  alt?: string;
}

const ElegantLogo: React.FC<ElegantLogoProps> = ({ 
  size = 'medium', 
  className = '', 
  alt = 'Company Logo' 
}) => {
  const sizeClass = `elegant-logo-${size}`;
  
  return (
    <div className={`elegant-logo ${sizeClass} ${className}`}>
      <img 
        src="/logo.png" 
        alt={alt}
        loading="lazy"
      />
    </div>
  );
};

export default ElegantLogo;
