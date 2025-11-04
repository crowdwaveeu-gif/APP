import { useState } from "react";
import { Link } from "react-router-dom";

const NavigationSection = () => {
  const [dropdown, setDropdown] = useState<string>("");
  const toggleDropdown = (menu: string) => {
    if (menu === dropdown) {
      setDropdown("");
    } else {
      setDropdown(menu);
    }
  };
  return (
    <div className="classynav top-navbar">
      <ul id="corenav">
        <li
          className={`cn-dropdown-item ${
            dropdown === "dashboards" ? "active" : ""
          }`}
        >
          <a>Dashboards</a>
          <button
            className="mobile-dropdown-btn"
            onClick={() => toggleDropdown("dashboards")}
          >
            <i
              className={`fa-light fa-chevron-${
                dropdown === "dashboards" ? "up" : "down"
              }`}
            ></i>
          </button>
          <ul className="dropdown">
            <li>
              <Link to="/dashboard">Courier System</Link>
            </li>
            {/* <li>
              <Link to="/delivery">Delivery</Link>
            </li> */}
            {/* <li>
              <Link to="/logistics">Logistics</Link>
            </li> */}
          </ul>
        </li>
        <li className={`megamenu-item ${dropdown === "apps" ? "active" : ""}`}>
          <a>Apps</a>
          <button
            className="mobile-dropdown-btn"
            onClick={() => toggleDropdown("apps")}
          >
            <i
              className={`fa-light fa-chevron-${
                dropdown === "apps" ? "up" : "down"
              }`}
            ></i>
          </button>
          <div className="megamenu">
            <ul className="single-mega cn-col-3">
              {/* <li>
                <Link to="/audience">Target Audience</Link>
              </li> */}
              <li>
                <Link to="/company">Company</Link>
              </li>
              <li>
                <Link to="/task">Task</Link>
              </li>
              <li>
                <Link to="/leads">Leads</Link>
              </li>
              <li>
                <Link to="/customer">Customer</Link>
              </li>
              {/* <li>
                <Link to="/add-employee">Add Employee</Link>
              </li>
              <li>
                <Link to="/all-employee">All Employee</Link>
              </li>
              <li>
                <Link to="/attendance">Attendance</Link>
              </li> */}
            </ul>
            <ul className="single-mega cn-col-3">
              {/* <li>
                <Link to="/all-customer">All Customer</Link>
              </li>
              <li>
                <Link to="/add-product">Add Product</Link>
              </li>
              <li>
                <Link to="/all-product">All Product</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li> */}
              <li>
                <Link to="/calendar">Calendar</Link>
              </li>
              {/* <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <Link to="/email">Email</Link>
              </li> */}
            </ul>
            <ul className="single-mega cn-col-3">
              {/* <li>
                <Link to="/card-declined">Card Declined</Link>
              </li>
              <li>
                <Link to="/promotion">Promotional</Link>
              </li>
              <li>
                <Link to="/subscription-confirm">Subscription Confirm</Link>
              </li>
              <li>
                <Link to="/welcome-mail">Welcome</Link>
              </li>
              <li>
                <Link to="/reset-password-mail">Reset Password</Link>
              </li>
              <li>
                <Link to="/invoices">Invoices</Link>
              </li>
              <li>
                <Link to="/contact">Contacts</Link>
              </li>
              <li>
                <Link to="/utility">Utility</Link>
              </li> */}
            </ul>
          </div>
        </li>
        <li className={`megamenu-item ${dropdown === "pages" ? "active" : ""}`}>
          <a>Pages</a>
          <button
            className="mobile-dropdown-btn"
            onClick={() => toggleDropdown("pages")}
          >
            <i
              className={`fa-light fa-chevron-${
                dropdown === "pages" ? "up" : "down"
              }`}
            ></i>
          </button>
          <div className="megamenu">
            <ul className="single-mega cn-col-3">
              <li>
                <Link to="/login">Login 01</Link>
              </li>
              {/* <li>
                <Link to="/login-2">Login 02</Link>
              </li>
              <li>
                <Link to="/login-3">Login 03</Link>
              </li> */}
              <li>
                <Link to="/registration">Registration 01</Link>
              </li>
              {/* <li>
                <Link to="/registration-2">Registration 02</Link>
              </li> */}
              <li>
                <Link to="/reset-password">Reset Password</Link>
              </li>
              {/* <li>
                <Link to="/update-password">Update Password</Link>
              </li>
              <li>
                <Link to="/login-status">Login Status</Link>
              </li>
              <li>
                <Link to="/account-deactivated">Account Deactivated</Link>
              </li>
              <li>
                <Link to="/welcome">Welcome</Link>
              </li>
              <li>
                <Link to="/email-verify">Verify Email</Link>
              </li>
              <li>
                <Link to="/two-factor">Two Factor Verification</Link>
              </li> */}
            </ul>
            <ul className="single-mega cn-col-3">
              {/* <li>
                <Link to="/multi-step-signup">Multi Step Signup</Link>
              </li> */}
              <li>
                <Link to="/view-profile">View Profile</Link>
              </li>
              <li>
                <Link to="/edit-profile">Edit Profile</Link>
              </li>
              {/* <li>
                <Link to="/coming-soon">Coming Soon 01</Link>
              </li>
              <li>
                <Link to="/coming-soon-2">Coming Soon 02</Link>
              </li>
              <li>
                <Link to="/pricing-table">Pricing Table 01</Link>
              </li>
              <li>
                <Link to="/pricing-table-2">Pricing Table 02</Link>
              </li>
              <li>
                <Link to="/under-construction">Under Construction</Link>
              </li>
              <li>
                <Link to="/sweet-alert">Sweet Alert</Link>
              </li>
              <li>
                <Link to="/nestable-list">Nestable List</Link>
              </li>
              <li>
                <Link to="/animation">Animation</Link>
              </li>
              <li>
                <Link to="/swiper-slider">Swiper Slider</Link>
              </li> */}
            </ul>
            <ul className="single-mega cn-col-3">
              {/* <li>
                <Link to="/error-400">Error 400</Link>
              </li>
              <li>
                <Link to="/error-403">Error 403</Link>
              </li>
              <li>
                <Link to="/error-404">Error 404</Link>
              </li>
              <li>
                <Link to="/error-408">Error 408</Link>
              </li>
              <li>
                <Link to="/error-500">Error 500</Link>
              </li>
              <li>
                <Link to="/error-503">Error 503</Link>
              </li>
              <li>
                <Link to="/error-504">Error 504</Link>
              </li>
              <li>
                <Link to="/form">Forms</Link>
              </li>
              <li>
                <Link to="/table">Tables</Link>
              </li>
              <li>
                <Link to="/charts">Charts</Link>
              </li>
              <li>
                <Link to="/icon">Icons</Link>
              </li>
              <li>
                <Link to="/map">Maps</Link>
              </li> */}
            </ul>
          </div>
        </li>
        <li>
          <Link to="/file-manager">File Manager</Link>
        </li>
      </ul>
    </div>
  );
};
export default NavigationSection;
