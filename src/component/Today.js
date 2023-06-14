import React, {useEffect} from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { Icon } from "@iconify/react";
import { MasterStore2, MasterStore3, TodayStore} from "./store/store.js";
import { MdEnergySavingsLeaf } from "react-icons/md";

// const GlobalStyle = createGlobalStyle`
//   *, *::before, *::after {
//     box-sizing: border-box;
//   }

//   body {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-family: "Helvetica", "Arial", sans-serif;
//     line-height: 1.5;
//   }
// `;

const TodayContainer = styled.div`
  width: 1500px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayLine = styled.div`
  display: flex;
  align-items: center;
  margin-left: 100px;
`;

const TodayLine2 = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;
`;

const TodayBox = styled.div`
  width: 300px;
  height: 450px;
  border: 4px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Yoyak = styled.h3`
font-family: 'Dosis', sans-serif
`

const Summary = styled.div`
font-size: 25px;
font-family: 'Tenada';
`

const SummaryContent = styled.div`
font-size: 20px;
margin-bottom: 20px;
`

const Today = (props) => {
  const { loggedId } = MasterStore2();
  const { loggedRealId } = MasterStore3();
  const { boxSwitch, setBoxSwitch, point, level, emission, setPoint, setLevel, setEmission, lastDate, setLastDate, point2, level2, emission2, setPoint2, setLevel2, setEmission2} = TodayStore();

  const today = new Date();
  const Olhae = today.getFullYear();
  const Ibundal = today.getMonth()+1;
  const Haru = today.getDate();
  const swticher = () => 
  {
    setBoxSwitch(!boxSwitch);
  }


  const getToday = async () => {
    try {
      
      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/carbonFootprints?userId=${loggedRealId}&year=${Olhae}`,
      {
        withCredentials: true,
      });
      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${loggedRealId}?userId=${loggedRealId}`,
      {
        withCredentials: true,
      });

      if(res1.data.data.length === 0)
      {
        setEmission("-");
        setPoint("-");
        setLevel(1);
      }
      else{
        let temp = [];
      console.log(res1.data.data.length);
      for(let i = 0; i < res1.data.data.length; i++)
      {
        if(res1.data.data[i].year === Olhae)
        {
          
          temp = res1.data.data[i];
          for(let i = 0; i < temp.monthList.length; i++)
      {
        console.log(temp.monthList[i].month);
        console.log(Ibundal);
        if(temp.monthList[i].month === Ibundal)
        {
          console.log(temp.monthList[i].month);
          temp = temp.monthList[i];
          for(let i = 0; i < temp.dayList.length; i++)
      {
        console.log(temp.dayList[i].day);
        console.log(Haru);
        if(temp.dayList[i].day === Haru)
        {
          setEmission(temp.dayList[i].emissions);
        }
        else{
          setEmission(0);
        }
      }
          
        }
        else
        {
          setEmission(0);
        }
      }
          
        }
        else{
          setEmission(0);
        }
      }
      setPoint(res2.data.data.point);
      setLevel(res2.data.data.level);
      console.log(res1.data);
      console.log(res2.data);
      }

      return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const getLast = async () => {
    try {
      
      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/carbonFootprints?userId=${loggedRealId}&year=${Olhae}`,
      {
        withCredentials: true,
      });
      const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${loggedRealId}?userId=${loggedRealId}`,
      {
        withCredentials: true,
      });

      console.log(res1);

      if(res1.data.data.length === 0)
      {
        setLastDate("-/-/-");
        setEmission2("-");
        setPoint2("-");
        setLevel2(1);
      }
      else{
        let yearArr = res1.data.data[res1.data.data.length - 1];
      console.log(yearArr);

      let year = yearArr.year;

      let monthArr = yearArr.monthList[yearArr.monthList.length - 1];
      console.log(monthArr);

      let month = monthArr.month;

      let dayArr = monthArr.dayList[monthArr.dayList.length - 1];
      console.log(dayArr);

      let day = dayArr.day;

      let fullDate = year + "/" + month + "/" + day;

      console.log(fullDate);

      setLastDate(fullDate);

      let lastEmission = dayArr.emissions;
      console.log(parseInt(lastEmission*10));
      setEmission2(parseInt(lastEmission*10));
      setPoint2(res2.data.data.point);
      console.log(res2.data.data);
      setLevel2(res2.data.data.level);
      }
      return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    getToday();
    getLast();
 },[])


  return (
    <>
      <TodayContainer>
          
          {boxSwitch === false ?
          <>
          <Yoyak> Today's Summary</Yoyak>
          <TodayLine>
          <TodayBox>
            <Summary><span style={{color: "blue"}}>LV</span></Summary>
            <SummaryContent><span style={{fontSize: "45px", fontFamily: 'Great Vibes',  fontWeight: "bold", background: "linear-gradient(to right top, blue, black)",  color: "transparent",  WebkitBackgroundClip: "text"}}>{level}</span></SummaryContent>
            <Summary>오늘의 <span style={{color: "blue"}}>절약량</span></Summary>
            <SummaryContent><span style={{color: "green", fontFamily: 'Dosis'}}>{emission}</span> <span style={{fontFamily: 'Dosis'}}>Co2</span> <span style={{position: "relative"}}><MdEnergySavingsLeaf style={{position: "absolute", marginTop: "4px"}}/></span></SummaryContent>
            <Summary>누적 <span style={{color: "blue"}}>포인트</span></Summary>
            <SummaryContent><span style={{color: "orange", fontFamily: 'Dosis'}}>{point}p</span></SummaryContent>
          </TodayBox><Icon
          onClick={swticher}
            icon="bi:arrow-right-circle-fill"
            style={{
              cursor: "pointer",
              width: "100px",
              fontSize: "40px",
              color: "blue",
            }}
          />
          </TodayLine>
          </>  : <>
          <Yoyak> Last Summary</Yoyak>
          <TodayLine2><Icon
          onClick={swticher}
            icon="bi:arrow-left-circle-fill"
            style={{
              cursor: "pointer",
              width: "100px",
              fontSize: "40px",
              color: "blue",
            }}
          /><TodayBox>
            <Summary><span style={{color: "blue"}}>LV</span></Summary>
            <SummaryContent><span style={{fontSize: "45px", fontFamily: 'Great Vibes',  fontWeight: "bold", background: "linear-gradient(to right top, blue, black)",  color: "transparent",  WebkitBackgroundClip: "text"}}>{level2}</span></SummaryContent>
            <Summary>{lastDate}의 <span style={{color: "blue"}}>절약량</span></Summary>
            <SummaryContent><span style={{color: "green", fontFamily: 'Dosis'}}>{emission2}</span> <span style={{fontFamily: 'Dosis'}}>Co2</span> <span style={{position: "relative"}}><MdEnergySavingsLeaf style={{position: "absolute", marginTop: "4px"}}/></span></SummaryContent>
            <Summary>누적 <span style={{color: "blue"}}>포인트</span></Summary>
            <SummaryContent><span style={{color: "orange", fontFamily: 'Dosis'}}>{point2}p</span></SummaryContent>
            </TodayBox></TodayLine2>
          </> }

      </TodayContainer>
    </>
  );
};

export default Today;
