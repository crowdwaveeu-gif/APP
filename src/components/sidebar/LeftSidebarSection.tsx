import { Link } from "react-router-dom";
import SideMenuNavSection from "../navigation/SideMenuNavSection";
import { useAppSelector } from "../../redux/hooks";
import { MutableRefObject } from "react";
import CrowdWaveLogo from "../utils/CrowdWaveLogo";
type Props = {
  logoutBtn?: boolean;
  customLogo?: string;
  noTitle?: boolean;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
};
const LeftSidebarSection = ({
  logoutBtn,
  customLogo,
  noTitle,
  sidebarRef,
}: Props) => {
  const sidebarBgImage = useAppSelector((state) => state.sidebarBg.sidebarBg);
  return (
    <div
      className={`webdesh-sidemenu-area ${
        sidebarBgImage !== "" ? "sidebar-bg-detected" : ""
      }`}
      id="sideMenuWrapper"
      style={{
        ...(sidebarBgImage !== "" && {
          backgroundImage: `url(${sidebarBgImage})`,
        }),
      }}
      ref={sidebarRef}
    >
      <div className="webdesh-logo">
        {customLogo ? (
          <Link to="/dashboard">
            <img className="white-logo" src={customLogo} alt="logo" />
          </Link>
        ) : (
          <Link to="/dashboard">
            <CrowdWaveLogo size="medium" variant="white" />
          </Link>
        )}
      </div>
      <div className="webdesh-sidenav" id="webdeshSideNav">
        <SideMenuNavSection logoutBtn={logoutBtn} noTitle={noTitle} />
      </div>
    </div>
  );
};
export default LeftSidebarSection;
