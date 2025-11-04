import { useEffect, useRef, useState } from "react";
import { fileManagerData } from "../../data";
import { useAppDispatch } from "../../redux/hooks";
import { toggleFileDetailModalOpen } from "../../redux/features/fileDetailModalSlice";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

type Props = {
  title: string;
  grid?: boolean;
  starred?: boolean;
};
const FileSection = ({ title, grid, starred }: Props) => {
  const dispatch = useAppDispatch();
  const [gridlayout, setGridLayout] = useState<boolean>(grid ? grid : false);
  const toggleGrid = () => {
    setGridLayout(true);
  };
  const toggleList = () => {
    setGridLayout(false);
  };
  const toggleModalOpen = () => {
    dispatch(toggleFileDetailModalOpen());
  };
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu
  const [dropdown, setDropdown] = useState<number | null>(null);
  const [unStarredItems, setUnStarredItems] = useState<number[]>([]);

  // Toggle function to handle unstar action
  const toggleUnstar = (itemId: number) => {
    // Check if item is already unstarred
    const isUnstarred = unStarredItems.includes(itemId);

    if (isUnstarred) {
      // If already unstarred, remove from the list
      setUnStarredItems(unStarredItems.filter((id) => id !== itemId));
    } else {
      // If not unstarred, add to the list
      setUnStarredItems([...unStarredItems, itemId]);
    }
  };

  // Function to handle opening/closing dropdown
  const toggleDropdown = (option: number) => {
    if (dropdown === option) {
      setDropdown(null); // Close dropdown if it's already open
    } else {
      setDropdown(option); // Open dropdown for the selected item
    }
  };

  // Function to handle closing dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node; // Cast event.target to Node type

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(target) &&
      !(target instanceof Element && target.closest(".dropdown.action"))
    ) {
      setDropdown(null); // Close dropdown if clicked outside of it
    }
  };

  // Effect to add click event listener when dropdown is open
  useEffect(() => {
    if (dropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <div className="panel">
      <div className="panel-header">
        <h5>{title}</h5>
        <div className="btn-box">
          <button
            className={`btn btn-sm btn-icon btn-outline-primary btn-grid-view ${
              gridlayout ? "active" : ""
            }`}
            onClick={toggleGrid}
          >
            <i className="fa-solid fa-grid-2"></i>
          </button>
          <button
            className={`btn btn-sm btn-icon btn-outline-primary btn-list-view ms-1 ${
              !gridlayout ? "active" : ""
            }`}
            onClick={toggleList}
          >
            <i className="fa-regular fa-bars"></i>
          </button>
        </div>
      </div>
      <div className="panel-body">
        <OverlayScrollbarsComponent>
          <div className="table-responsive">
            <div
              className={`file-manager-row ${!gridlayout ? "list-view" : ""}`}
            >
              <div className="file-manager-col-head">
                <span>Thumbnail</span>
                <span>Name</span>
                <span>File Size</span>
                <span>Type</span>
                <span></span>
              </div>
              {fileManagerData.map((item) => (
                <div className="file-manager-col" key={item.id}>
                  <div className="file-card">
                    <div className="part-img">
                      <button className="btn-flush" onClick={toggleModalOpen}>
                        <img src={item.img} alt="Image" />
                      </button>
                    </div>
                    <div className="part-txt">
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn-flush file-name"
                          onClick={toggleModalOpen}
                        >
                          {item.name}
                        </button>
                        <span className="file-size">{item.size}</span>
                      </div>
                    </div>
                    <div className="file-type">
                      <span>{item.fileType}</span>
                    </div>
                    <div className="dropdown action" ref={dropdownRef}>
                      {starred && (
                        <button
                          key={item.id}
                          className={`btn-star ${
                            unStarredItems.includes(item.id) ? "" : "starred"
                          }`}
                          onClick={() => toggleUnstar(item.id)}
                        >
                          <i className="fa-solid fa-star"></i>
                        </button>
                      )}
                      <button
                        className="btn-flush"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <i className="fa-regular fa-ellipsis-vertical"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => toggleDropdown(item.id)}
                      >
                        Action <i className="fa-regular fa-angle-down"></i>
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          dropdown === item.id ? "show" : ""
                        }`}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={toggleModalOpen}
                          >
                            <span className="dropdown-icon">
                              <i className="fa-light fa-eye"></i>
                            </span>
                            View
                          </button>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-pen"></i>
                            </span>
                            Rename
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-arrows-up-down-left-right"></i>
                            </span>
                            Move
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-trash"></i>
                            </span>
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </OverlayScrollbarsComponent>

        <div className="part-btn text-center">
          <p>Showing 10 of 100 items</p>
          <button className="btn btn-sm btn-primary">Load More</button>
        </div>
      </div>
    </div>
  );
};
export default FileSection;
