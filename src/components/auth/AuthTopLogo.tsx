import { Link } from "react-router-dom";

const AuthTopLogo = () => {
  return (
    <>
      <div className="logo">
        <a href="#" style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#6C5CE7',
          textDecoration: 'none',
          fontFamily: 'inherit'
        }}>
          CrowdWave
        </a>
      </div>
      <Link to="/">
        <i className="fa-duotone fa-house-chimney"></i>
      </Link>
    </>
  );
};
export default AuthTopLogo;
