const NotificationTabPane = () => {
  return (
    <ul className="notification-dropdown border-top mt-4">
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1 text-primary">
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
          <span className="fw-medium">Archer</span> Likes your post
        </div>
      </li>
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar-2.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1 text-success">
            <i className="fa-solid fa-comment-dots"></i>
          </span>
          <span className="fw-medium">Cody</span> Commented on your post
        </div>
      </li>
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar-3.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1">
            <i className="fa-solid fa-share"></i>
          </span>
          <span className="fw-medium">Zane</span> Shared your post
        </div>
      </li>
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar-4.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1 text-primary">
            <i className="fa-solid fa-thumbs-up"></i>
          </span>
          <span className="fw-medium">Christopher</span> Likes your post
        </div>
      </li>
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar-5.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1 text-success">
            <i className="fa-solid fa-comment-dots"></i>
          </span>
          <span className="fw-medium">Charlie</span> Commented on your post
        </div>
      </li>
      <li className="d-flex align-items-center gap-20 py-3 border-bottom">
        <div className="avatar">
          <img src="/img/bg-img/avatar-6.png" alt="image" />
        </div>
        <div className="notification-txt fs-14">
          <span className="notification-icon me-1">
            <i className="fa-solid fa-share"></i>
          </span>
          <span className="fw-medium">Jayden</span> Shared your post
        </div>
      </li>
    </ul>
  );
};
export default NotificationTabPane;
