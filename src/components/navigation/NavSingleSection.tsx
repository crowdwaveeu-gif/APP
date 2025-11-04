import { Link } from "react-router-dom";
import { navData } from "../../data";

type Props = {
  category: string;
  activeDropdown: string;
  pathname: string;
  toggleDropdown: (dropdown: string) => void;
  dashedDivider?: boolean;
  noTitle?: boolean;
};

const NavSingleSection = ({
  category,
  activeDropdown,
  pathname,
  toggleDropdown,
  noTitle,
}: Props) => {
  return (
    <>
      {navData
        .find((item) => item.category === category)
        ?.links.map((item, index) =>
          item.hasSub ? (
            <li
              className={`treeview ${
                activeDropdown === item.title ? "menu-open" : ""
              } ${pathname === item.url ? "active" : ""}`}
              key={index}
            >
              <a
                role="button"
                onClick={() => toggleDropdown(item.title)} // Toggle dropdown state here
                data-tooltip-id="ota-tooltip"
                data-tooltip-content={item.title}
              >
                <i className={item.icon}></i>
                <>
                  <span>{item.title}</span>
                  <i className="ti ti-chevron-right"></i>
                </>
              </a>
              <ul
                className={`ps-0 treeview-menu ${
                  activeDropdown === item.title ? "menu-open" : ""
                }`}
              >
                {item.subLinks?.map((link, i) => (
                  <li
                    className={pathname === link.subUrl ? "active" : ""}
                    key={i}
                  >
                    <Link to={link.subUrl}>{link.subTitle}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li
              className={`${pathname === item.url ? "active" : ""}`}
              key={index}
            >
              <Link to={item.url}>
                <i className={item.icon}></i>
                {!noTitle && <span>{item.title}</span>}
              </Link>
            </li>
          )
        )}
    </>
  );
};

export default NavSingleSection;
