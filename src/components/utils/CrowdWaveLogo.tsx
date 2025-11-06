import React from 'react';

interface CrowdWaveLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'white' | 'dark';
  className?: string;
  showIcon?: boolean;
}

const CrowdWaveLogo: React.FC<CrowdWaveLogoProps> = ({ 
  size = 'medium', 
  variant = 'primary',
  className = '',
  showIcon = true
}) => {
  return (
    <div className={`crowdwave-logo crowdwave-logo-${size} crowdwave-logo-${variant} ${className}`}>
      {showIcon && (
        <div className="crowdwave-icon">
          <img 
            src="/colored-logo.png?v=2" 
            alt="CrowdWave Logo"
            className="logo-image"
          />
        </div>
      )}
      <div className="crowdwave-text">
        <span className="logo-text">CrowdWave</span>
      </div>
    </div>
  );
};

export default CrowdWaveLogo;
