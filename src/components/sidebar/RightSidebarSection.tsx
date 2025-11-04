import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleRightSidebarClose } from "../../redux/features/rightSidebarSlice";
import {
  toggleDarkTheme,
  toggleLightTheme,
} from "../../redux/features/themeSlice";
import {
  homepageList,
  mainBackgroundImgList,
  sidebarImgList,
} from "../../data";
import { toggleLayout } from "../../redux/features/layoutSlice";
import { toggleSidebarBg } from "../../redux/features/sidebarBgSlice";
import { toggleMainBg } from "../../redux/features/mainBgSlice";

const RightSidebarSection = () => {
  const dispatch = useAppDispatch();
  const showRightSidebar = useAppSelector(
    (state) => state.rightSidebar.isRightSidebarOpen
  );
  const activeSidebarImg = useAppSelector((state) => state.sidebarBg.sidebarBg);
  const activeMainBackgroundImg = useAppSelector(
    (state) => state.mainBg.mainBg
  );
  const activeLayout = useAppSelector((state) => state.layout.isLayout);
  const closeRightSidebar = () => {
    dispatch(toggleRightSidebarClose());
  };
  const toggleDark = () => {
    dispatch(toggleDarkTheme());
  };

  const toggleLight = () => {
    dispatch(toggleLightTheme());
  };
  const changeLayout = (layout: string) => {
    dispatch(toggleLayout(layout));
  };
  const changeSidebarBg = (img: string) => {
    dispatch(toggleSidebarBg(img));
  };
  const changeMainBg = (img: string) => {
    dispatch(toggleMainBg(img));
  };
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        dispatch(toggleRightSidebarClose());
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div
      className={`right-sidebar ${showRightSidebar ? "active" : ""}`}
      ref={sidebarRef}
    >
      <button className="right-bar-close" onClick={closeRightSidebar}>
        <i className="fa-light fa-angle-right"></i>
      </button>
      <div className="sidebar-title">
        <h3>Layout Settings</h3>
      </div>

      <div className="sidebar-body scrollable">
        <div className="right-sidebar-group">
          <span className="sidebar-subtitle">
            Dashboard Variation
            <span>
              <i className="fa-light fa-angle-up"></i>
            </span>
          </span>

          <div className="settings-row">
            {homepageList.map((item) => (
              <div className="settings-col" key={item.id}>
                <a
                  role="button"
                  onClick={() => changeLayout(`style-${item.id}`)}
                >
                  <div
                    className={`dashboard-icon d-flex gap-1 border rounded ${
                      activeLayout === `style-${item.id}` ? "active" : ""
                    }`}
                  >
                    <img src={item.img} alt="image" />
                    <span className="part-txt">{item.name}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="right-sidebar-group">
          <span className="sidebar-subtitle">
            Theme Color
            <span>
              <i className="fa-light fa-angle-up"></i>
            </span>
          </span>
          <div className="settings-row">
            <div className="settings-col">
              <div
                className="dashboard-icon d-flex gap-1 border rounded bg-body-secondary light-theme-btn"
                id="lightTheme"
                role="button"
                onClick={toggleLight}
              >
                <div className="pb-4 px-1 pt-1 bg-dark-subtle">
                  <div className="px-2 py-1 rounded-pill bg-primary mb-2"></div>
                  <div className="px-2 pt-1 bg-primary mb-1"></div>
                  <div className="px-2 pt-1 bg-primary mb-1"></div>
                  <div className="px-2 pt-1 bg-primary mb-1"></div>
                </div>
                <div className="w-100 d-flex flex-column justify-content-between">
                  <div className="px-2 py-1 bg-dark-subtle"></div>
                  <div className="px-2 py-1 bg-dark-subtle"></div>
                </div>
                <span className="part-txt">Light Theme</span>
              </div>
            </div>
            <div className="settings-col">
              <div
                className="dashboard-icon d-flex gap-1 border rounded bg-dark"
                id="darkTheme"
                role="button"
                onClick={toggleDark}
              >
                <div className="pb-4 px-1 pt-1 bg-menu">
                  <div className="px-2 py-1 rounded-pill bg-nav mb-2"></div>
                  <div className="px-2 pt-1 bg-nav mb-1"></div>
                  <div className="px-2 pt-1 bg-nav mb-1"></div>
                  <div className="px-2 pt-1 bg-nav mb-1"></div>
                </div>
                <div className="w-100 d-flex flex-column justify-content-between">
                  <div className="px-2 py-1 bg-menu"></div>
                  <div className="px-2 py-1 bg-menu"></div>
                </div>
                <span className="part-txt">Dark Theme</span>
              </div>
            </div>
          </div>
        </div>

        <div className="right-sidebar-group">
          <span className="sidebar-subtitle">
            Sidebar Background
            <span>
              <i className="fa-light fa-angle-up"></i>
            </span>
          </span>
          <div>
            <div className="sidebar-bg-btn-box">
              <button id="noBackground" onClick={() => changeSidebarBg("")}>
                <span>
                  <i className="fa-light fa-xmark"></i>
                </span>
              </button>
              {sidebarImgList.map((img, index) => (
                <button
                  className={`sidebar-bg-btn ${
                    activeSidebarImg === img ? "active" : ""
                  }`}
                  onClick={() => changeSidebarBg(img)}
                  key={index}
                >
                  <img src={img} alt="image" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="right-sidebar-group">
          <span className="sidebar-subtitle">
            Main Background
            <span>
              <i className="fa-light fa-angle-up"></i>
            </span>
          </span>
          <div>
            <div className="main-content-bg-btn-box">
              <button id="noBackground2" onClick={() => changeMainBg("")}>
                <span>
                  <i className="fa-light fa-xmark"></i>
                </span>
              </button>
              {mainBackgroundImgList.map((img, index) => (
                <button
                  className={`main-content-bg-btn ${
                    activeMainBackgroundImg === img ? "active" : ""
                  }`}
                  onClick={() => changeMainBg(img)}
                  key={index}
                >
                  <img src={img} alt="img" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RightSidebarSection;
