import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { chatHistoryList } from "../../data";

const MessageList = () => {
  return (
    <div className="panel-body message-list">
      <OverlayScrollbarsComponent className="scrollable">
        {chatHistoryList.map((item) => (
          <div
            className={`single-message ${item.seen ? "" : "unread"}`}
            key={item.id}
          >
            <div className="avatar">
              <img src={item.img} alt="User" />
              <span
                className={`active-status ${item.active ? "active" : ""}`}
              ></span>
            </div>
            <div className="part-txt">
              <div className="top">
                <span className="user-name">{item.name}</span>
                <span className="msg-time">{item.msgTime}.</span>
              </div>
              <div className="msg-short">
                <span>{item.msg}</span>
              </div>
            </div>
          </div>
        ))}
      </OverlayScrollbarsComponent>
    </div>
  );
};
export default MessageList;
