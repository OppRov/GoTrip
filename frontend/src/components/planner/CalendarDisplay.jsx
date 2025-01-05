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

import interactionPlugin from "@fullcalendar/interaction";
import { Tooltip, Box, Button } from "@mui/material";

export default function CalendarDisplay() {
  const calendarRef = useRef(null);
  const processingEventRef = useRef(false);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [selectedDate, setSelectedDate] = useState(null);

  const { planData, setPlanData } = useContext(planContext);
  const [newEndDate, setNewEndDate] = useState("");
  const [events, setEvents] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (planData.endDate) {
      const { endDate } = planData;
      const dataParts = endDate.split("-");
      const date = new Date(dataParts[0], dataParts[1] - 1, dataParts[2]);
      date.setDate(date.getDate() + 2);
      setNewEndDate(date.toISOString().split("T")[0]);
    }
  }, [planData]);

  useEffect(() => {
    if (!planData.startDate || !planData.endDate) return;
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;
    calendarApi.gotoDate(`${planData?.startDate}`);
  }, [planData, planData.endDate]);

  useEffect(() => {
    const calendar = calendarRef.current;
    if (calendar) {
      calendar.getApi().on("eventDragStart", () => {
        setIsDragging(true);
      });

      calendar.getApi().on("eventDragStop", (info) => {
        setIsDragging(false);

        // Check if event was dropped on disposal area
        const disposalArea = document.getElementById("event-disposal");
        if (disposalArea) {
          const rect = disposalArea.getBoundingClientRect();
          const { clientX, clientY } = info.jsEvent;

          if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
          ) {
            info.event.remove();
            setEvents((prev) =>
              prev.filter((event) => event.id !== info.event.id),
            );
          }
        }
      });
    }
  }, []);

  const handleEventReceive = (info) => {
    if (processingEventRef.current) {
      console.log("Already processing an event, skipping");
      return;
    }

    processingEventRef.current = true;
    console.log("Event receive triggered:", info.event.id);

    // Prevent the default behavior
    info.revert();

    // Check if event already exists
    const eventExists = events.some((event) => event.id === info.event.id);

    const droppedEvent = {
      id: eventExists ? `${info.event.id}_${Date.now()}` : info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: new Date(info.event.start.getTime() + 60 * 60 * 1000),
      extendedProps: info.event.extendedProps,
      allDay: false,
    };

    setEvents((prev) => [...prev, droppedEvent]);

    // Reset processing flag after a short delay
    setTimeout(() => {
      processingEventRef.current = false;
    }, 100);
  };

  const handleEventDrop = (info) => {
    setEvents((prev) => {
      const otherEvents = prev.filter((event) => event.id !== info.event.id);
      return [
        ...otherEvents,
        {
          id: info.event.id,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          extendedProps: info.event.extendedProps,
          allDay: false,
        },
      ];
    });
  };

  const renderEventContent = (eventInfo) => {
    const eventDetails = `
Address: ${eventInfo.event.extendedProps.address}
Time: ${eventInfo.event.start.toLocaleTimeString()} - ${eventInfo.event.end.toLocaleTimeString()}
    `.trim();

    return (
      <Tooltip
        title={eventDetails}
        arrow
        placement="top"
        enterDelay={200}
        sx={{
          fontSize: "14px",
          padding: "8px",
          maxWidth: "300px",
          whiteSpace: "pre-line",
        }}
      >
        <div style={{ padding: "2px 4px" }}>{eventInfo.event.title}</div>
      </Tooltip>
    );
  };

  const saveCalendarEvents = () => {
    // Filter out duplicates based on id
    const uniqueEvents = events.reduce((acc, current) => {
      const x = acc.find((item) => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    const calendarEvents = uniqueEvents.map((event) => ({
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      address: event.extendedProps?.address,
    }));

    const calendarData = {
      events: calendarEvents,
      totalEvents: calendarEvents.length,
      lastUpdated: new Date().toISOString(),
    };

    // console.log("Calendar Data:", calendarData);
    return calendarData;
  };

  const handleSave = () => {
    const savedData = saveCalendarEvents();
    console.log("Saved Data:", savedData);
    // Here you can:
    // 1. Send to an API
    // 2. Store in context
    // 3. Save to localStorage
    // etc.
  };

  const handleDateClick = (arg) => {
    // setSelectedDate(arg.date);
    setCurrentView("timeGridDay");

    // Get calendar API and go to that date
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(arg.date);
    calendarApi.changeView("timeGridDay");
  };

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[
          timeGridPlugin,
          dayGridPlugin,
          timelimePlugin,
          interactionPlugin,
        ]}
        droppable={true}
        editable={true}
        events={events}
        eventReceive={handleEventReceive}
        eventDrop={handleEventDrop}
        initialView={currentView}
        date={selectedDate}
        dateClick={handleDateClick}
        height={"100%"}
        aspectRatio={0.5}
        slotDuration={"01:00:00"}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridDay",
        }}
        views={{
          dayGridMonth: {
            // Month view settings
          },
          timeGridDay: {
            // Day view settings
          },
        }}
        allDaySlot={false}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: true,
        }}
        validRange={{
          start: `${planData.startDate}`, // Start date of the range
          end: newEndDate,
        }}
        defaultTimedEventDuration="01:00:00"
        eventDisplay="block"
        displayEventEnd={true}
        eventMaxStack={3}
        dayMaxEvents={true}
        displayEventTime={false}
        eventContent={renderEventContent}
        eventDragStart={() => {
          document.body.classList.add("event-dragging");
        }}
        eventDragStop={() => {
          document.body.classList.remove("event-dragging");
        }}
        dayCellDidMount={(info) => {
          info.el.addEventListener("mouseenter", () => {
            if (document.body.classList.contains("event-dragging")) {
              info.el.style.backgroundColor = "rgba(156, 204, 101, 0.2)";
            }
          });
          info.el.addEventListener("mouseleave", () => {
            info.el.style.backgroundColor = "";
          });
        }}
        slotLaneDidMount={(info) => {
          info.el.addEventListener("mouseenter", () => {
            if (document.body.classList.contains("event-dragging")) {
              info.el.style.backgroundColor = "rgba(156, 204, 101, 0.2)";
            }
          });
          info.el.addEventListener("mouseleave", () => {
            info.el.style.backgroundColor = "";
          });
        }}
      ></FullCalendar>

      {isDragging && (
        <Box
          id="event-disposal"
          sx={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            width: 200,
            height: 80,
            backgroundColor: "rgba(244, 67, 54, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            color: "white",
            transition: "all 0.3s ease",
            zIndex: 1000,
            border: "2px dashed white",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.9)",
              transform: "translateX(-50%) scale(1.05)",
            },
          }}
        >
          Drop here to delete
        </Box>
      )}
    </Box>
  );
}
