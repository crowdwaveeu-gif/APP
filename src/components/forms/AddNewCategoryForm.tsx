import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const AddNewCategoryForm = () => {
  const [showThumbnail, setShowThumbnail] = useState(false);
  const handleShowThumbnail = () => {
    setShowThumbnail(!showThumbnail);
  };
  const onDropSingle = useCallback((acceptedFiles: File[]) => {
    // Handle the single file upload
    console.log(acceptedFiles);
  }, []);
  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
    isDragActive: isSingleDragActive,
  } = useDropzone({ onDrop: onDropSingle });
  const [title, setTitle] = useState<string>("");
  const [permalink, setPermalink] = useState<string>("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
    generatePermalink(value);
  };

  const generatePermalink = (value: string) => {
    const formattedTitle = value.toLowerCase().replace(/\s+/g, "-");
    setPermalink(`https://example.com/${formattedTitle}`);
  };

  const handleEditPermalink = () => {
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.value = permalink;
      editPermalinkInput.hidden = false;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = true;
        createPerma.hidden = false;
        cancelPerma.hidden = false;
      }
    }
  };

  const handleUpdatePermalink = () => {
    const updatedPermalink = (
      document.getElementById("editPermalink") as HTMLInputElement
    ).value;
    setPermalink(updatedPermalink);
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.hidden = true;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = false;
        createPerma.hidden = true;
        cancelPerma.hidden = true;
      }
    }
  };

  const handleCancelPermalink = () => {
    const editPermalinkInput = document.getElementById(
      "editPermalink"
    ) as HTMLInputElement;
    if (editPermalinkInput) {
      editPermalinkInput.hidden = true;
      const editPermaBtn = document.getElementById("editPermaBtn");
      const createPerma = document.getElementById("createPerma");
      const cancelPerma = document.getElementById("cancelPerma");
      if (editPermaBtn && createPerma && cancelPerma) {
        editPermaBtn.hidden = false;
        createPerma.hidden = true;
        cancelPerma.hidden = true;
      }
    }
  };
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Add New Category</h5>
      </div>

      <div className="panel-body">
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control "
              id="categoryTitle"
              value={title}
              onChange={handleTitleChange}
            />
            <p className="perma-txt" hidden={title === ""}>
              Permalink:{" "}
              <span
                data-link={permalink}
                className="site-link text-primary"
                id="categoryPermalink"
              >
                {permalink}
              </span>
              <input
                type="text"
                className="form-control "
                id="editPermalink"
                hidden
              />
              <button
                className="btn-flush bg-primary"
                id="editPermaBtn"
                onClick={handleEditPermalink}
              >
                Edit
              </button>
              <button
                className="btn-flush bg-success"
                id="createPerma"
                onClick={handleUpdatePermalink}
              >
                OK
              </button>
              <button
                className="btn-flush bg-danger"
                id="cancelPerma"
                onClick={handleCancelPermalink}
              >
                Cancel
              </button>
            </p>
          </div>
          <div className="col-sm-6">
            <label className="form-label">Main Category</label>
            <select className="form-control " data-placeholder="Select">
              <option value="">Select</option>
              <option value="0">Cloth</option>
              <option value="1">-Fashion</option>
              <option value="2">--Jewellery</option>
              <option value="3">---Bag</option>
              <option value="4">----Smart Phone</option>
              <option value="5">Watch</option>
              <option value="6">Sunglass</option>
            </select>
          </div>
          <div className="col-sm-6">
            <label className="form-label">Custom Category Icon</label>
            <input
              type="text"
              className="form-control "
              placeholder="Fontawesome 6 pro icon name"
            />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea rows={5} className="form-control "></textarea>
          </div>
          <div className="col-12">
            <label className="form-label">Display Type</label>
            <select className="form-control ">
              <option value="0">Default</option>
              <option value="1">Products</option>
              <option value="2">Subcategories</option>
              <option value="3">Both</option>
            </select>
          </div>
          <div className="col-12">
            <div className="upload-category-thumbnail">
              <label
                className="form-label mb-0"
                role="button"
                onClick={handleShowThumbnail}
              >
                Add Category Thumbnail
              </label>
              <div
                {...getSingleRootProps()}
                className={`${showThumbnail ? "d-block" : "d-none"}`}
              >
                <input
                  type="file"
                  id="singleUpload"
                  {...getSingleInputProps()}
                />
                {isSingleDragActive ? (
                  <div className="jquery-uploader">
                    <div className="jquery-uploader-preview-container">
                      <div className="jquery-uploader-select-card">
                        <div className="jquery-uploader-select">
                          <div className="upload-button">
                            <i className="fa fa-plus"></i>
                            <br />
                            <a>Upload</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="jquery-uploader">
                    <div className="jquery-uploader-preview-container">
                      <div className="jquery-uploader-select-card">
                        <div className="jquery-uploader-select">
                          <div className="upload-button">
                            <i className="fa fa-plus"></i>
                            <br />
                            <a>Upload</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end">
            <div className="btn-box">
              <button className="btn btn-primary">Save Category</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewCategoryForm;
