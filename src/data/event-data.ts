import { EventApi } from "../types";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
export const createEventId = () => String(eventGuid++);
export const INITIAL_EVENTS: EventApi[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
    classNames: ["bg-info"],
  },
  {
    id: createEventId(),
    title: "Timed event",
    start:
      new Date(new Date().setDate(new Date().getDate() + 3))
        .toISOString()
        .split("T")[0] + "T12:00:00",
    classNames: ["bg-primary"],
  },
  {
    id: createEventId(),
    title: "Meeting",
    start: new Date(new Date().setDate(new Date().getDate() + 4))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-danger"],
  },
  {
    id: createEventId(),
    title: "Conference",
    start: new Date(new Date().setDate(new Date().getDate() + 7))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-warning"],
  },
  {
    id: createEventId(),
    title: "Team outing",
    start: new Date(new Date().setDate(new Date().getDate() + 10))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-info"],
  },
  {
    id: createEventId(),
    title: "Workout",
    start: new Date(new Date().setDate(new Date().getDate() - 9))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-success"],
  },
  {
    id: createEventId(),
    title: "Tour",
    start: new Date(new Date().setDate(new Date().getDate() + 12))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-info"],
  },
  {
    id: createEventId(),
    title: "Online Meeting",
    start: new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-warning"],
  },
  {
    id: createEventId(),
    title: "Perfomance Review",
    start: new Date(new Date().setDate(new Date().getDate() - 10))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-info"],
  },
  {
    id: createEventId(),
    title: "Work Schedule",
    start: new Date(new Date().setDate(new Date().getDate() - 12))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-success"],
  },
  {
    id: createEventId(),
    title: "Spa",
    start: new Date(new Date().setDate(new Date().getDate() - 14))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-info"],
  },
  {
    id: createEventId(),
    title: "Concert",
    start: new Date(new Date().setDate(new Date().getDate() - 16))
      .toISOString()
      .replace(/T.*$/, ""),
    classNames: ["bg-primary"],
  },
  // Add more initial events as needed
];
