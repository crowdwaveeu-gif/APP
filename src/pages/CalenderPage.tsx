import { useCallback, useEffect, useRef, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../data/event-data";
import { toast } from "react-toastify";
import { EventApi as FullCalendarEvent } from "@fullcalendar/core";
import { EventApi } from "../types";
import ReservedEvents from "../components/calender/ReservedEvents";
import UpcomingEvents from "../components/calender/UpcomingEvents";
import EventModal from "../components/modal/EventModal";
import DeleteConfirmationModal from "../components/modal/DeleteConfirmationModal";

const CalenderPage = () => {
  const [currentEvents, setCurrentEvents] = useState(INITIAL_EVENTS);
  const calendarRef = useRef<FullCalendar>(null);
  const calendarElRef = useRef<HTMLDivElement>(null); // Ref for the calendar's root element
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [addNewEventModal, setAddNewEventModal] = useState(false);

  const handleSaveEvent = (title: string, category: string) => {
    if (!title || title.trim() === "") {
      toast.error("Event title is required!");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date for the event!");
      return;
    }

    const newEvent: EventApi = {
      id: createEventId(),
      title,
      start: new Date(selectedDate).toISOString(), // Ensure 'start' is a Date
      classNames: [category], // Wrap category in an array
      allDay: true,
      extendedProps: {
        category,
      },
    };

    setCurrentEvents((prevEvents) => [...prevEvents, newEvent]);

    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.addEvent(newEvent);
      toast.success("A new event is created!");
    }

    setAddNewEventModal(false); // Close the addNewEventModal after event is saved
  };
  const handleCloseEventModal = () => {
    setSelectedEvent(null);
    setAddNewEventModal(false);
  };

  const handleCloseConfirmationModal = () => {
    setDeleteConfirmationModal(false);
  };

  const handleDateSelect = useCallback((selectInfo: any) => {
    setSelectedDate(selectInfo.startStr); // Assuming 'startStr' exists, adjust if not
    setAddNewEventModal(true); // Open the addNewEventModal when date is selected
  }, []);

  const handleEventClick = useCallback((clickInfo: any) => {
    // Adjust argument type based on library's definition
    setSelectedEvent(clickInfo.event);
    setDeleteConfirmationModal(true);
  }, []);

  const handleDelete = () => {
    if (selectedEvent) {
      const selectedEventId = selectedEvent.id;
      setCurrentEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== selectedEventId)
      );
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi?.getEventById(selectedEventId)?.remove(); // Remove the event from the calendar
        setDeleteConfirmationModal(false); // Close the confirmation modal
        toast.warning("The selected event deleted!");
      } else {
        console.warn("Calendar reference is not yet available!");
      }
    } else {
      console.warn("Selected event is missing!");
    }
  };
  const handleEventsSet = (events: FullCalendarEvent[]) => {
    // Map FullCalendar events to your EventApi interface
    const formattedEvents: EventApi[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      start:
        typeof event.start === "string"
          ? new Date(event.start)
          : event.start || "", // Convert start to Date or empty string
      classNames: event.classNames as string[], // Cast classNames to string[]
      allDay: event.allDay || false, // Provide a default value if allDay is undefined
      extendedProps: event.extendedProps
        ? { category: event.extendedProps.category }
        : undefined,
    }));

    setCurrentEvents(formattedEvents);
  };
  useEffect(() => {
    if (calendarElRef.current) {
      const observer = new ResizeObserver((entries) => {
        const [entry] = entries;
        if (entry.contentRect.height) {
          calendarRef.current?.doResize();
        }
      });
      observer.observe(calendarElRef.current);

      return () => observer.disconnect();
    }
  }, [calendarElRef]);
  return (
    <div className="row g-4">
      <div className="col-xl-9 ">
        <div className="panel">
          <div className="panel-body">
            <div id="calendar" ref={calendarElRef}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="dayGridMonth"
                selectable={true}
                editable={true}
                initialEvents={INITIAL_EVENTS}
                locales={allLocales}
                locale="bd"
                select={handleDateSelect}
                eventClick={handleEventClick}
                droppable={true}
                dayMaxEvents={true}
                selectMirror={true}
                eventsSet={handleEventsSet}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-3 calendar-sidebar">
        <ReservedEvents />
        <UpcomingEvents currentEvents={currentEvents} />
      </div>
      <EventModal
        show={addNewEventModal}
        handleClose={handleCloseEventModal}
        handleSaveEvent={handleSaveEvent}
      />
      <DeleteConfirmationModal
        show={deleteConfirmationModal}
        handleClose={handleCloseConfirmationModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};
export default CalenderPage;
