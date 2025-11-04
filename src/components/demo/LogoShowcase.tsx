import React from 'react';
import CrowdWaveLogo from '../utils/CrowdWaveLogo';

const LogoShowcase: React.FC = () => {
  return (
    <div className="logo-showcase p-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="mb-4">CrowdWave Logo Showcase</h2>
            <p className="text-muted">Experience the elegant text shine animation - hover to see accelerated effect</p>
          </div>
        </div>
        
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 text-center mb-5">
            <h5 className="mb-3">Small Logo</h5>
            <div className="d-flex justify-content-center p-3 bg-light rounded">
              <CrowdWaveLogo size="small" variant="primary" />
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 text-center mb-5">
            <h5 className="mb-3">Medium Logo</h5>
            <div className="d-flex justify-content-center p-3 bg-light rounded">
              <CrowdWaveLogo size="medium" variant="primary" />
            </div>
          </div>
          
          <div className="col-lg-4 col-md-6 text-center mb-5">
            <h5 className="mb-3">Large Logo</h5>
            <div className="d-flex justify-content-center p-3 bg-light rounded">
              <CrowdWaveLogo size="large" variant="primary" />
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-lg-6 text-center mb-4">
            <div className="card bg-dark text-white p-4">
              <h5 className="mb-3 text-white">Dark Background</h5>
              <div className="d-flex justify-content-center">
                <CrowdWaveLogo size="medium" variant="white" />
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 text-center mb-4">
            <div className="card bg-primary text-white p-4">
              <h5 className="mb-3 text-white">Mobile Header Style</h5>
              <div className="d-flex justify-content-center">
                <CrowdWaveLogo size="small" variant="white" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="row mt-4">
          <div className="col-12 text-center">
            <div className="card p-4" style={{background: 'linear-gradient(135deg, #444392 0%, #5a5bcc 100%)'}}>
              <h5 className="mb-3 text-white">Sidebar Style</h5>
              <div className="d-flex justify-content-center">
                <CrowdWaveLogo size="medium" variant="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
