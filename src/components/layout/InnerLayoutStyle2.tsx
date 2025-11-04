import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import FooterSection from "../footer/FooterSection";
import LeftSidebarSection from "../sidebar/LeftSidebarSection";
import { useEffect, useRef, useState } from "react";
import HeaderSection2 from "../header/HeaderSection2";

const InnerLayoutStyle2 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const mainBackgroundImg = useAppSelector((state) => state.mainBg.mainBg);
  // sidebar
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const toggleSidebarOpen = () => {
    setSidebarOpen(true);
  };

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
    <div
      className={`home-delivery ${darkMode ? "dark-theme" : "light-theme"} ${
        mainBackgroundImg !== "" ? "bg-detected" : ""
      } ${sidebarOpen ? "mobile-menu-open" : ""}`}
      style={{
        ...(mainBackgroundImg !== "" && {
          backgroundImage: `url(${mainBackgroundImg})`,
        }),
      }}
    >
      <div className="webdesh-page-wrapper">
        <LeftSidebarSection sidebarRef={sidebarRef} />
        <div className="webdesh-page-content">
          <HeaderSection2 toggleSidebar={toggleSidebarOpen} />
          <div className="main-content-wrap">
            <div className="main-container container-fluid">
              <div className="container-bg-shape">
                <img src="/img/icons/fireworks.png" alt="" />
              </div>
              <Outlet />
            </div>

            <div className="mt-4"></div>
            <div className="container mt-auto">
              <FooterSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InnerLayoutStyle2;
