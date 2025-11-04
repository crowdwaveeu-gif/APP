import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleUploadFileModalClose } from "../../redux/features/uploadFileModalSlice";

const UploadFileModal = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(
    (state) => state.uploadFileModal.isModalOpen
  );

  const closeModal = () => {
    dispatch(toggleUploadFileModalClose());
  };
  const onDropMultiple = useCallback((acceptedFiles: File[]) => {
    // Handle the multiple file upload
    console.log(acceptedFiles);
  }, []);

  const {
    getRootProps: getMultipleRootProps,
    getInputProps: getMultipleInputProps,
    isDragActive: isMultipleDragActive,
  } = useDropzone({ onDrop: onDropMultiple, multiple: true });
  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div className={`upload-modal-container ${activeModal ? "active" : ""}`}>
        <div className="upload-modal-header">
          <h3>Upload File</h3>
        </div>
        <div className="upload-modal-body">
          <div
            className={`card-body ${
              isMultipleDragActive ? "dropzone-active" : ""
            }`}
            {...getMultipleRootProps()}
          >
            <form
              action="/file-upload"
              className="dropzone dz-component"
              id="file-manager-upload"
            >
              <input {...getMultipleInputProps()} />
              {isMultipleDragActive ? (
                <div className="dz-default dz-message">
                  <button className="dz-button" type="button">
                    <i className="fa-light fa-cloud-arrow-up"></i>
                    <span>Drop a file here or click to upload</span>
                  </button>
                </div>
              ) : (
                <div className="dz-default dz-message">
                  <button className="dz-button" type="button">
                    <i className="fa-light fa-cloud-arrow-up"></i>
                    <span>Drop a file here or click to upload</span>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="upload-modal-footer">
          <button onClick={closeModal} className="btn btn-secondary me-2">
            Close
          </button>
          <button className="btn btn-success">Upload</button>
        </div>
      </div>
    </>
  );
};
export default UploadFileModal;
