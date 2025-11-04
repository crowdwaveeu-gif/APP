import { toggleFileDetailModalClose } from "../../redux/features/fileDetailModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const FileDetailsModal = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(
    (state) => state.fileDetailModal.isModalOpen
  );
  const closeModal = () => {
    dispatch(toggleFileDetailModalClose());
  };
  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div
        className={`file-details-modal-container ${
          activeModal ? "active" : ""
        }`}
      >
        <div className="file-details-modal-header">
          <h3>File Details</h3>
        </div>
        <div className="file-details-modal-body">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6 col-sm-5">
              <div className="part-img">
                <img src="/img/bg-img/product-img-2.png" alt="Image" />
              </div>
            </div>
            <div className="col-lg-6 col-sm-7">
              <div className="part-txt">
                <ul className="file-details">
                  <li>
                    <span>Uploaded on:</span> November 20, 2022
                  </li>
                  <li>
                    <span>Uploaded by:</span> Shaikh Abu Dardah
                  </li>
                  <li>
                    <span>File name:</span> image.jpg
                  </li>
                  <li>
                    <span>File type:</span> image/jpeg
                  </li>
                  <li>
                    <span>File size:</span> 104KB
                  </li>
                  <li>
                    <span>Dimensions:</span> 500 by 442 pixels
                  </li>
                </ul>
                <form className="add-details">
                  <input
                    type="text"
                    className="form-control mb-15"
                    placeholder="Alternative Text"
                  />
                  <input
                    type="text"
                    className="form-control mb-15"
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    className="form-control mb-15"
                    placeholder="Caption"
                  />
                  <textarea
                    className="form-control mb-15"
                    placeholder="Description"
                  ></textarea>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="File URL: www.imagename.com"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="file-details-modal-footer">
          <button
            className="btn btn-sm btn-secondary me-2"
            onClick={closeModal}
          >
            Close
          </button>
          <button className="btn btn-sm btn-success">Update</button>
        </div>
      </div>
    </>
  );
};
export default FileDetailsModal;
