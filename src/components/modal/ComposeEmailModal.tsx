import { useState } from "react";
import { toggleComposeMailModalClose } from "../../redux/features/composeMailModalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import DynamicEditor from "../editor/DynamicEditor";

const ComposeEmailModal = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(
    (state) => state.composeMailModal.isModalOpen
  );
  const closeModal = () => {
    dispatch(toggleComposeMailModalClose());
  };
  const [maxSize, setMaxSize] = useState<boolean>(false);
  const toggleMax = () => {
    setMaxSize(!maxSize);
  };
  return (
    <>
      <div
        className={`ar-modal-overlay ${activeModal ? "active" : ""} `}
        role="button"
        onClick={closeModal}
      ></div>

      <div
        className={`compose-mail ${activeModal ? "open" : ""} ${
          maxSize ? "maximize-modal" : ""
        }`}
      >
        <div className="panel border">
          <div className="panel-header">
            <h5>New Message</h5>
            <div className="btn-box">
              <button
                className="btn btn-sm btn-icon btn-light"
                id="minimizeComposeMail"
                onClick={closeModal}
              >
                <i className="fa-light fa-minus"></i>
              </button>
              <button
                className="btn btn-sm btn-icon btn-light d-xl-inline-block d-none mx-1"
                onClick={toggleMax}
              >
                <i className="fa-light fa-arrow-up-right-and-arrow-down-left-from-center"></i>
              </button>
              <button
                className="btn btn-sm btn-icon btn-light ms-1 ms-lg-0"
                onClick={closeModal}
              >
                <i className="fa-light fa-xmark"></i>
              </button>
            </div>
          </div>
          <div className="panel-body">
            <form>
              <div className="d-flex gap-2 mb-15">
                <input
                  type="email"
                  className="form-control "
                  placeholder="To"
                />
                <a role="button" className="btn btn-sm btn-light add-cc">
                  cc
                </a>
                <a role="button" className="btn btn-sm btn-light add-bcc">
                  bcc
                </a>
              </div>
              <input
                type="text"
                className="form-control  mb-15 d-none input-cc"
                placeholder="Cc"
              />
              <input
                type="text"
                className="form-control  mb-15 d-none input-bcc"
                placeholder="Bcc"
              />
              <input
                type="text"
                className="form-control  mb-15"
                placeholder="Subject"
              />
              <div className="editor">
                <DynamicEditor />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button
                  type="reset"
                  className="btn btn-sm btn-outline-danger"
                  onClick={closeModal}
                >
                  Discard
                </button>
                <button className="btn btn-sm btn-primary" onClick={closeModal}>
                  Send <i className="fa-light fa-paper-plane-top"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComposeEmailModal;
