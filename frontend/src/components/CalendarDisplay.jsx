import * as React from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";

export default function CalendarDisplay() {
  const [visibleRange, setVisibleRange] = useState({
    start: new Date(),
    end: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  });

  return (
    <FullCalendar
      plugins={[timeGridPlugin, dayGridPlugin]}
      initialView="timeGridWeek"
      height={"100%"}
      aspectRatio={0.5}
      visibleRange={visibleRange}
      slotDuration={"00:60:00"}
      events={[
        { title: "event 1", date: "2024-12-01" },
        { title: "event 2", date: "2024-12-02" },
      ]}
      views={{
        timeGridWeek: {
          type: "timeGrid",
          duration: { days: 3 },
        },
      }}
    ></FullCalendar>
  );
}
