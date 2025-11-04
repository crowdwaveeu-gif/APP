import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const TimelineCard = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="card-five full-height pb-0 bg-white box-card">
      <div className="calendar-area">
        <div className="card-header-five">
          <h3 className="card-title">Timeline</h3>
          <div className="event-btn">
            <a href="#">Add event +</a>
          </div>
        </div>

        <div id="calendar">
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>
    </div>
  );
};
export default TimelineCard;
