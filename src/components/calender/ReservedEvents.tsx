import { Draggable } from "@fullcalendar/interaction/index.js";
import { useEffect, useRef } from "react";

const ReservedEvents = () => {
  const externalEventsContainerRef = useRef(null);
  const draggableInstanceRef = useRef<Draggable | null>(null); // Specify the type explicitly

  useEffect(() => {
    const externalEventsContainer = externalEventsContainerRef.current;
    if (!externalEventsContainer) return;

    // Destroy the existing draggable instance if it exists
    if (draggableInstanceRef.current) {
      draggableInstanceRef.current.destroy();
    }

    // Create a new Draggable instance
    const draggable = new Draggable(externalEventsContainer, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const title = eventEl.innerText;
        return {
          title,
        };
      },
    });

    // Store the reference to the Draggable instance
    draggableInstanceRef.current = draggable;

    // Cleanup function
    return () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.destroy();
      }
    };
  }, []); // Make sure this effect runs only once

  return (
    <div className="panel mb-4">
      <div className="panel-header">
        <h5>Reserved Event</h5>
      </div>
      <div className="panel-body">
        <div
          id="external-events"
          className="sidebar-event-list"
          ref={externalEventsContainerRef}
        >
          <div className="fc-event">My Event 1</div>
          <div className="fc-event">My Event 2</div>
          <div className="fc-event">My Event 3</div>
          <div className="fc-event">My Event 4</div>
          <div className="fc-event">My Event 5</div>
        </div>
      </div>
    </div>
  );
};

export default ReservedEvents;
