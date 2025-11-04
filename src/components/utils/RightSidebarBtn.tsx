import { useAppDispatch } from "../../redux/hooks";
import { toggleRightSidebarOpen } from "../../redux/features/rightSidebarSlice";

const RightSidebarBtn = () => {
  const dispatch = useAppDispatch();

  const toggleFunc = () => {
    dispatch(toggleRightSidebarOpen());
  };

  return (
    <div className="right-sidebar-btn" style={{ display: 'none' }}>
      <button className="theme-settings-btn" onClick={toggleFunc}>
        <span>
          <i className="ti ti-palette"></i>
        </span>
      </button>
    </div>
  );
};

export default RightSidebarBtn;
