import { Link } from "react-router-dom";

const AuthTopLogo = () => {
  return (
    <>
      <div className="logo d-flex align-items-center gap-2">
        <img 
          src="/img/core-img/logo.png" 
          alt="CrowdWave Logo" 
          style={{ 
            height: '45px',
            width: 'auto'
          }}
        />
        <span style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#6C5CE7',
          textDecoration: 'none',
          fontFamily: 'inherit',
          letterSpacing: '0.5px'
        }}>
          CrowdWave
        </span>
      </div>
      <Link to="/" style={{ 
        color: '#6C5CE7',
        fontSize: '20px',
        transition: 'color 0.3s ease'
      }}>
        <i className="fa-duotone fa-house-chimney"></i>
      </Link>
    </>
  );
};
export default AuthTopLogo;
