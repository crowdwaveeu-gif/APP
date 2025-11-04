const JobViewCard = () => {
  return (
    <div className="card hrm-card purple-bg">
      <p className="text-white">Job View</p>
      <h2 className="text-white">
        3,342
        <span className="per-text">
          <svg
            fill="none"
            height="15"
            viewBox="0 0 14 15"
            width="14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83169 6.57485L8.16502 8.90819L11.4941 5.5791L12.8317 6.91669V3.41669H9.33169L10.6693 4.75427L8.16502 7.25852L5.83169 4.92519L1.33594 9.42094L2.16077 10.2458L5.83169 6.57485Z"
              fill="white"
            />
          </svg>
          20.0%
        </span>
      </h2>
      <p className="text-white mb-0">Viewers</p>
    </div>
  );
};
export default JobViewCard;
