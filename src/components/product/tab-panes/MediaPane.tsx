import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const MediaPane = () => {
  const onDropSingle = useCallback((acceptedFiles: File[]) => {
    // Handle the single file upload
    console.log(acceptedFiles);
  }, []);
  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
    isDragActive: isSingleDragActive,
  } = useDropzone({ onDrop: onDropSingle });

  return (
    <div className="row g-3">
      <div className="col-xxl-4 col-lg-5 col-sm-6 col-12">
        <div className="add-thumbnail product-image-upload">
          <div className="part-txt">
            <p className="mb-0">
              Add thumbnail <span>(jpeg/png)</span>
            </p>
          </div>
          <div {...getSingleRootProps()}>
            <input type="file" id="singleUpload" {...getSingleInputProps()} />
            {isSingleDragActive ? (
              <div className="jquery-uploader">
                <div className="jquery-uploader-preview-container">
                  <div className="jquery-uploader-select-card">
                    <div className="jquery-uploader-select">
                      <div className="upload-button">
                        <i className="fa-light fa-image"></i>
                        <br />
                        <a>Recommended: 800 * 800</a>
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
                        <i className="fa-light fa-image"></i>
                        <br />
                        <a>Recommended: 800 * 800</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-xxl-8 col-lg-7 col-sm-6 col-12">
        <div className="add-gallery-img product-image-upload">
          <div className="part-txt">
            <p className="mb-0">
              Add gallery <span>(jpeg/png)</span>
            </p>
          </div>
          <div {...getSingleRootProps()}>
            <input type="file" id="singleUpload" {...getSingleInputProps()} />
            {isSingleDragActive ? (
              <div className="jquery-uploader">
                <div className="jquery-uploader-preview-container">
                  <div className="jquery-uploader-select-card">
                    <div className="jquery-uploader-select">
                      <div className="upload-button">
                        <i className="fa-light fa-image"></i>
                        <br />
                        <a>Recommended: 800 * 800</a>
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
                        <i className="fa-light fa-image"></i>
                        <br />
                        <a>Recommended: 800 * 800</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPane;
