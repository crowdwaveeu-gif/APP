import NavigationSection from "../navigation/NavigationSection";
import { useEffect, useRef, useState } from "react";
import { authService } from "../../services/authService";

type Props = {
  showLogo?: boolean;
  toggleSidebar: () => void;
};

const HeaderSection2 = ({ showLogo, toggleSidebar }: Props) => {
  // Dropdown
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

  // Mobile Menu
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <header className="top-header-area">
      <div
        className={`${
          showLogo ? "container" : ""
        } h-100 d-flex align-items-center justify-content-between`}
      >
        <div className="left-side-content-area d-flex align-items-center">
          <div
            className="mobile-menu-icon d-md-none me-2"
            id="mobileMenuIcon"
            role="button"
            onClick={toggleSidebar}
          >
            <i className="ti ti-menu-deep"></i>
          </div>
          {showLogo && (
            <a href="/" className="d-none d-md-block">
              <img src="/logo.png" alt="CrowdWave Logo" />
            </a>
          )}
          <div className="me-2 classy-nav-container">
            <nav
              className="classy-navbar justify-content-between"
              id="topNav"
              ref={sidebarRef}
            >
              <div
                className="classy-navbar-toggler"
                role="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span className="navbarToggler">
                  <i className="ti ti-selector"></i>
                </span>
              </div>

              <div className={`classy-menu ${sidebarOpen ? "menu-on" : ""}`}>
                <div
                  className="classycloseIcon"
                  role="button"
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="cross-wrap">
                    <span className="top"></span>
                    <span className="bottom"></span>
                  </div>
                </div>

                <NavigationSection />
              </div>
            </nav>
          </div>
        </div>

        <div className="right-side-navbar d-flex align-items-center justify-content-end">
          <ul
            className="ps-0 right-side-content d-flex align-items-center"
            ref={dropdownRef}
          >
            <div className="top-search-bar d-none d-sm-block">
              <form action="#" method="get">
                <input
                  type="search"
                  name="search"
                  className="from-control top-search mb-0"
                  placeholder="Search"
                  onFocus={() => toggleDropdown("")}
                />
                <button type="submit" className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <circle
                      cx="6.36364"
                      cy="6.36364"
                      r="5.66364"
                      stroke="white"
                      stroke-width="1.4"
                    />
                    <line
                      x1="13.0101"
                      y1="14"
                      x2="10.1818"
                      y2="11.1718"
                      stroke="white"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <li className="nav-item dropdown">
              <button
                className={`btn dropdown-toggle ${
                  activeDropdown === "notification" ? "show" : ""
                }`}
                onClick={() => toggleDropdown("notification")}
              >
                <img alt="" src="/img/icons/notifications2.png" />
                <span className="notification-active-status"></span>
              </button>

              <div
                className={`dropdown-menu notifications-box dropdown-menu-end ${
                  activeDropdown === "notification" ? "show" : ""
                }`}
              >
                <a className="dropdown-item" href="#">
                  <i className="ti ti-percentage"></i>
                  <span>Your commissions has been sent</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-alert-triangle bg-warning"></i>
                  <span>Security alert for your linked Google account</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-percentage"></i>
                  <span>Your commissions has been sent</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-alert-triangle bg-warning"></i>
                  <span>Security alert for your linked Google account</span>
                </a>
                <a href="#" className="btn btn-sm w-100 h-auto">
                  View all <i className="ti ti-arrow-right"></i>
                </a>
              </div>
            </li>

            <li className="nav-item dropdown">
              <button
                className={`btn dropdown-toggle ${
                  activeDropdown === "msg" ? "show" : ""
                }`}
                onClick={() => toggleDropdown("msg")}
              >
                <img alt="" src="/img/icons/message2.png" />
              </button>

              <div
                className={`dropdown-menu dropdown-menu-end ${
                  activeDropdown === "msg" ? "show" : ""
                }`}
              >
                <div className="notifications-box" id="notificationsBox">
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-box bg-success"></i>
                    <span>We've got something for you!</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-alert-triangle bg-danger"></i>
                    <span>Domain names expiring on Tuesday</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-percentage"></i>
                    <span>Your commissions has been sent</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-alert-triangle bg-warning"></i>
                    <span>Security alert for your linked Google account</span>
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-alert-triangle bg-danger"></i>
                    <span>Domain names expiring on Tuesday</span>
                  </a>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown">
              <button className="btn" type="button">
                <img alt="" src="/img/icons/layouts.png" />
              </button>
            </li>

            <li className="nav-item dropdown">
              <button
                className={`btn dropdown-toggle ${
                  activeDropdown === "profile" ? "show" : ""
                }`}
                onClick={() => toggleDropdown("profile")}
              >
                <img alt="" src="/img/icons/user2.png" />
              </button>

              <div
                className={`dropdown-menu dropdown-menu-end ${
                  activeDropdown === "profile" ? "show" : ""
                }`}
              >
                <div className="user-profile-area">
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-user"></i> My profile
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-settings"></i> Account settings
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="ti ti-heart"></i> Support
                  </a>
                  <button
                    type="button"
                    className="dropdown-item"
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isLoggingOut) return;
                      
                      setIsLoggingOut(true);
                      setActiveDropdown(""); // Close dropdown
                      
                      try {
                        await authService.logout();
                        window.location.href = '/login';
                      } catch (error) {
                        console.error('Logout failed:', error);
                        alert('Failed to logout. Please try again.');
                        setIsLoggingOut(false);
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
                        <i className="ti ti-lock"></i> Logout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default HeaderSection2;
