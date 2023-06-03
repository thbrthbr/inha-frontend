import React from "react";
import "./_styles.scss";
import { Icon } from "@iconify/react";
import {
  format,
  parse,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
} from "date-fns";
import styled from "styled-components";
import { calenderStore } from "../store/store.js";

const CalendarContainer = styled.div`
  width: 1500px;
  height: 600px;
  display: flex;
  justify-content: center;
`;

const RenderHeader = (props) => {
  const { prevMonth, nextMonth, currentMonth } = calenderStore();

  return (
    <div>
      <div style={{ width: "20px", height: "15px" }}></div>
      <div className="header row">
        <div className="col col-first">
          <span className="text">
            <span className="text month">{format(currentMonth, "M")}월</span>
            {format(currentMonth, "yyyy")}
          </span>
        </div>
        <div className="col col-center"></div>
        <div className="col col-end">
          <Icon
            icon="bi:arrow-left-circle-fill"
            style={{ color: "#F2D7D9" }}
            onClick={prevMonth}
          />
          <Icon
            icon="bi:arrow-right-circle-fill"
            style={{ color: "#F2D7D9" }}
            onClick={nextMonth}
          />
        </div>
      </div>
    </div>
  );
};

const RenderDays = () => {
  const days = [];
  const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col" key={i}>
        {date[i]}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
};

const RenderCells = () => {
  const { currentMonth, selectedDate, setSelectedDate } = calenderStore();

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      formattedDate = format(day, "d");
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : format(currentMonth, "M") !== format(day, "M")
              ? "not-valid"
              : "valid"
          }`}
          key={day}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            cursor: "pointer",
            // backgroundColor:
            //   formattedDataForDiary === format(new Date(), "MM/dd/yy") &&
            //   "#FFE7CC",
          }}
          id={cloneDay}
          onClick={() => {
            setSelectedDate(parse(cloneDay));
            console.log(parse(cloneDay));
          }}
        >
          <span
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? "text not-valid"
                : ""
            }
          >
            {formattedDate}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
};

export const FullCalendar = () => {
  return (
    <CalendarContainer>
      <div className="calendar" style={{ width: "800px", height: "500px" }}>
        <RenderHeader />
        <RenderDays />
        <RenderCells />
      </div>
    </CalendarContainer>
  );
};
