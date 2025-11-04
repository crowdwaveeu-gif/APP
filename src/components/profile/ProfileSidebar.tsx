import { useEffect, useRef, useState } from "react";

const ProfileSidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  return (
    <div className="profile-sidebar">
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="profile-sidebar-title">User Information</h5>

        <div
          className="profile-view-action dropdown dropstart"
          ref={dropdownRef}
        >
          <button
            className="btn btn-sm btn-icon btn-light"
            onClick={toggleDropdown}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-sm dropdown-menu-sm-end ${
              activeDropdown ? "show" : ""
            }`}
          >
            <li>
              <a className="dropdown-item" href="edit-profile.html">
                <i className="fa-regular fa-pen-to-square"></i> Edit Information
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="top">
        <div className="image-wrap">
          <div className="part-img rounded-circle overflow-hidden">
            <img src="/img/bg-img/admin.png" alt="admin" />
          </div>
          <button className="image-change">
            <i className="fa-light fa-camera"></i>
          </button>
        </div>
        <div className="part-txt">
          <h4 className="admin-name">Mitchell C. Shay</h4>
          <span className="admin-role">Graphic Designer</span>
          <div className="admin-social">
            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-google"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h6 className="profile-sidebar-subtitle">Communication Info</h6>
        <ul>
          <li>
            <span>Full Name:</span>Anna Adame
          </li>
          <li>
            <span>Mobile:</span>+(1) 987 65433
          </li>
          <li>
            <span>Mail:</span>example@mail.com
          </li>
          <li>
            <span>Address:</span>California, United States
          </li>
          <li>
            <span>Joining Date:</span>24 Nov 2022
          </li>
        </ul>
        <h6 className="profile-sidebar-subtitle">About Me</h6>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
        </p>
      </div>
    </div>
  );
};
export default ProfileSidebar;
