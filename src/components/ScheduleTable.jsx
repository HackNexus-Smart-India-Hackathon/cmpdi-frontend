import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventsList = [
  {
    title: "Team Meeting",
    start: new Date(),
    end: new Date(),
    allDay: false,
  },
];

const EventScheduler = () => {
  const [events, setEvents] = useState(eventsList);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter the event title:");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "black",
        color: "white",
        borderRadius: "5px",
        border: "none",
        display: "block",
        padding: "5px",
      },
    };
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-black mb-4">Event Scheduler</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        className="bg-white border-black border"
      />
    </div>
  );
};

export default EventScheduler;
