import "./Calendar.css";
import { Container } from "@mui/material";

import EventElement from "./EventElement";
import { SlArrowDown } from "react-icons/sl";
import CalendarHeader from "./CalendarHeader";
import { useCalendarContext } from "../../hooks/useCalendarContext";
import { useEventsContext } from "../../hooks/useEventsContext";
import { EventModal } from "../Modal/EventModal/EventModal";
import { useState } from "react";
import { EventDetailModal } from "../Modal/EventDetailModal/EventDetailModal";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import styled from "@emotion/styled";
let currentEvent = {
  date: dayjs(),
};

const StyledEventButton = styled(Button)({
  fontFamily: "Segoe UI",
  fontWeight: 400,
  color: "white",
  backgroundColor: "#2a3d71",
  width: "10vh",
  borderRadius: "1vh",
  marginLeft: "1vh",
  marginBottom: "1vh",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#343537",
  },
});

const Calendar = () => {
  const [isEventModalOpen, setIsEventModal] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    month,
    year,
    calendarDays,
    getWeekDays,
    goToPreviousWeek,
    goToNextWeek,
    nextMonthDays,
    goToPreviousMonth,
    goToNextMonth,
    previousMonthDays,
    isMonthVisible,
    handleButtonClick,
    getEvents,
    subscribeEvent,
    unsubscribeEvent,
    event,
    setEvent,
  } = useCalendarContext();

  const { events } = useEventsContext();

  const handleEventClick = (event) => {
    setEvent(event);
    setIsDetailModalOpen(!isDetailModalOpen);
  };

  const handleEventButtonClick = (clickedDate) => {
    setIsEventModal(true);
    setSelectedDate(clickedDate);
  };

  return (
    <Container>
      <div className="calendar-app-container">
        <div className="calendar">
          {isMonthVisible ? (
            <div>
              <CalendarHeader
                onClickArrowLeft={goToPreviousMonth}
                onClickArrowRight={goToNextMonth}
              />
              <div className="calendar-field">
                <div className="calendar-dates">
                  {previousMonthDays.map((day) => (
                    <div className="calendar-date previous-month">{day}</div>
                  ))}

                  {calendarDays.map((day, index) => {
                    const dayEvents = getEvents(day, month, year, events);

                    return (
                      <div key={index} className="calendar-date">
                        <div key={day}>{day}</div>
                        {dayEvents.length > 1 ? (
                          <div>
                            <EventElement
                              key={0}
                              event={dayEvents[0]}
                              handleEventClick={handleEventClick}
                              handleSubscribeClick={subscribeEvent}
                              handleUnsubscribeClick={unsubscribeEvent}
                            />
                            <span
                              onClick={handleButtonClick}
                              className="Calendar-MoreEvents"
                            >
                              +{dayEvents.length - 1} weitere Events
                            </span>
                          </div>
                        ) : (
                          dayEvents.map((event, index) => (
                            <EventElement
                              key={index}
                              event={event}
                              handleEventClick={handleEventClick}
                              handleSubscribeClick={subscribeEvent}
                              handleUnsubscribeClick={unsubscribeEvent}
                            />
                          ))
                        )}
                      </div>
                    );
                  })}

                  {nextMonthDays.map((day) => (
                    <div className="calendar-date next-month">{day}</div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <CalendarHeader
                onClickArrowLeft={goToPreviousWeek}
                onClickArrowRight={goToNextWeek}
              />
              <div>
                <div className="calendar-weeks">
                  {getWeekDays().map((day) => (
                    <div key={day.toISOString()}>
                      <div className="calendar-dateWeek">
                        {day.getDate()}
                        <StyledEventButton
                          onClick={() => handleEventButtonClick(day)}
                        >
                          + Gericht
                        </StyledEventButton>
                        <div className="Calendar-EventsContainer">
                          {getEvents(day.getDate(), month, year, events).map(
                            (event, index) => (
                              <EventElement
                                key={index}
                                event={event}
                                handleEventClick={handleEventClick}
                                handleSubscribeClick={subscribeEvent}
                                handleUnsubscribeClick={unsubscribeEvent}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="calendar-btn-container">
            <button className="calendar-btn week" onClick={handleButtonClick}>
              <SlArrowDown />
            </button>
          </div>
        </div>
        <EventModal
          dates={selectedDate}
          isOpen={isEventModalOpen}
          setIsOpen={setIsEventModal}
          event={event}
        ></EventModal>
        <EventDetailModal
          isOpen={isDetailModalOpen}
          setIsOpen={setIsDetailModalOpen}
          event={event}
          handleSubscribeClick={subscribeEvent}
          handleUnsubscribeClick={unsubscribeEvent}
          setEvent={setEvent}
        ></EventDetailModal>
      </div>
    </Container>
  );
};

export default Calendar;
