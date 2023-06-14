import React, {useEffect} from "react";
import "./_styles.scss";
import { Icon } from "@iconify/react";
import { MdEnergySavingsLeaf } from "react-icons/md";
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
import { calenderStore, MasterStore3 } from "../store/store.js";
import axios from "axios";


const CalendarContainer = styled.div`
  width: 1500px;
  height: 450px;
  display: flex;
  justify-content: center;
  margin-top: -10px;
`;

const CellList = styled.ul`
list-style: none;
`



const RenderHeader = (props) => {
  const { prevMonth, nextMonth, currentMonth } = calenderStore();
  // const {loggedId} = MasterStore2();

  return (
    <div>
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
            style={{ color: "blue" }}
            onClick={prevMonth}
          />
          <Icon
            icon="bi:arrow-right-circle-fill"
            style={{ color: "blue" }}
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
  const { currentMonth, selectedDate, setSelectedDate, data, setData, setRow, row } = calenderStore();

  const {loggedRealId} = MasterStore3();

  const carbonData = async () => {
    try {
      let dataArr = []; 
      const thisYear = new Date;
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/carbonFootprints?userId=${loggedRealId}&year=${thisYear.getFullYear()}`,
      {
        withCredentials: true,
      });

      for(let i = 0; i < res.data.data.length; i++)
    {
      if(res.data.data[i].year == format(currentMonth, "yyyy"))
      {
        for(let j = 0; j < res.data.data[i].monthList.length; j++)
        {
          if(res.data.data[i].monthList[j].month == parseInt(format(currentMonth, "MM")))
          {
            dataArr = res.data.data[i].monthList[j];
          }
          else{
            dataArr = [];
          }
        }
      }
      else{
        dataArr = [];
      }
    }
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
            // onClick={() => {
            //   setSelectedDate(parse(cloneDay));
            //   console.log(parse(cloneDay));
            // }}
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
              <CellList>
                {dataArr.length !== 0 && 
                (dataArr.dayList.map((dayData) => {
                  if(dayData.day == day.getDate())
                  {
                    let modify = parseInt(dayData.emissions*10);
                    return <div><div style={{color: "green"}}>-{dayData.emissions.toFixed(1)}Co2<MdEnergySavingsLeaf style={{position: "absolute", marginTop: "2px"}}/></div><div style={{color: "orange"}}>+{modify}p</div></div>
                  }
                }))
                }
              </CellList>
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
    setRow(rows);
    return <div className="body">{rows}</div>;

    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    carbonData();
 },[currentMonth])

 return <div className="body">{row}</div>;
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
