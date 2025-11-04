import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";

const ComingSoonPage2 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-31T00:00:00") - +new Date();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0"
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24)
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0"
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content p-0">
        <div className="panel coming-soon-panel coming-soon-panel-2">
          <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="part-img">
              <img src="/img/bg-img/coming-soon-2.png" alt="coming-soon" />
            </div>
            <div className="part-txt">
              <ul className="countdown">
                <li>
                  <span className="days">{timeLeft.days}</span>
                  <p className="days_text">Days</p>
                </li>
                <li className="seperator">:</li>
                <li>
                  <span className="hours">{timeLeft.hours}</span>
                  <p className="hours_text">Hours</p>
                </li>
                <li className="seperator">:</li>
                <li>
                  <span className="minutes">{timeLeft.minutes}</span>
                  <p className="minutes_text">Minutes</p>
                </li>
                <li className="seperator">:</li>
                <li>
                  <span className="seconds">{timeLeft.seconds}</span>
                  <p className="seconds_text">Seconds</p>
                </li>
              </ul>
              <Link to="/" className="btn btn-primary">
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ComingSoonPage2;
