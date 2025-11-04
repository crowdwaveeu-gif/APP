import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleExpandMailModal } from "../../redux/features/expandMailModalSlice";

type Props = {
  closeModal: () => void;
};
interface DetailsState {
  msg1: boolean;
  msg2: boolean;
}
const EmailDetails = ({ closeModal }: Props) => {
  const dispatch = useAppDispatch();
  const toggleModal = () => {
    dispatch(toggleExpandMailModal());
  };
  const activeModal = useAppSelector(
    (state) => state.expandMailModal.isModalOpen
  );
  const [openDetails, setOpenDetails] = useState<DetailsState>({
    msg1: false,
    msg2: true,
  });

  const toggleDetails = (key: keyof DetailsState) => {
    setOpenDetails((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };
  return (
    <div className="mail-details">
      <div className="mail-body-top d-flex justify-content-between align-items-center mb-10">
        <div className="left d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-icon btn-outline-danger close-mail"
            onClick={closeModal}
          >
            <i className="fa-light fa-xmark"></i>
          </button>
          <span className="badge bg-secondary p-1 rounded">Inbox</span>
        </div>
        <div className="right d-flex align-items-center gap-3">
          <button className="btn-flush">
            <i className="fa-light fa-print"></i>
          </button>
          <button className="btn-flush expandReply" onClick={toggleModal}>
            <i
              className={
                activeModal ? "fa-light fa-compress" : "fa-light fa-expand"
              }
            ></i>
          </button>
        </div>
      </div>
      <div className="mail-conversation">
        <OverlayScrollbarsComponent
          className="scrollable"
          options={{ scrollbars: { autoHide: "scroll" } }}
        >
          <div className="single-mail">
            <div
              className="mail-top"
              role="button"
              onClick={() => toggleDetails("msg1")}
            >
              <div className="mail-profile">
                <div className="avatar">
                  <img src="./img/bg-img/avatar-2.png" alt="Image" />
                </div>
                <div className="part-txt">
                  <span className="name">Amelie Harris</span>
                  <span className="mail">amelianda@example.com</span>
                </div>
              </div>
              <div className="mail-action">
                <span className="date">
                  Jan 25,{" "}
                  <span className="d-sm-inline-block d-none">
                    2023 , 8:24 PM
                  </span>
                </span>
                <button className="btn-star">
                  <i className="fa-solid fa-star"></i>
                </button>
              </div>
            </div>
            <div
              className={`mail-body ${openDetails.msg1 ? "d-block" : "d-none"}`}
            >
              <p>Dear Sanoar Vai,</p>
              <p>
                As discussed with you over phone. It would be very helpful for
                me to handle audits if I can enter holidays separately. Please
                get back to me for further explanation.
              </p>
              <p>Regards,</p>
              <p>Farhad Reza</p>
              <p>Assistant Manager I HR & Compliance</p>
            </div>
          </div>
          <div className="single-mail">
            <div
              className="mail-top"
              role="button"
              onClick={() => toggleDetails("msg2")}
            >
              <div className="mail-profile">
                <div className="avatar">
                  <img src="./img/bg-img/avatar-2.png" alt="Image" />
                </div>
                <div className="part-txt">
                  <span className="name">Amelie Harris</span>
                  <span className="mail">amelianda@example.com</span>
                </div>
              </div>
              <div className="mail-action">
                <span className="date">
                  Jan 25,{" "}
                  <span className="d-sm-inline-block d-none">
                    2023 , 8:24 PM
                  </span>
                </span>
                <button className="btn-star">
                  <i className="fa-solid fa-star"></i>
                </button>
              </div>
            </div>
            <div
              className={`mail-body ${openDetails.msg2 ? "d-block" : "d-none"}`}
            >
              <p>Dear Sanoar Vai,</p>
              <p>
                As discussed with you over phone. It would be very helpful for
                me to handle audits if I can enter holidays separately. Please
                get back to me for further explanation.
              </p>
              <p>Regards,</p>
              <p>Farhad Reza</p>
              <p>Assistant Manager I HR & Compliance</p>
            </div>
          </div>
        </OverlayScrollbarsComponent>
      </div>
      <div className="mail-reply-option">
        <div className="mail-reply d-none">
          <form>
            <input
              type="email"
              className="form-control  mb-15"
              placeholder="To"
              value="amelianda@example.com"
              readOnly
            />
            <div className="editor"></div>
            <div className="btn-box d-flex justify-content-end">
              <button className="btn btn-sm btn-primary">
                Send
                <i className="fa-light fa-paper-plane-top"></i>
              </button>
            </div>
          </form>
        </div>
        <div className="btn-box gap-2 justify-content-end">
          <button className="btn btn-sm btn-primary reply-mail-btn">
            Reply
          </button>
          <button className="btn btn-sm btn-primary">Forward</button>
        </div>
      </div>
    </div>
  );
};
export default EmailDetails;
