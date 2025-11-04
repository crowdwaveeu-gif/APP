type MultiLevelState = {
  firstLvl: boolean;
  secondLvl: boolean;
};
type Props = {
  activeMultiLvl: MultiLevelState;
  handleClick: (level: keyof MultiLevelState) => void;
  noTitle?: boolean;
};
const MultilvlDropdown = ({ activeMultiLvl, handleClick }: Props) => {
  return (
    <>
      <li className={`treeview ${activeMultiLvl.firstLvl ? "menu-open" : ""}`}>
        <a
          role="button"
          onClick={() => handleClick("firstLvl")}
          data-tooltip-id="ota-tooltip"
          data-tooltip-content="Multilevel Menu"
        >
          <i className="ti ti-share"></i>

          <span>Multilevel Menu</span>
          <i className="ti ti-chevron-right"></i>
        </a>
        {activeMultiLvl.firstLvl && (
          <ul
            className={`ps-0 treeview-menu ${
              activeMultiLvl.firstLvl ? "menu-open" : ""
            }`}
          >
            <li>
              <a href="#">Level One</a>
            </li>
            <li
              className={`treeview ${
                activeMultiLvl.secondLvl ? "menu-open" : ""
              }`}
            >
              <a role="button" onClick={() => handleClick("secondLvl")}>
                Level One <i className="ti ti-chevron-right"></i>
              </a>
              <ul
                className={`ps-0 treeview-menu ${
                  activeMultiLvl.secondLvl ? "menu-open" : ""
                }`}
              >
                <li>
                  <a href="#">Level Two</a>
                </li>
                <li>
                  <a href="#">Level Two</a>
                </li>
                <li>
                  <a href="#">Level Two</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Level One</a>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};
export default MultilvlDropdown;
