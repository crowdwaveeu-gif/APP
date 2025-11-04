import { useEffect, useRef, useState } from "react";
import { allFilesFolderList } from "../../data";
import { toggleCreateFolderModalOpen } from "../../redux/features/createFolderModalSlice";
import { useAppDispatch } from "../../redux/hooks";

const AllFilesTopSection = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown menu
  const [dropdown, setDropdown] = useState<number | null>(null);

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
      !(target instanceof Element && target.closest(".dropdown"))
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

  // Function to open create folder modal
  const openCreateFolderModal = () => {
    dispatch(toggleCreateFolderModalOpen());
  };
  return (
    <div className="panel mb-4">
      <div className="panel-header">
        <div className="d-flex align-items-center gap-1">
          <h5>All Files</h5>
        </div>
        <form className="file-search pe-0">
          <input
            type="search"
            id="fileSearch"
            className="form-control"
            placeholder="Search...."
          />
          <button>
            <i className="fa-light fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          {allFilesFolderList.map((item) => (
            <div className="col-12 col-sm-6 col-xl-4 col-xxl-3" key={item.id}>
              <div className="file-manager-card">
                <div className="top">
                  <div className="part-icon">
                    <span>
                      <i className="fa-duotone fa-folder-open"></i>
                    </span>
                  </div>
                  <div className="dropdown" ref={dropdownRef}>
                    <button
                      className="action"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <i className="fa-regular fa-ellipsis-vertical"></i>
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        dropdown === item.id ? "show" : ""
                      }`}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-eye"></i>
                          </span>
                          Details
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-share-nodes"></i>
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-copy"></i>
                          </span>
                          Copy
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-arrows-up-down-left-right"></i>
                          </span>
                          Move
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-download"></i>
                          </span>
                          Download
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-pen"></i>
                          </span>
                          Rename
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <span className="dropdown-icon">
                            <i className="fa-regular fa-trash"></i>
                          </span>
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bottom">
                  <div className="left">
                    <button className="folder-name">{item.name}</button>
                    <span className="file-quantity">{item.quantity} Files</span>
                  </div>
                  <div className="right">
                    <span className="storage-used">{item.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12">
            <div className="d-flex justify-content-between">
              <button className="btn btn-sm btn-primary">
                <i className="fa-light fa-eye"></i> Show All
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={openCreateFolderModal}
              >
                <i className="fa-light fa-plus"></i> Create Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllFilesTopSection;
