import * as React from "react";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import timelimePlugin from "@fullcalendar/timeline";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { useContext } from "react";
import { planContext } from "../../contexts/planContext";
import { use } from "react";

export default function CalendarDisplay() {
  const calendarRef = useRef(null);

  const { planData } = useContext(planContext);

  useEffect(() => {
    if (!planData.startDate || !planData.endDate) return;
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;
    calendarApi.gotoDate(`${planData?.startDate}`);
  }, [planData, planData.endDate]);

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, dayGridPlugin, timelimePlugin]}
      initialView="dayGridMonth"
      initialDate={Date.now()}
      height={"100%"}
      aspectRatio={0.5}
      slotDuration={"00:60:00"}
      headerToolbar={{
        center: "dayGridMonth,timeGridDay",
        right: "prev,next",
      }}
      allDaySlot={false}
      slotLabelFormat={{
        hour: "numeric",
        minute: "2-digit",
        omitZeroMinute: false,
        meridiem: true,
      }}
      // customButtons={{
      //   cPrev: {
      //     text: "Previous",
      //     click: () => {
      //       const calendarApi = calendarRef.current?.getApi();
      //       if (!calendarApi) return;
      //       calendarApi.prev();
      //     },
      //   },
      //   cNext: {
      //     text: "Next",
      //     click: () => {
      //       const calendarApi = calendarRef.current?.getApi();
      //       if (!calendarApi) return;
      //       calendarApi.next();
      //     },
      //   },
      // }}
      // views={{
      //   timeGridWeek: {
      //     type: "timeGrid",
      //     duration: { days: 3 },
      //   },
      // }}
      validRange={{
        start: `${planData.startDate}`, // Start date of the range
        end: `${planData.endDate}`, // End date of the range
      }}
    ></FullCalendar>
  );
}
