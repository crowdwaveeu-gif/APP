import { useEffect, useRef, useState } from "react";
import { authService } from "../../services/authService";
import { useLocation } from "react-router-dom";

type Props = {
  toggleSidebarOpen: () => void;
};

// Page title mapping
const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'CrowdWave System' },
  '/transactions': { title: 'Transactions', subtitle: 'Payment Management' },
  '/packages': { title: 'Packages', subtitle: 'Package Management' },
  '/trips': { title: 'Trips', subtitle: 'Trip Management' },
  '/disputes': { title: 'Disputes', subtitle: 'Dispute Resolution' },
  '/users-management': { title: 'Users', subtitle: 'User Management' },
  '/kyc-applications': { title: 'KYC Applications', subtitle: 'Verification Management' },
  '/platform-settings': { title: 'Platform Fee', subtitle: 'Settings Management' },
  '/static-content-management': { title: 'Static Content', subtitle: 'Content Management' },
  '/promotional-emails': { title: 'Campaign', subtitle: 'Email Marketing' },
};

const HeaderSection = ({ toggleSidebarOpen }: Props) => {
  const location = useLocation();
  const pageInfo = pageTitles[location.pathname] || { title: 'Dashboard', subtitle: 'CrowdWave System' };
  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  return (
    <header
      className="top-header-area d-flex align-items-center justify-content-between"
      id="stickyHeader"
    >
      <div className="left-side-content-area d-flex align-items-center">
        <div
          className="mobile-menu-icon d-md-none"
          id="mobileMenuIcon"
          role="button"
          onClick={toggleSidebarOpen}
        >
          <i className="ti ti-menu-deep"></i>
        </div>

        <div className="top-bar-text d-none d-lg-block">
          <h4 className="mb-1 text-white">{pageInfo.title}</h4>
          <p className="mb-0 text-white text-uppercase opacity-75">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      <div className="right-side-navbar d-flex align-items-center justify-content-end">
        <button
          type="button"
          className="btn"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onClick={async (e) => {
            e.preventDefault();
            if (isLoggingOut) return;
            
            if (window.confirm('Are you sure you want to logout?')) {
              setIsLoggingOut(true);
              
              try {
                await authService.logout();
                window.location.href = '/login';
              } catch (error) {
                console.error('Logout failed:', error);
                alert('Failed to logout. Please try again.');
                setIsLoggingOut(false);
              }
            }
          }}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Logging out...
            </>
          ) : (
            <>
              <i className="ti ti-lock me-2"></i>
              Logout
            </>
          )}
        </button>
      </div>
    </header>
  );
};
export default HeaderSection;
