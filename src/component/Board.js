import React, { useEffect, useState, Suspense } from "react";
import { GlobalStyle } from "./noScroll.js";
import { BsMegaphone } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
// import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components";
import axios from "axios";
import {
  ChannelStore,
  ProfileStore,
  MasterStore2,
  MasterStore3,
} from "./store/store.js";
import assemble2 from "./img/assemble2.jpg";
import assemble1 from "./img/assemble1.jpg";
import arrow from "./img/right_arrow.png";
import PacmanLoader from "react-spinners/PacmanLoader";
import qs from "qs";

const Container = styled.div`
  width: 1500px;
  height: 500px;
  display: flex;
  justify-content: center;
`;

const BoardBox = styled.div`
  // border: 0.5px solid #c0c0c0;
  height: 600px;
  width: 1048px;
  margin-left: 10px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: colmun;
  justify-content: center;
`;

const Searchbar = styled.input`
  margin-left: 20px;
  border: none;
  background-color: #eeeeee;
  margin-bottom: 10px;
  margin-right: 20px;
  height: 20px;
`;

const Searchbar2 = styled.input`
  border: none;
  background-color: #eeeeee;
  margin-bottom: 10px;
  height: 20px;
`;

const ChannelBox = styled.div`
  position: relative;
  height: 500px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Channel = styled.div`
  border: 0.5px solid orange;
  padding: 20px;
  border-radius: 30px;
  height: 150px;
  width: 1000px;
  // margin-left: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Channel2 = styled.div`
  border: 0.5px solid blue;
  padding: 20px;
  border-radius: 30px;
  height: 150px;
  width: 1000px;
  // margin-left: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChannelFirstRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 20px;
  width: 900px;
  justify-content: space-between;
`;

const FirstItem = styled.div`
  // border: 0.5px solid #c0c0c0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-direction: column;
`;

const RoomContainer = styled.div`
  position: absolute;
  top: 0%;
  margin-top: -500px;
  margin-left: -50px;
  // left: 0%;
  // display: none;
  width: 5000px;
  height: 2000px;
  // background-color: rgba(0, 0, 0, 0.5);
  // background-color: red;
  // z-index: 6;
`;

const Room = styled.div`
  // background-color: white;
  // margin-left: 300px;
  // top: 15%;
  // position: fixed;
  // align-items: center;
  // flex-direction: column;
  // border: 0.5px solid #c0c0c0;
  // height: 500px;
  // width: 500px;
  // display: flex;
  padding: 30px;
  border: 0.5px solid #c0c0c0;
  border-radius: 10%;
  top: 15%;
  position: fixed;
  height: 500px;
  width: 500px;
  margin-left: 300px;
  background-color: white;
  z-index: 5;
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: center;
`;

const SecondRow = styled.div`
  margin-top: 20px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
`;

const StartPoint = styled.div`
  margin-right: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EndPoint = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonX1 = styled.button`
  margin-left: 420px;
  margin-top: 20px;
  width: 5px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ButtonX2 = styled.button`
  margin-left: 275px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ButtonX3 = styled.button`
  // margin-top: 20px;
  margin-left: 480px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 0%;
  margin-top: -500px;
  margin-left: -50px;
  left: 0%;
  display: none;
  width: 2000px;
  height: 2000px;
  // background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background-color: white;
  border-radius: 10%;
  margin-left: 300px;
  top: 15%;
  position: fixed;
  align-items: center;
  flex-direction: column;
  border: 0.5px solid #c0c0c0;
  height: 500px;
  width: 500px;
  display: flex;
`;

const Assemble = styled.button`
  position: fixed;
  width: 80px;
  height: 80px;
  z-index: 5;
  right: 3%;
  bottom: 3%;
  background-color: #ffb635;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;

const RegularSticker = styled.div`
  position: absolute;
  margin-left: -950px;
  margin-top: -150px;
  font-family: "GangwonEduPowerExtraBoldA";
  -webkit-text-stroke: 1px blue;
  color: white;
`;

const RegularSticker2 = styled.div`
  position: absolute;
  margin-left: -950px;
  margin-top: -150px;
  font-family: "GangwonEduPowerExtraBoldA";
  -webkit-text-stroke: 1px orange;
  color: white;
`;

const ContactTool = styled.div`
  margin-top: 30px;
`;

const PersonnelSticker = styled.div`
  position: absolute;
  margin-right: -900px;
  margin-top: -150px;
  // font-family: "GangwonEduPowerExtraBoldA";
  // -webkit-text-stroke: 1px orange;
  // color: white;
`;

const KakaoMap = styled.div`
  width: 200px;
  height: 200px;
  margin-top: 20px;
`;

const PlaceList = styled.ul`
  // position: absolute;
  width: 250px;
  height: 200px;
  background-color: #fff;

  margin-top: 0px;
  overflow: scroll;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubModal = styled.div`
  position: absolute;
  margin-top: 50px;
  width: 300px;
  height: 250px;
  background-color: white;
  border: 0.5px solid #c0c0c0;
  z-index: 4;
`;

const SubModal2 = styled.div`
  position: absolute;
  margin-top: 50px;
  width: 300px;
  height: 250px;
  background-color: white;
  border: 0.5px solid #c0c0c0;
  z-index: 4;
`;

const Pagination = styled.div`
  // border: 0.5px solid #c0c0c0;
  // height: 100px;
  // display = "flex";
  // justify-content = "space-between";
  // margin-top = "-10px";
`;

const ChannelPages = styled.div`
  // border: 0.5px solid #c0c0c0;
  width: 1040px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBox = styled.div`
border: 0.5px solid #c0c0c0;
width: 200px;
  height: 100px;
  position: absoulte;
  margin-left: 100px;

`

const RoomPeopleBox = styled.span`
  display: flex;
  flex-direction: column;
`

const RoomPeople = styled.span`
width: 100px;
position:relative;
cursor: pointer;
`

const GetOut = styled.button`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 10px;
  cursor: pointer;
`

const HiddenInfo = styled.div`
display: none;
`

const { kakao } = window;

const Board = ({ searchPlace }) => {
  let count = 0;
  let pageCount = 1;
  let channelNum = 0;
  let channelPages = 0;
  let pageArr = [];
  let firstCount = 0;
  let startArround = [];
  let completeXY = [];
  let completeDA = [];
  let usersCount = 0;
  let whichPoint = null;
  let tempflag = 0;

  const { nickname } = ProfileStore();
  const {
    channelList,
    setChannelList,
    channelArr,
    setChannelArr,
    addChannelArr,
    startPoint,
    setStartPoint,
    personnel,
    setPersonnel,
    regular,
    setRegular,
    content,
    setContent,
    departures,
    setDepartures,
    departuresLatitude,
    setDeparturesLatitude,
    departuresLongitude,
    setDeparturesLongitude,
    arrivals,
    setArrivals,
    arrivalsLatitude,
    setArrivalsLatitude,
    arrivalsLongitude,
    setArrivalsLongitude,
    place,
    setPlace,
    inputStartPoint,
    setInputStartPoint,
    inputEndPoint,
    setInputEndPoint,
    search,
    setSearch,
    search2,
    setSearch2,
    showListD,
    setShowListD,
    showListA,
    setShowListA,
    channelPg,
    setChannelPg,
    pageNum,
    setPageNum,
    firstTake,
    setFirstTake,
    please,
    setPlease,
    arroundArr,
    setArroundArr,
    channelCount,
    setChannelCount,
    driverExsist,
    setDriverExsist,
    isRoomOn,
    setIsRoomOn,
    render,
    setRender,
    temp,
    setTemp,
    secondArr,
    addSecondArr,
    setSecondArr,

    roomDeparture,
    setRoomDeparture,

    roomArrival,
    setRoomArrival,

    roomHost,
    setRoomHost,

    roomDriver,
    setRoomDriver,

    roomPeople,
    setRoomPeople,
    isMaster,
    setIsMaster,
    clicked,
    setClicked,
    tempIdSave,
    setTempIdSave,
    searchWord,
    setSearchWord,
    contentEdit,
    setContentEdit,
    roomContent,
    setRoomContent,
    enteredPostId,
    setEnteredPostId,
    roomDriverId,
    setRoomDriverId,
    locationMaster,
    setLocationMaster,
    channelPg2,
    setChannelPg2,
    flag,
    setFlag
  } = ChannelStore();
  const { loggedId, setLoggedId } = MasterStore2();
  const { loggedRealId, setLoggedRealId } = MasterStore3();

  const testAsync = require("async");

  const createChannel = () => {
    setContent(null);
    document.getElementById("modalbox").style.display = "block";
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    // width: 100%;`;
    document.getElementById("channelBox").style.cssText = `
    overflow: hidden;
    // width: 100%;`;
  };
  const closeCreateChannel = () => {
    setContent(null);
    document.getElementById("modalbox").style.display = "none";
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
    document.getElementById("channelBox").style.cssText = "";
    setSearch("");
    setSearch2("");
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  const regularChange = (e) => {
    setRegular(JSON.parse(e.currentTarget.value));
    console.log(regular);
  };

  const contentChange = (e) => {
    setContent(e.currentTarget.value);
    console.log(content);
  };

  const personnelChange = (e) => {
    setPersonnel(e.currentTarget.value);
    console.log(content);
  };

  const onChangeSearch = (event) => {
    setSearch(event?.target.value);
  };

  const onChangeSearch2 = (event) => {
    setSearch2(event?.target.value);
  };

  const closeSubModal = (event) => {
    setShowListD(false);
  };

  const closeSubModal2 = (event) => {
    setShowListA(false);
  };

  const closeRoom = (event) => {
    document.getElementById("channelBox").style.cssText = "";
    document.getElementById("header").style.cssText = ``;
    setIsRoomOn(false);
    setIsMaster(false);
    setClicked(false);
    setTempIdSave(null);
  };

  const reload = (event) => {
    setRender(!render);
  };

  const showProfile = (event) => {
    setClicked(true);
  }

  // const reload2 = async (event) => {
  //   try {
  //     // setRender(!render);
  //     console.log("셋째트염");
  //     const res = await axios.get("http://localhost:4000/posts", {
  //       withCredentials: true,
  //     });
  //     // 진짜 서버 연결하면 수정해야하는 부분 @@@@
  //     document.getElementById(`${1}`).style.color = "blue";
  //     channelNum = res.data.length;
  //     channelPages =
  //       channelNum % 10 === 0
  //         ? Math.floor(channelNum / 10)
  //         : Math.floor(channelNum / 10) + 1;
  //     setChannelPg(channelPages);
  //     const reverseData = res.data.slice(0).reverse();
  //     for (let i = 0; i < channelPages; i++) {
  //       let tempStartNum = 0;
  //       let tempNum = 10;
  //       let tempArr = [];
  //       tempStartNum = tempNum * i;
  //       tempNum = tempNum * (i + 1);
  //       for (let j = tempStartNum; j < tempNum; j++) {
  //         if (reverseData[j] === undefined) {
  //           break;
  //         }
  //         tempArr.push(reverseData[j]);
  //       }
  //       addChannelArr(tempArr);
  //       console.log(channelArr);
  //       tempArr = [];
  //     }
  //     window.scrollTo(0, 0);
  //     return res.data;
  //   } catch (e) {
  //     console.log("error: " + e);
  //   }
  // };

  const driverChange = (e) => {
    if (e.target.value === "true") {
      setDriverExsist(true);
    } else {
      setDriverExsist(false);
    }
  };


  const showAttendeeProfile = async (id) => {
    try{
      const res = await axios.get(`http://localhost:8080/api/users/${id}?userId=${loggedRealId}`,
      {
        withCredentials: true,
      })
      console.log(res.data.data);
      // /api/users/{targetUserId}
      const attendeeProfBox = document.createElement("div");
      attendeeProfBox.id = "me";
      console.log(attendeeProfBox);
      attendeeProfBox.style.cssText = `
        border: 0.5px solid #c0c0c0;
        border-radius: 5%;
        width: 300px;
        background-color: white;
        height: 200px;
        position: fixed;
        margin-top: -80px;
        margin-left: 100px;
        font-family: "GangwonEduPowerExtraBoldA";
        padding: 20px;
        font-size: 25px;
      `;
      attendeeProfBox.innerHTML = "<div> 닉네임: " + res.data.data.nickname + "</div>"
      + "<div> 평점: " + res.data.data.rating + "</div>"
      + "<div> 성별: " + (res.data.data.sex === true ? "남자" : "여자") + "</div>"
      + "<div> 자차: " + (res.data.data.ownCar === true ? "있음" : "없음") + "</div>"
      + "<div> 운전가능여부: " + (res.data.data.driving === true ? "가능" : "불가") + "</div>";
      attendeeProfBox.onclick = function(event){event.stopPropagation(); 
        while ( document.getElementById("temp").lastChild.id !== "notMe" )
          {
            document.getElementById("temp").removeChild( document.getElementById("temp").lastChild );       
          };
        };
      document.getElementById("temp").appendChild(attendeeProfBox);
    }
    catch (e)
    {
      console.log("error: " + e);
    }
  };

  const showAttendeeProfile2 = async (id) => {
    try{
      console.log(document.getElementById(`hidden_${id}`).children);
      const res = await axios.get(`http://localhost:8080/api/users/${id}?userId=${loggedRealId}`,
      {
        withCredentials: true,
      })
      console.log(res.data.data);
      // /api/users/{targetUserId}
      const attendeeProfBox = document.createElement("div");
      attendeeProfBox.id = "me";
      attendeeProfBox.style.cssText = `
        border: 0.5px solid #c0c0c0;
        border-radius: 5%;
        width: 300px;
        background-color: white;
        height: 200px;
        position: fixed;
        margin-top: -80px;
        margin-left: 100px;
        font-family: "GangwonEduPowerExtraBoldA";
        padding: 20px;
        font-size: 25px;
      `;
      attendeeProfBox.innerHTML = "<div> 출발지: " + document.getElementById(`hidden_${id}`).children[0].innerHTML + "</div>"
      + "<div> 목적지: " + document.getElementById(`hidden_${id}`).children[1].innerHTML + "</div>";
      attendeeProfBox.onclick = function(event){event.stopPropagation(); 
        while ( document.getElementById("temp").lastChild.id !== "notMe")
        {
          document.getElementById("temp").removeChild( document.getElementById("temp").lastChild );       
        };
      };
      document.getElementById("temp").appendChild(attendeeProfBox);
    }
    catch (e)
    {
      console.log("error: " + e);
    }
  };


  const generateProfileBox =  (e) => {
 
      const peopleId = e.target.id;
      console.log(e.target.id);
      console.log(e.target.innerText);
      console.log(e);
      if(clicked === true)
      {
        // if(loggedId === )
        document.getElementById(tempIdSave).removeChild(document.getElementById("temp"));
        setTempIdSave(e.target.id);
        const profBox = document.createElement("div");
        const profText1 = document.createElement("p");
        profText1.id = "notMe";
        const profText2 = document.createElement("p");
        profText2.id = "notMe";
        profBox.style.cssText = `
          // border: 0.5px solid #c0c0c0;
          border-radius: 5%;
          background-color: rgba(0, 0, 255, 0.2);
          width: 150px;
          height: 100px;
          position: fixed;
          margin-left: 100px;
          font-family: "GangwonEduPowerExtraBoldA";
          padding: 20px;
          z-index: 6;
        `;
        profBox.id = "temp";
        profBox.onclick = function(event){document.getElementById(e.target.id).removeChild(document.getElementById("temp")); setClicked(false);};
        // profBox.onclick = function(event){document.getElementById("room").removeChild(profBox);};
        profText1.innerHTML = "<div>유저프로필</div>";
        profText1.onclick = function(event){event.stopPropagation(); showAttendeeProfile(peopleId);};
        profText2.innerHTML = "<div>개인 출발/도착지</div>";
        profText2.onclick = function(event){event.stopPropagation(); showAttendeeProfile2(peopleId);};
        profBox.appendChild(profText1);
        profBox.appendChild(profText2);
        // if(isMaster === true && e.target.innerText !== loggedId)
        // {
        //   const profText3 = document.createElement("p");
        //   profText3.id = "notMe";
        //   profText3.innerHTML = "<div>강퇴</div>";
        //   profText3.onclick = function(event){event.stopPropagation(); alert("3");};
        //   profBox.appendChild(profText3);
        // }
        document.getElementById(e.target.id).appendChild(profBox);
      }
      else
      {
        setTempIdSave(e.target.id);
        const profBox = document.createElement("div");
        const profText1 = document.createElement("p");
        profText1.id = "notMe";
        const profText2 = document.createElement("p");
        profText2.id = "notMe";
        
        profBox.style.cssText = `
          // border: 1px solid rgba(0, 0, 255, 0.5);
          border-radius: 5%;
          // background-color: blue;
          background-color: rgba(0, 0, 255, 0.2);
          width: 150px;
          height: 100px;
          position: fixed;
          font-family: "GangwonEduPowerExtraBoldA";
          margin-left: 100px;
          padding: 20px;
          z-index: 6;
        `;
        profBox.id = "temp";
        profBox.onclick = function(event){document.getElementById(e.target.id).removeChild(document.getElementById("temp")); setClicked(false);};
        // profBox.onclick = function(event){document.getElementById("room").removeChild(profBox);};
        profText1.innerHTML = "<div>유저프로필</div>";
        profText1.onclick = function(event){event.stopPropagation(); showAttendeeProfile(peopleId);};
          profText2.innerHTML = "<div>개인 출발/도착지</div>";
        profText2.onclick = function(event){event.stopPropagation(); showAttendeeProfile2(peopleId);};
        profBox.appendChild(profText1);
        profBox.appendChild(profText2);
        // if(isMaster === true && e.target.innerText !== loggedId)
        // {
        //   const profText3 = document.createElement("p");
        //   profText3.id = "notMe";
        //   profText3.innerHTML = "<div>강퇴</div>";
        //   profText3.onclick = function(event){event.stopPropagation(); alert("3");};
        //   profBox.appendChild(profText3);
        // }
        document.getElementById(e.target.id).appendChild(profBox);
        setClicked(true);
      } 
    
  };

  const closeProfile = (event) => {
    console.log(event);
    // document.getElementById("room").removeChild(
    //   document.getElementById(event.target.id));
  };

  const enterChannel2 = async (curpersonnel, channelId, roomId, departures,
    departuresLatitude,
    departuresLongitude,
    arrivals,
    arrivalsLatitude,
    arrivalsLongitude,
    content,
    driverId,
    hostId) => {
    try {
      let locationing = [];
      let d_xy = [];
      let a_xy = [];
      d_xy.push(departuresLatitude);
      d_xy.push(departuresLongitude);
      a_xy.push(arrivalsLatitude);
      a_xy.push(arrivalsLongitude);
      locationing.push([d_xy, a_xy, [departures, arrivals]])
      setLocationMaster(locationing);
      console.log(channelId);
      setRoomDriverId(driverId);
      setEnteredPostId(channelId);
      document.getElementById("channelBox").style.cssText = `
    overflow: hidden;`;
    document.getElementById("header").style.cssText = `
    pointer-events: none;`;
    console.log(hostId);
    console.log(loggedRealId);
      if (hostId == loggedRealId) {
        console.log("주인님");
        setIsMaster(true);
      }

      const res3= await axios.get(
        `http://localhost:8080/api/posts/${channelId}`,
        {
          withCredentials: true,
        }
      );

      console.log(res3);

      const res2= await axios.get(
        `http://localhost:8080/api/carpools/participation?channelId=${channelId}`,
        {
          withCredentials: true,
        }
      );

      console.log(res2);
      setRoomContent(content);
      setRoomHost(res3.data.data.hostNickname);
      setRoomDeparture(res3.data.data.departures);
      setRoomArrival(res3.data.data.arrivals);
      setRoomDriver(res3.data.data.driverNickname);
      let tempArr = [];
      for (let j = 0; j < res2.data.data.length; j++) {
        let tempArr_1 = [];
        tempArr_1.push(res2.data.data[j].nickname);
        tempArr_1.push(res2.data.data[j].userId);
        tempArr_1.push(res2.data.data[j].departures);
        tempArr_1.push(res2.data.data[j].arrivals);
        console.log(res2.data.data[j]);
        tempArr.push(tempArr_1);
      }
      setRoomPeople(tempArr);
      console.log(tempArr.flat(2));


      if (!tempArr.flat(2).includes(loggedId)) {
        if (res3.data.data.personnel == res3.data.data.curPersonnel) {
          alert("인원이 가득 찼습니다");
          document.getElementById("channelBox").style.cssText = ``;
          document.getElementById("header").style.cssText = ``;
          setIsRoomOn(false);
          setIsMaster(false);
          return;
        }
        const letMeIn = {
          channelId : channelId, 
          userId: loggedRealId,
          departures: departures,
          departuresLatitude: departuresLatitude,
          departuresLongitude: departuresLongitude,
          arrivals: arrivals,
          arrivalsLatitude: arrivalsLatitude,
          arrivalsLongitude: arrivalsLongitude
      }
        let result = window.confirm("해당 채널에 입장하시겠습니까?");
        if (result) {
          const res1 = await axios.post(
            `http://localhost:8080/api/carpools`,
            letMeIn
          ,
            {
              withCredentials: true,
            }
          );
          let tempArr2 = [];
          let tempArr3 = [];
          tempArr3.push(loggedId);
          tempArr3.push(loggedRealId);
          tempArr2 = [...tempArr, tempArr2]
          setRoomPeople(tempArr2);
          setIsRoomOn(true);
          
        } else {
          document.getElementById("channelBox").style.cssText = ``;
          document.getElementById("header").style.cssText = ``;
          setIsRoomOn(false);
          setIsMaster(false);
        }
      }
      else{
        setIsRoomOn(true);
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  //@@@@@@@@@@@@@@@@@@@@@@@@@@
  const enterChannel = async (curpersonnel, channelId, roomId) => {
    try {
      document.getElementById("channelBox").style.cssText = `
    overflow: hidden;`;
    document.getElementById("header").style.cssText = `
    pointer-events: none;`;
      if (roomId == loggedId) {
        setIsMaster(true);
      }
      const parsing = parseInt(channelId);
      const sum = parseInt(curpersonnel) + 1;

      const res1 = await axios.get(
        `http://localhost:4000/carpools?carpoolId=${channelId}`,
        {
          withCredentials: true,
        }
      );
      setRoomHost(res1.data[0].hostNickname);
      setRoomDeparture(res1.data[0].departures);
      setRoomArrival(res1.data[0].arrivals);
      setRoomDriver(res1.data[0].driverNickname);

      let tempArr = [];
      for (let i = 0; i < res1.data[0].userChannelList.length; i++) {
        tempArr.push(res1.data[0].userChannelList[i].nickname);
        console.log(res1.data[0].userChannelList[i].nickname);
      }
      setRoomPeople(tempArr);

      setIsRoomOn(true);

      if (!tempArr.includes(loggedId)) {
        if (res1.data[0].personnel == res1.data[0].curPersonnel) {
          alert("인원이 가득 찼습니다");
          setIsRoomOn(false);
          return;
        }
        let result = window.confirm("해당 채널에 입장하시겠습니까?");
        if (result) {
          const personnelPlus = {
            curPersonnel: sum,
          };
          const userEnter = {
            curPersonnel: sum,
            userChannelList: [
              ...res1.data[0].userChannelList,
              {
                id: loggedRealId,
                nickname: loggedId,
                userId: loggedRealId,
                departures: null,
                departuresLatitude: null,
                departuresLongitude: null,
                arrivals: null,
                arrivalsLatitude: null,
                arrivalsLongitude: null,
                rating: 4.2,
              },
            ],
          };

          const res2 = await axios(
            {
              method: "patch",
              url: `http://localhost:4000/carpools/${parsing}`,
              data: userEnter,
              headers: { "Content-Type": "application/json" },
            },
            {
              withCredentials: true,
            }
          );

          const res3 = await axios(
            {
              method: "patch",
              url: `http://localhost:4000/posts/${parsing}`,
              data: personnelPlus,
              headers: { "Content-Type": "application/json" },
            },
            {
              withCredentials: true,
            }
          );
        } else {
          document.getElementById("channelBox").style.cssText = ``;
          document.getElementById("header").style.cssText = ``;
          setIsRoomOn(false);
        }
      }

      return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@

  const realGetChannelData = async () => {
    try {
      setFlag(false);
      const temp = 1;
      // setPageNum(0);
      const res = await axios.get(
        `http://localhost:8080/api/posts/lists/${temp}`,
        {
          withCredentials: true,
        }
      );
      const res2 = await axios.get(
        `http://localhost:8080/api/carpools/count`,
        {
          withCredentials: true,
        }
      );

      for (let i = 1; i <= pageArr.length; i++) {
        if (document.getElementById(`${i}`).id == 1) {
          document.getElementById(`${i}`).style.color = "blue";
        } else {
          document.getElementById(`${i}`).style.color = "black";
        }
      }

      setChannelCount(res.data.data[res.data.data.length - 1].postId);
      channelNum = res2.data.data;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
      console.log(res.data.data.slice(0).reverse());
      setChannelArr(res.data.data);
      setChannelList(res.data.data);
      setFirstTake(true);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const kariGetChannelData = async () => {
    try {
      const temp = 1;
      const res = await axios.get(
        `http://localhost:8080/api/posts/lists/${temp}`,
        {
          withCredentials: true,
        }
      );

      const res2 = await axios.get(
        `http://localhost:8080/api/carpools/count`,
        {
          withCredentials: true,
        }
      );


      console.log(res);
      console.log(res2.data.data);

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const getChannelData = async () => {
    try {
      // window.location.reload();
      console.log(channelArr);
      console.log("첫트염");
      console.log(channelCount);
      setPageNum(0);
      const res = await axios.get("http://localhost:4000/posts", {
        withCredentials: true,
      });
      setChannelCount(res.data[res.data.length - 1].id);
      // 진짜 서버 연결하면 수정해야하는 부분 @@@@
      channelNum = res.data.length;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);


      let tempAllArr = [];
      const reverseData = res.data.slice(0).reverse();
      for (let i = 0; i < channelPages; i++) {
        let tempStartNum = 0;
        let tempNum = 10;
        let tempArr = [];
        tempStartNum = tempNum * i;
        tempNum = tempNum * (i + 1);
        for (let j = tempStartNum; j < tempNum; j++) {
          if (reverseData[j] !== undefined) {
            tempArr.push(reverseData[j]);
          }
        }
        tempAllArr = [...tempAllArr, tempArr];
        // addChannelArr(tempArr);
        console.log(channelArr);
        tempArr = [];
      }
      setChannelArr(tempAllArr);
      // document.getElementById("1").style.color = "blue";
      setChannelList(res.data);
      setFirstTake(true);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };


  const getPageChannel2 = async (e) => {
    try {
      console.log(e);
      console.log(e.target.id);
      console.log("둘째트염");
      // setChannelArr([]);
      const res = await axios.get(`http://localhost:8080/api/posts/lists/${e.target.id}`, {
        withCredentials: true,
      });
      const res2 = await axios.get(
        `http://localhost:8080/api/carpools/count`,
        {
          withCredentials: true,
        }
      );
      for (let i = 1; i <= pageArr.length; i++) {
        if (document.getElementById(`${i}`).id == e.target.id) {
          document.getElementById(`${i}`).style.color = "blue";
        } else {
          document.getElementById(`${i}`).style.color = "black";
        }
      }
      channelNum = res2.data.data;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
      setChannelArr(res.data.data);
      document.getElementById("channelBox").scrollTo(0, 0);
      // window.scrollTo(0, 0);
      setChannelArr(res.data.data);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  

  const getPageChannel = async (e) => {
    try {
      console.log("둘째트염");
      // setChannelArr([]);
      const res = await axios.get("http://localhost:4000/posts", {
        withCredentials: true,
      });
      // 진짜 서버 연결하면 수정해야하는 부분 @@@@
      setPageNum(e.target.id - 1);
      for (let i = 1; i <= pageArr.length; i++) {
        if (document.getElementById(`${i}`).id == e.target.id) {
          document.getElementById(`${i}`).style.color = "blue";
        } else {
          document.getElementById(`${i}`).style.color = "black";
        }
      }
      channelNum = res.data.length;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
      let tempAllArr = [];
      const reverseData = res.data.slice(0).reverse();
      for (let i = 0; i < channelPages; i++) {
        let tempStartNum = 0;
        let tempNum = 10;
        let tempArr = [];
        tempStartNum = tempNum * i;
        tempNum = tempNum * (i + 1);
        for (let j = tempStartNum; j < tempNum; j++) {
          if (reverseData[j] === undefined) {
            break;
          }
          tempArr.push(reverseData[j]);
        }
        tempAllArr = [...tempAllArr, tempArr];
        tempArr = [];
      }
      setChannelArr(tempAllArr);
      document.getElementById("channelBox").scrollTo(0, 0);
      // window.scrollTo(0, 0);
      setChannelList(res.data);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const openChannel = async () => {
    try {
      if (inputStartPoint === null) {
        alert("출발지를 정해주세요");
        return;
      }
      if (inputEndPoint === null) {
        alert("도착지를 정해주세요");
        return;
      }
      // if(personnel > 47)
      // {

      // }
      count = channelCount + 1;
      const channelData = {
        id: channelCount + 1,
        nickname: loggedId,
        userId: loggedRealId,
        channelId: channelCount + 1,
        title: "제목없음",
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
        personnel: personnel,
        curPersonnel: 1,
        content: content,
        regular: regular,
        carpoolDate: "2", // 수정해야함
        driverId: loggedId,
      };
      // const res = axios({
      //   url: "http://localhost:4000/posts",
      //   method: "post",
      //   channelData,
      //   withCredentials: true,
      // });

      const roomData = {
        id: channelCount + 1,
        carpoolId: channelCount + 1,
        hostId: loggedRealId,
        hostNickname: loggedId,
        driverId: driverExsist === true ? loggedRealId : null,
        driverNickname: driverExsist === true ? loggedId : null,
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
        personnel: personnel,
        curPersonnel: 1,
        content: content,
        regular: regular,
        userChannelList: [
          {
            id: channelCount + 1,
            userId: 1,
            nickname: loggedId,
            departures: inputStartPoint,
            departuresLatitude: departuresLatitude,
            departuresLongitude: departuresLongitude,
            arrivals: inputEndPoint,
            arrivalsLatitude: arrivalsLatitude,
            arrivalsLongitude: arrivalsLongitude,
            rating: 4.2, // 수정해야함
          },
        ],
      };

      const res = await axios.post("http://localhost:4000/posts", channelData, {
        withCredentials: true,
      });

      const res2 = await axios.post(
        "http://localhost:4000/carpools",
        roomData,
        {
          withCredentials: true,
        }
      );
      console.log(roomData);
      // const res2 = axios({
      //   url: "http://localhost:4000/carpools",
      //   method: "post",
      //   roomData,
      //   withCredentials: true,
      // });

      setInputStartPoint(null);
      setInputEndPoint(null);
      closeCreateChannel();
      realGetChannelData();

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };


  const openChannel2 = async () => {
    try {
      if (inputStartPoint === null) {
        alert("출발지를 정해주세요");
        return;
      }
      if (inputEndPoint === null) {
        alert("도착지를 정해주세요");
        return;
      }

      // if(personnel > 47)
      // {

      // }

      let today = new Date;
      const yy = today.getFullYear().toString();
      const mm = (today.getMonth()+1).toString().length === 1 ? "0" + (today.getMonth()+1).toString() : (today.getMonth()+1).toString();
      const dd = today.getDate().toString().length === 1 ? "0" + today.getDate().toString() : today.getDate().toString();
      today = yy + "-" + mm + "-" + dd;
      // count = channelCount + 1;
      console.log(today);

      const channelData = {
        nickname: loggedId,
        userId: loggedRealId,
        title: "제목없음",
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
        personnel: personnel,
        content: content === null ? "내용없음" : content,
        regular: regular,
        carpoolDate: today,
      };

      const res = await axios.post("http://localhost:8080/api/posts", channelData, {
        withCredentials: true,
      });

      setInputStartPoint(null);
      setInputEndPoint(null);
      closeCreateChannel();
      realGetChannelData();

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const realSearch = async () => {
     try{
      
      const res = await axios.get(`http://localhost:8080/api/posts?keyword=${searchWord}`, {
        withCredentials: true,
      });
      console.log(res);
      channelNum = res.data.data.length;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      // setChannelPg(channelPages);
      setChannelPg2(channelPages);

      let tempAllArr = [];
      const reverseData = res.data.data.slice(0).reverse();
      console.log(reverseData);
      for (let i = 0; i < channelPages; i++) {
        let tempStartNum = 0;
        let tempNum = 10;
        let tempArr = [];
        tempStartNum = tempNum * i;
        tempNum = tempNum * (i + 1);
        for (let j = tempStartNum; j < tempNum; j++) {
          if (reverseData[j] === undefined) {
            break;
          }
          tempArr.push(reverseData[j]);
        }
        tempAllArr = [...tempAllArr, tempArr];
        console.log(tempAllArr.flat(1));
        tempArr = [];
      }
      setChannelArr(tempAllArr.flat(1));
      setChannelList(tempAllArr.flat(1));
      setFlag(true);
      // setChannelArr(res.data.data.slice(0).reverse());
      // setSearchWord(null);
     }
     catch (e) 
     {
      if(e.response.status === 500)
      {
        alert("검색결과가 존재하지 않습니다");
      }
      console.log("error: " + e);
     }
  }

  const changeWord = (e) =>
  {
    setSearchWord(e.target.value);
    console.log(e.target.value);
  }

  const changeWord2 = (e) =>
  {
    setRoomContent(e.target.value);
    console.log(e.target.value);
  }

  const editSwitch = async (e) => {
    try{
      if(contentEdit === false)
      {
        setContentEdit(true);
      }
      else{
        const res = await axios.patch(`http://localhost:8080/api/posts`,
        {
          postId: enteredPostId,
          driverId: roomDriverId,
          userId: loggedRealId,
          content: roomContent
        }, {
        withCredentials: true,
      });
      setContentEdit(false);

      }
      
    }
    catch (e) {

    }
  }




  // let whichPoint = null;

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if (e.target.id === "keyword1") {
        whichPoint = "start";
        setShowListD(true);
        document.getElementById("submit_btn1").click();
      } else {
        whichPoint = "end";
        setShowListA(true);
        document.getElementById("submit_btn2").click();
      }
    }
  };

  const pageGenerator = () => {
    for (let i = 1; i <= channelPg; i++) {
      if (i !== channelPg) {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "blue",
                fontSize: "25px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={getPageChannel2}
            >
              {i}
            </span>
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "black",
                fontSize: "25px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={getPageChannel2}
            >
              {i}
            </span>
          );
        }
      } else {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "blue",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={getPageChannel2}
            >
              {i}
            </span>
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "black",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={getPageChannel2}
            >
              {i}
            </span>
          );
        }
      }
    }
    return pageArr;
  };

  const searchPageGenerator = () => {
    for (let i = 1; i <= channelPg2; i++) {
      if (i !== channelPg2) {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "blue",
                fontSize: "25px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={realSearch}
            >
              {i}
            </span>
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "black",
                fontSize: "25px",
                cursor: "pointer",
                marginRight: "20px",
              }}
              onClick={realSearch}
            >
              {i}
            </span>
          );
        }
      } else {
        if (i == 1) {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "blue",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={realSearch}
            >
              {i}
            </span>
          );
        } else {
          pageArr.push(
            <span
              id={i}
              style={{
                color: "black",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={realSearch}
            >
              {i}
            </span>
          );
        }
      }
    }
    return pageArr;
  };

  useEffect(() => {
    var markers = [];
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(
      38.2313466,
      128.2139293
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    const ps = new kakao.maps.services.Places();

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const searchForm = document.getElementById("submit_btn1");
    searchForm?.addEventListener("click", function (e) {
      let keyword = document.getElementById("keyword1").value;
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        e.stopImmediatePropagation();
        alert("키워드를 입력해주세요!");
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      // console.log(whichPoint);
      e.preventDefault();
      setShowListD(true);
      searchPlaces(whichPoint);
    });

    const searchForm2 = document.getElementById("submit_btn2");
    searchForm2?.addEventListener("click", function (e) {
      let keyword = document.getElementById("keyword2").value;
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        e.stopImmediatePropagation();
        alert("키워드를 입력해주세요!");
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      // console.log(whichPoint);
      e.preventDefault();
      setShowListA(true);
      searchPlaces(whichPoint);
    });

    const findDA = document.getElementById("find");
    findDA?.addEventListener("click", function (e) {
      let findD = document.getElementById("findD").value;
      let findA = document.getElementById("findA").value;
      if (
        !findD.replace(/^\s+|\s+$/g, "") ||
        !findA.replace(/^\s+|\s+$/g, "")
      ) {
        e.stopImmediatePropagation();
        alert("출발지와 목적지를 모두 입력해주세요!");
        return false;
      }
      e.preventDefault();
      whichPoint = "both";
      searchPlaces(whichPoint);
    });

    function searchPlaces(whichPoint) {
      let keyword = null;
      let findD = null;
      let findA = null;
      if (whichPoint === "start") {
        keyword = document.getElementById("keyword1").value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else if (whichPoint === "end") {
        keyword = document.getElementById("keyword2").value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else {
        findD = document.getElementById("findD").value;
        findA = document.getElementById("findA").value;

        function placesSearchCBD(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataD = data;
            console.log(dataD);
            const locationD = [dataD[0].x, dataD[0].y];
            const locationD_name = dataD[0].place_name;
            searchChannel("findD", locationD, locationD_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        function placesSearchCBA(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataA = data;
            console.log(dataA);
            const locationA = [dataA[0].x, dataA[0].y];
            const locationA_name = dataA[0].place_name;
            searchChannel("findA", locationA, locationA_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        ps.keywordSearch(findD, placesSearchCBD);
        ps.keywordSearch(findA, placesSearchCBA);
      }
    }

    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        if (whichPoint === "start") {
          const data1 = data;
          const pagination1 = pagination;
          displayPlaces(data1);
          displayPagination(pagination1);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        } else if (whichPoint === "end") {
          const data2 = data;
          const pagination2 = pagination;
          displayPlaces(data2);
          displayPagination(pagination2);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    }

    const searchChannel = async (DorA, location, locationName) => {
      try {
        // const res = await axios.get("http://localhost:4000/posts");

        if (DorA === "findD") {
          completeXY.unshift(location);
          completeDA.unshift(locationName);
        } else {
          completeXY.push(location);
          completeDA.push(locationName);
          console.log(completeXY);
          console.log(completeDA);
          
          // const dbLocation = [];
          // for (let i = 0; i < res.data.length; i++) {
          //   let tempArrD = [];
          //   let tempArrA = [];
          //   tempArrD.push(res.data[i].departuresLatitude);
          //   tempArrD.push(res.data[i].departuresLongitude);
          //   tempArrA.push(res.data[i].arrivalsLatitude);
          //   tempArrA.push(res.data[i].arrivalsLongitude);
          //   dbLocation.push([
          //     tempArrD,
          //     tempArrA,
          //     [res.data[i].departures, res.data[i].arrivals],
          //     res.data[i].id,
          //   ]);
          // }
          // console.log(dbLocation);

          let tempArr1 = [];
          let R = 6372.8 * 1000;


          const latD1 = parseFloat(completeXY[0][0]);
          const latD2 = parseFloat(locationMaster[0][0][0]);
          const lonD1 = parseFloat(completeXY[0][1]);
          const lonD2 = parseFloat(locationMaster[0][0][1]);
          let dLat = ((latD2 - latD1) * Math.PI) / 180;
          let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
          let a =
              Math.pow(Math.sin(dLat / 2), 2.0) +
              Math.pow(Math.sin(dLon / 2), 2.0) *
                Math.cos((latD1 * Math.PI) / 180) *
                Math.cos((latD2 * Math.PI) / 180);
            let c = 2 * Math.asin(Math.sqrt(a));
            let finalD = R * c;

          const latA1 = parseFloat(completeXY[1][0]);
          const latA2 = parseFloat(locationMaster[0][1][0]);
          const lonA1 = parseFloat(completeXY[1][1]);
          const lonA2 = parseFloat(locationMaster[0][1][1]);
          let ALat = ((latA2 - latA1) * Math.PI) / 180;
            let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
            let a2 =
              Math.pow(Math.sin(ALat / 2), 2.0) +
              Math.pow(Math.sin(ALon / 2), 2.0) *
                Math.cos((latA1 * Math.PI) / 180) *
                Math.cos((latA2 * Math.PI) / 180);
            let c2 = 2 * Math.asin(Math.sqrt(a2));
            let finalA = R * c2;

            if (finalD <= 100 && finalA <= 100) {

              // tempArr1.push(locationMaster[0][3]);
              console.log(finalD);
              console.log(finalA);

            }
            else
            {
              alert("100미터 이내에 존재하는 주소가 아닙니다.");
              completeXY = [];
              completeDA = [];
            }

            // if (tempArr1.length === 0) {
            //   alert("검색 결과가 존재하지 않습니다.");
            //   completeXY = [];
            //   completeDA = [];
            // }


          // for (let i = 0; i < dbLocation.length; i++) {
          //   let confirm = [];
          //   const latD1 = parseFloat(completeXY[0][0]);
          //   const latD2 = parseFloat(dbLocation[i][0][0]);
          //   const lonD1 = parseFloat(completeXY[0][1]);
          //   const lonD2 = parseFloat(dbLocation[i][0][1]);
          //   let dLat = ((latD2 - latD1) * Math.PI) / 180;
          //   let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
          //   let a =
          //     Math.pow(Math.sin(dLat / 2), 2.0) +
          //     Math.pow(Math.sin(dLon / 2), 2.0) *
          //       Math.cos((latD1 * Math.PI) / 180) *
          //       Math.cos((latD2 * Math.PI) / 180);
          //   let c = 2 * Math.asin(Math.sqrt(a));
          //   let finalD = R * c;

          //   // if (finalD <= 100) {
          //   //   confirm.push("D");
          //   // }

          //   // 여기까지가 출발지에서 100미터 전방에 있는 것들

          //   console.log("정상");
          //   const latA1 = parseFloat(completeXY[1][0]);
          //   const latA2 = parseFloat(dbLocation[i][1][0]);
          //   const lonA1 = parseFloat(completeXY[1][1]);
          //   const lonA2 = parseFloat(dbLocation[i][1][1]);
            

          //   let ALat = ((latA2 - latA1) * Math.PI) / 180;
          //   let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
          //   let a2 =
          //     Math.pow(Math.sin(ALat / 2), 2.0) +
          //     Math.pow(Math.sin(ALon / 2), 2.0) *
          //       Math.cos((latA1 * Math.PI) / 180) *
          //       Math.cos((latA2 * Math.PI) / 180);
          //   let c2 = 2 * Math.asin(Math.sqrt(a2));
          //   let finalA = R * c2;
          //   console.log(finalA);
          //   if (finalD <= 100 && finalA <= 100) {
          //     tempArr1.push(dbLocation[i][3]);
          //   }
          // }
          // console.log(tempArr1);
          // if (tempArr1.length === 0) {
          //   alert("검색 결과가 존재하지 않습니다.");
          //   completeXY = [];
          //   completeDA = [];
          // } else {
          //   // setPageNum(0);
          //   channelNum = tempArr1.length;
          //   channelPages =
          //     channelNum % 10 === 0
          //       ? Math.floor(channelNum / 10)
          //       : Math.floor(channelNum / 10) + 1;
          //   setChannelPg(channelPages);
          //   let result = [];
          //   for (let i = 0; i < res.data.length; i++) {
          //     for (let j = 0; j < tempArr1.length; j++) {
          //       if (res.data[i].id === tempArr1[j]) {
          //         result.push(res.data[i]);
          //       }
          //     }
          //   }
          //   console.log(result);

          //   let tempAllArr = [];
          //   const reverseData = result.slice(0).reverse();
          //   for (let i = 0; i < channelPages; i++) {
          //     let tempStartNum = 0;
          //     let tempNum = 10;
          //     let tempArr = [];
          //     tempStartNum = tempNum * i;
          //     tempNum = tempNum * (i + 1);
          //     for (let j = tempStartNum; j < tempNum; j++) {
          //       if (reverseData[j] !== undefined) {
          //         tempArr.push(reverseData[j]);
          //       }
          //     }
          //     tempAllArr = [...tempAllArr, tempArr];
          //     // addChannelArr(tempArr);
          //     // console.log(channelArr);
          //     tempArr = [];
          //   }
          //   setChannelArr(tempAllArr);
          //   completeXY = [];
          //   completeDA = [];
          // }

        }

        // return res.data;
      } catch (e) {
        console.log("error: " + e);
        alert("검색결과가 없습니다");
        // window.location.reload();
      }
    };

    function displayPlaces(places) {
      if (whichPoint === "start") {
        const listEl = document.getElementById("placesList1");
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          );
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]);
          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                displayInfowindow(marker, title);
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                infowindow.close();
              }
            );

            itemEl.addEventListener("click", function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch(places[i].place_name);
              setInputStartPoint(places[i].place_name);
              setDeparturesLatitude(places[i].x);
              setDeparturesLongitude(places[i].y);
              setShowListD(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        listEl?.appendChild(fragment);
      } else if (whichPoint === "end") {
        const listEl2 = document.getElementById("placesList2");
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl2);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          );
          const marker = addMarker(placePosition, i);
          const itemEl2 = getListItem2(i, places[i]);

          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                displayInfowindow(marker, title);
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                infowindow.close();
              }
            );

            itemEl2.addEventListener("click", function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch2(places[i].place_name);
              setInputEndPoint(places[i].place_name);
              setArrivalsLatitude(places[i].x);
              setArrivalsLongitude(places[i].y);
              setShowListA(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl2);
        }
        listEl2?.appendChild(fragment);
      }
    }

    function getListItem(index, places) {
      const el = document.createElement("li");
      el.style.cursor = "pointer";

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";
      // console.log(itemStr);
      return el;
    }

    function getListItem2(index, places) {
      const el2 = document.createElement("li");
      el2.style.cursor = "pointer";

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el2.innerHTML = itemStr;
      el2.className = "item";

      return el2;
    }

    function addMarker(position, idx) {
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
      const imageSize = new window.kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691),
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
        offset: new window.kakao.maps.Point(13, 37),
      };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      let paginationEl = null;
      let paginationEl2 = null;
      if (whichPoint === "start") {
        const pagination1 = pagination;

        paginationEl = document.getElementById("pagination1");
        const fragment = document.createDocumentFragment();

        paginationEl.style.display = "flex";
        paginationEl.style.justifyContent = "center";
        paginationEl.style.marginTop = "-15px";
        while (paginationEl?.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination1.last; i++) {
          const el = document.createElement("a");
          el.style.textDecoration = "none";
          if (i !== pagination1.last) {
            el.style.marginRight = "10px";
          }
          el.href = "#";
          el.innerHTML = String(i);
          el.id = "el" + String(i);
          el.style.color = "black";

          if (i === pagination1.current) {
            el.className = "on";
            el.style.color = "blue";
          } else {
            el.onclick = (function (i) {
              return function () {
                whichPoint = "start";
                pagination1.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl?.appendChild(fragment);
      } else if (whichPoint === "end") {
        const pagination2 = pagination;
        paginationEl2 = document.getElementById("pagination2");
        const fragment = document.createDocumentFragment();

        paginationEl2.style.display = "flex";
        paginationEl2.style.justifyContent = "center";
        paginationEl2.style.marginTop = "-15px";
        while (paginationEl2?.hasChildNodes()) {
          paginationEl2.removeChild(paginationEl2.lastChild);
        }

        for (let i = 1; i <= pagination2.last; i++) {
          const el2 = document.createElement("a");
          el2.style.textDecoration = "none";
          if (i !== pagination2.last) {
            el2.style.marginRight = "10px";
          }
          el2.href = "#";
          el2.innerHTML = String(i);
          el2.id = "el2" + String(i);
          el2.style.color = "black";

          if (i === pagination2.current) {
            el2.className = "on";
            el2.style.color = "blue";
          } else {
            el2.onclick = (function (i) {
              return function () {
                whichPoint = "end";
                pagination2.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el2);
        }
        paginationEl2?.appendChild(fragment);
      }
    }

    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(
        marker,
        "click",
        function (mouseEvent) {
          setPlace(place);
          infowindow.setContent(`
              <span>
              ${place.place_name}
              </span>
              `);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        }
      );
    }

    setTimeout(function () {
      map.relayout();
    }, 1000);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;

      var markerPosition = new kakao.maps.LatLng(
        latlng.getLat(),
        latlng.getLng()
      );

      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, "click", function () {
        marker.setMap(null);
      });

      // if (startPoint === true) {
      //   var stDiv = document.getElementById("stpt");
      //   stDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }
      // if (startPoint === false) {
      //   var edDiv = document.getElementById("edpt");
      //   edDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
    });
  }, []);

  useEffect(() => {
    realGetChannelData();
    console.log("된거니");
  }, []);


  useEffect(() => {
    var markers = [];
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(
      38.2313466,
      128.2139293
    );

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);

    const ps = new kakao.maps.services.Places();

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    const searchForm = document.getElementById("submit_btn1");
    searchForm?.addEventListener("click", function (e) {
      let keyword = document.getElementById("keyword1").value;
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        e.stopImmediatePropagation();
        alert("키워드를 입력해주세요!");
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      // console.log(whichPoint);
      e.preventDefault();
      setShowListD(true);
      searchPlaces(whichPoint);
    });

    const searchForm2 = document.getElementById("submit_btn2");
    searchForm2?.addEventListener("click", function (e) {
      let keyword = document.getElementById("keyword2").value;
      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        e.stopImmediatePropagation();
        alert("키워드를 입력해주세요!");
        setShowListA(false);
        setShowListD(false);
        return false;
      }
      whichPoint = e.target.classList[0];
      // console.log(whichPoint);
      e.preventDefault();
      setShowListA(true);
      searchPlaces(whichPoint);
    });

    const findDA = document.getElementById("find");
    findDA?.addEventListener("click", function (e) {
      let findD = document.getElementById("findD").value;
      let findA = document.getElementById("findA").value;
      console.log(findD);
      console.log(findA);
      if (
        !findD.replace(/^\s+|\s+$/g, "") ||
        !findA.replace(/^\s+|\s+$/g, "")
      ) {
        e.stopImmediatePropagation();
        alert("출발지와 목적지를 모두 입력해주세요!");
        return false;
      }
      e.preventDefault();
      whichPoint = "both";
      searchPlaces(whichPoint);
    });

    function searchPlaces(whichPoint) {
      let keyword = null;
      let findD = null;
      let findA = null;
      if (whichPoint === "start") {
        keyword = document.getElementById("keyword1").value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else if (whichPoint === "end") {
        keyword = document.getElementById("keyword2").value;
        ps.keywordSearch(keyword, placesSearchCB);
      } else {
        findD = document.getElementById("findD").value;
        findA = document.getElementById("findA").value;

        function placesSearchCBD(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataD = data;
            // console.log(dataD);
            const locationD = [dataD[0].x, dataD[0].y];
            const locationD_name = dataD[0].place_name;
            console.log(locationD_name);
            searchChannel("findD", locationD, locationD_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        function placesSearchCBA(data, status, pagination) {
          if (status === window.kakao.maps.services.Status.OK) {
            const dataA = data;
            // console.log(dataA);
            const locationA = [dataA[0].x, dataA[0].y];
            const locationA_name = dataA[0].place_name;
            console.log(locationA_name);
            searchChannel("findA", locationA, locationA_name);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
          }
        }

        ps.keywordSearch(findD, placesSearchCBD);
        ps.keywordSearch(findA, placesSearchCBA);
      }
    }

    function placesSearchCB(data, status, pagination) {
      if (status === window.kakao.maps.services.Status.OK) {
        if (whichPoint === "start") {
          const data1 = data;
          const pagination1 = pagination;
          displayPlaces(data1);
          displayPagination(pagination1);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        } else if (whichPoint === "end") {
          const data2 = data;
          const pagination2 = pagination;
          displayPlaces(data2);
          displayPagination(pagination2);
          const bounds = new window.kakao.maps.LatLngBounds();
          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    }

    const searchChannel = async (DorA, location, locationName) => {
      try {
        // const res = await axios.get("http://localhost:4000/posts");

        if (DorA === "findD") {
          completeXY.unshift(location);
          completeDA.unshift(locationName);
          console.log(completeXY);
          console.log(completeDA);
          if(completeXY.length == 2 && completeDA.length == 2)
          {
            let tempArr1 = [];
          let R = 6372.8 * 1000;


          const latD1 = parseFloat(completeXY[0][0]);
          const latD2 = parseFloat(locationMaster[0][0][0]);
          const lonD1 = parseFloat(completeXY[0][1]);
          const lonD2 = parseFloat(locationMaster[0][0][1]);
          let dLat = ((latD2 - latD1) * Math.PI) / 180;
          let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
          let a =
              Math.pow(Math.sin(dLat / 2), 2.0) +
              Math.pow(Math.sin(dLon / 2), 2.0) *
                Math.cos((latD1 * Math.PI) / 180) *
                Math.cos((latD2 * Math.PI) / 180);
            let c = 2 * Math.asin(Math.sqrt(a));
            let finalD = R * c;

          const latA1 = parseFloat(completeXY[1][0]);
          const latA2 = parseFloat(locationMaster[0][1][0]);
          const lonA1 = parseFloat(completeXY[1][1]);
          const lonA2 = parseFloat(locationMaster[0][1][1]);
          let ALat = ((latA2 - latA1) * Math.PI) / 180;
            let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
            let a2 =
              Math.pow(Math.sin(ALat / 2), 2.0) +
              Math.pow(Math.sin(ALon / 2), 2.0) *
                Math.cos((latA1 * Math.PI) / 180) *
                Math.cos((latA2 * Math.PI) / 180);
            let c2 = 2 * Math.asin(Math.sqrt(a2));
            let finalA = R * c2;

            if (finalD <= 100 && finalA <= 100) {

              // tempArr1.push(locationMaster[0][3]);
              console.log(finalD);
              console.log(finalA);
              console.log("성공");
              const changedDA = {
                channelId: enteredPostId,    
                userId: loggedRealId,
                departures: completeDA[0],
                departuresLatitude: completeXY[0][0],
                departuresLongitude: completeXY[0][1],
                arrivals: completeDA[1],
                arrivalsLatitude: completeXY[1][0],
                arrivalsLongitude: completeXY[1][1],
              }
              const res = await axios.patch("http://localhost:8080/api/carpools", changedDA, {
                withCredentials: true,
              });
              alert("변경 되었습니다.");
              completeXY = [];
              completeDA = [];

            }
            else
            {
              alert("100미터 이내에 존재하는 주소가 아닙니다.");
              completeXY = [];
              completeDA = [];
            }
          }
          else{
            console.log("이건 버림");
          }
        } else {
          completeXY.push(location);
          completeDA.push(locationName);
          console.log(completeXY);
          console.log(completeDA);
          if(completeXY.length == 2 && completeDA.length == 2)
          {
            let tempArr1 = [];
          let R = 6372.8 * 1000;

          const latD1 = parseFloat(completeXY[0][0]);
          const latD2 = parseFloat(locationMaster[0][0][0]);
          const lonD1 = parseFloat(completeXY[0][1]);
          const lonD2 = parseFloat(locationMaster[0][0][1]);
          let dLat = ((latD2 - latD1) * Math.PI) / 180;
          let dLon = ((lonD2 - lonD1) * Math.PI) / 180;
          let a =
              Math.pow(Math.sin(dLat / 2), 2.0) +
              Math.pow(Math.sin(dLon / 2), 2.0) *
                Math.cos((latD1 * Math.PI) / 180) *
                Math.cos((latD2 * Math.PI) / 180);
            let c = 2 * Math.asin(Math.sqrt(a));
            let finalD = R * c;

          const latA1 = parseFloat(completeXY[1][0]);
          const latA2 = parseFloat(locationMaster[0][1][0]);
          const lonA1 = parseFloat(completeXY[1][1]);
          const lonA2 = parseFloat(locationMaster[0][1][1]);
          let ALat = ((latA2 - latA1) * Math.PI) / 180;
            let ALon = ((lonA2 - lonA1) * Math.PI) / 180;
            let a2 =
              Math.pow(Math.sin(ALat / 2), 2.0) +
              Math.pow(Math.sin(ALon / 2), 2.0) *
                Math.cos((latA1 * Math.PI) / 180) *
                Math.cos((latA2 * Math.PI) / 180);
            let c2 = 2 * Math.asin(Math.sqrt(a2));
            let finalA = R * c2;

            if (finalD <= 100 && finalA <= 100) {

              // tempArr1.push(locationMaster[0][3]);
              console.log(finalD);
              console.log(finalA);
              console.log(completeXY);
              console.log(completeDA);
              console.log("성공");
              const changedDA = {
                channelId: enteredPostId,    
                userId: loggedRealId,
                departures: completeDA[0],
                departuresLatitude: completeXY[0][0],
                departuresLongitude: completeXY[0][1],
                arrivals: completeDA[1],
                arrivalsLatitude: completeXY[1][0],
                arrivalsLongitude: completeXY[1][1],
              }
              const res = await axios.patch("http://localhost:8080/api/carpools", changedDA, {
                withCredentials: true,
              });
              alert("변경 되었습니다.");
              completeXY = [];
              completeDA = [];

            }
            else
            {
              alert("100미터 이내에 존재하는 주소가 아닙니다.");
              completeXY = [];
              completeDA = [];
            }
          }
          else{
            console.log("이건 버림");
          }
        }

        // return res.data;
      } catch (e) {
        console.log("error: " + e);
        alert("검색결과가 없습니다");
        // window.location.reload();
      }
    };

    function displayPlaces(places) {
      if (whichPoint === "start") {
        const listEl = document.getElementById("placesList1");
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          );
          const marker = addMarker(placePosition, i);
          const itemEl = getListItem(i, places[i]);
          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                displayInfowindow(marker, title);
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                infowindow.close();
              }
            );

            itemEl.addEventListener("click", function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch(places[i].place_name);
              setInputStartPoint(places[i].place_name);
              setDeparturesLatitude(places[i].x);
              setDeparturesLongitude(places[i].y);
              setShowListD(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl);
        }

        listEl?.appendChild(fragment);
      } else if (whichPoint === "end") {
        const listEl2 = document.getElementById("placesList2");
        const fragment = document.createDocumentFragment();
        removeAllChildNods(listEl2);
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const placePosition = new window.kakao.maps.LatLng(
            places[i].y,
            places[i].x
          );
          const marker = addMarker(placePosition, i);
          const itemEl2 = getListItem2(i, places[i]);

          (function (marker, title) {
            window.kakao.maps.event.addListener(
              marker,
              "mouseover",
              function () {
                displayInfowindow(marker, title);
              }
            );

            window.kakao.maps.event.addListener(
              marker,
              "mouseout",
              function () {
                infowindow.close();
              }
            );

            itemEl2.addEventListener("click", function (e) {
              displayInfowindow(marker, title);
              setPlace(places[i]);
              setSearch2(places[i].place_name);
              setInputEndPoint(places[i].place_name);
              setArrivalsLatitude(places[i].x);
              setArrivalsLongitude(places[i].y);
              setShowListA(false);

              map.panTo(placePosition);
            });
          })(marker, places[i].place_name);

          fragment.appendChild(itemEl2);
        }
        listEl2?.appendChild(fragment);
      }
    }

    function getListItem(index, places) {
      const el = document.createElement("li");
      el.style.cursor = "pointer";

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el.innerHTML = itemStr;
      el.className = "item";
      // console.log(itemStr);
      return el;
    }

    function getListItem2(index, places) {
      const el2 = document.createElement("li");
      el2.style.cursor = "pointer";

      let itemStr =
        '<span class="markerbg marker_ ' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "    <span>" +
          places.road_address_name +
          "</span>" +
          '   <span class="jibun gray">' +
          `<img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png">
              </img>` +
          places.address_name +
          "</span>";
      } else {
        itemStr += "    <span>" + places.address_name + "</span>";
      }

      itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

      el2.innerHTML = itemStr;
      el2.className = "item";

      return el2;
    }

    function addMarker(position, idx) {
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png";
      const imageSize = new window.kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691),
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
        offset: new window.kakao.maps.Point(13, 37),
      };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      );

      const marker = new window.kakao.maps.Marker({
        position,
        image: markerImage,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    function displayPagination(pagination) {
      let paginationEl = null;
      let paginationEl2 = null;
      if (whichPoint === "start") {
        const pagination1 = pagination;

        paginationEl = document.getElementById("pagination1");
        const fragment = document.createDocumentFragment();

        paginationEl.style.display = "flex";
        paginationEl.style.justifyContent = "center";
        paginationEl.style.marginTop = "-15px";
        while (paginationEl?.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (let i = 1; i <= pagination1.last; i++) {
          const el = document.createElement("a");
          el.style.textDecoration = "none";
          if (i !== pagination1.last) {
            el.style.marginRight = "10px";
          }
          el.href = "#";
          el.innerHTML = String(i);
          el.id = "el" + String(i);
          el.style.color = "black";

          if (i === pagination1.current) {
            el.className = "on";
            el.style.color = "blue";
          } else {
            el.onclick = (function (i) {
              return function () {
                whichPoint = "start";
                pagination1.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl?.appendChild(fragment);
      } else if (whichPoint === "end") {
        const pagination2 = pagination;
        paginationEl2 = document.getElementById("pagination2");
        const fragment = document.createDocumentFragment();

        paginationEl2.style.display = "flex";
        paginationEl2.style.justifyContent = "center";
        paginationEl2.style.marginTop = "-15px";
        while (paginationEl2?.hasChildNodes()) {
          paginationEl2.removeChild(paginationEl2.lastChild);
        }

        for (let i = 1; i <= pagination2.last; i++) {
          const el2 = document.createElement("a");
          el2.style.textDecoration = "none";
          if (i !== pagination2.last) {
            el2.style.marginRight = "10px";
          }
          el2.href = "#";
          el2.innerHTML = String(i);
          el2.id = "el2" + String(i);
          el2.style.color = "black";

          if (i === pagination2.current) {
            el2.className = "on";
            el2.style.color = "blue";
          } else {
            el2.onclick = (function (i) {
              return function () {
                whichPoint = "end";
                pagination2.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el2);
        }
        paginationEl2?.appendChild(fragment);
      }
    }

    function displayInfowindow(marker, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }

    function displayMarker(place) {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });
      window.kakao.maps.event.addListener(
        marker,
        "click",
        function (mouseEvent) {
          setPlace(place);
          infowindow.setContent(`
              <span>
              ${place.place_name}
              </span>
              `);
          infowindow.open(map, marker);
          const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
          map.panTo(moveLatLon);
        }
      );
    }

    setTimeout(function () {
      map.relayout();
    }, 1000);

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;

      var markerPosition = new kakao.maps.LatLng(
        latlng.getLat(),
        latlng.getLng()
      );

      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      kakao.maps.event.addListener(marker, "click", function () {
        marker.setMap(null);
      });

      // if (startPoint === true) {
      //   var stDiv = document.getElementById("stpt");
      //   stDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }
      // if (startPoint === false) {
      //   var edDiv = document.getElementById("edpt");
      //   edDiv.innerHTML = latlng.getLat() + " / " + latlng.getLng();
      // }

      var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다";
    });
  }, [isRoomOn]);





  return (
    <Container>
      <GlobalStyle />
      <Suspense fallback={<PacmanLoader color="#000000" size={25} />}>
        <BoardBox>
          <SearchSection>
            {/* <button onClick={realGetChannelData}>temp</button> */}
            <button
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "15%",
                backgroundColor: "white",
                marginBottom: "8px",
                cursor: "pointer",
                borderStyle: "solid",
                borderColor: "black",
                boxShadow: "none",
                borderWidth: "1px",
              }}
              onClick={realGetChannelData}
            >
              <BiRefresh style={{ marginLeft: "-3.5px" }} />
            </button>
            {/* <Searchbar id="findD" placeholder="출발지"></Searchbar> */}
            {/* <div style={{ marginLeft: "40px" }}>목적지</div> */}
            <Searchbar placeholder="출발지or도착지" onChange={changeWord}></Searchbar>
            <button
              // id="find"
              // type="submit"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "15%",
                backgroundColor: "white",
                marginBottom: "8px",
                // marginLeft: "20px",
                cursor: "pointer",
                borderStyle: "solid",
                borderColor: "black",
                boxShadow: "none",
                borderWidth: "1px",
              }}
              onClick={realSearch}
            >
              <AiOutlineSearch style={{ marginLeft: "-4px" }} />
            </button>
          </SearchSection>
          <Assemble onClick={createChannel}>
            <img
              src={assemble1}
              alt="assemble"
              style={{ marginTop: "2px", height: "32px" }}
            />
          </Assemble>
          <ChannelBox id="channelBox">
            {firstTake === false
              ? channelList.map((channel) => {
                    // console.log(channel);
                    firstCount++;
                    if (firstCount < 10) {
                      return channel.regular === true ? (
                        <Channel2
                          onClick={(e) => {
                            enterChannel2(
                              channel.curPersonnel,
                              channel.postId,
                              channel.hostNickname,
                              channel.departures,
                              channel.departuresLatitude,
                              channel.departuresLongitude,
                              channel.arrivals,
                              channel.arrivalsLatitude,
                              channel.arrivalsLongitude,
                              channel.content,
                              channel.driverId,
                              channel.hostId
                            );
                          }}
                        >
                          <ChannelFirstRow>
                            <FirstItem>
                              <div
                                style={{
                                  fontSize: "30px",
                                  fontStyle: "italic",
                                  fontFamily: "establishRetrosansOTF",
                                }}
                              >
                                출발
                              </div>
                              {channel.departures}
                            </FirstItem>
                            <img
                              src={arrow}
                              alt="arrow"
                              style={{ height: "32px" }}
                            />
                            <FirstItem>
                              <div
                                style={{
                                  fontSize: "30px",
                                  fontStyle: "italic",
                                  fontFamily: "establishRetrosansOTF",
                                }}
                              >
                                도착
                              </div>
                              {channel.arrivals}
                            </FirstItem>
                          </ChannelFirstRow>
                          <PersonnelSticker>
                            인원수 {channel.curPersonnel} / {channel.personnel}{" "}
                          </PersonnelSticker>
                          <ContactTool>
                            <BsMegaphone /> {channel.content}
                          </ContactTool>
                          <RegularSticker>
                            {channel.regular === true ? "정기" : "비정기"}
                          </RegularSticker>
                        </Channel2>
                      )  : (
                        <Channel
                          onClick={(e) => {
                            enterChannel2(
                              channel.curPersonnel,
                              channel.postId,
                              channel.hostNickname,
                              channel.departures,
                              channel.departuresLatitude,
                              channel.departuresLongitude,
                              channel.arrivals,
                              channel.arrivalsLatitude,
                              channel.arrivalsLongitude,
                              channel.content,
                              channel.driverId,
                              channel.hostId
                            );
                          }}
                        >
                          <ChannelFirstRow>
                            <FirstItem>
                              <div
                                style={{
                                  fontSize: "30px",
                                  fontStyle: "italic",
                                  fontFamily: "establishRetrosansOTF",
                                }}
                              >
                                출발
                              </div>
                              {channel.departures}
                            </FirstItem>
                            <img
                              src={arrow}
                              alt="arrow"
                              style={{ height: "32px" }}
                            />
                            <FirstItem>
                              <div
                                style={{
                                  fontSize: "30px",
                                  fontStyle: "italic",
                                  fontFamily: "establishRetrosansOTF",
                                }}
                              >
                                도착
                              </div>
                              {channel.arrivals}
                            </FirstItem>
                          </ChannelFirstRow>
                          <PersonnelSticker>
                            인원수 {channel.curPersonnel} / {channel.personnel}{" "}
                          </PersonnelSticker>
                          <ContactTool>
                            <BsMegaphone /> {channel.content}
                          </ContactTool>
                          <RegularSticker2>
                        {channel.regular === true ? "정기" : "비정기"}
                      </RegularSticker2>
                        </Channel>
                      );
                    }
                  })
              : channelArr.map((channel) => {
                // console.log(channel);
                  return channel.regular === true ? (
                    <Channel2
                      onClick={(e) => {
                        enterChannel2(
                          channel.curPersonnel,
                          channel.postId,
                          channel.hostNickname,
                          channel.departures,
                              channel.departuresLatitude,
                              channel.departuresLongitude,
                              channel.arrivals,
                              channel.arrivalsLatitude,
                              channel.arrivalsLongitude,
                              channel.content,
                              channel.driverId,
                              channel.hostId
                        );
                      }}
                    >
                      <ChannelFirstRow>
                        <FirstItem>
                          <div
                            style={{
                              fontSize: "30px",
                              fontStyle: "italic",
                              fontFamily: "establishRetrosansOTF",
                            }}
                          >
                            출발
                          </div>
                          {channel.departures}
                        </FirstItem>
                        <img
                          src={arrow}
                          alt="arrow"
                          style={{ height: "32px" }}
                        />
                        <FirstItem>
                          <div
                            style={{
                              fontSize: "30px",
                              fontStyle: "italic",
                              fontFamily: "establishRetrosansOTF",
                            }}
                          >
                            도착
                          </div>
                          {channel.arrivals}
                        </FirstItem>
                      </ChannelFirstRow>
                      <PersonnelSticker>
                        인원수 {channel.curPersonnel} / {channel.personnel}{" "}
                      </PersonnelSticker>
                      <ContactTool>
                        <BsMegaphone /> {channel.content}
                      </ContactTool>
                      <RegularSticker>
                        {channel.regular === true ? "정기" : "비정기"}
                      </RegularSticker>
                    </Channel2>
                  ) : (
                    <Channel
                      onClick={(e) => {
                        enterChannel2(
                          channel.curPersonnel,
                          channel.postId,
                          channel.hostNickname,
                          channel.departures,
                              channel.departuresLatitude,
                              channel.departuresLongitude,
                              channel.arrivals,
                              channel.arrivalsLatitude,
                              channel.arrivalsLongitude,
                              channel.content,
                              channel.driverId,
                              channel.hostId
                        );
                      }}
                    >
                      <ChannelFirstRow>
                        <FirstItem>
                          <div
                            style={{
                              fontSize: "30px",
                              fontStyle: "italic",
                              fontFamily: "establishRetrosansOTF",
                            }}
                          >
                            출발
                          </div>
                          {channel.departures}
                        </FirstItem>
                        <img
                          src={arrow}
                          alt="arrow"
                          style={{ height: "32px" }}
                        />
                        <FirstItem>
                          <div
                            style={{
                              fontSize: "30px",
                              fontStyle: "italic",
                              fontFamily: "establishRetrosansOTF",
                            }}
                          >
                            도착
                          </div>
                          {channel.arrivals}
                        </FirstItem>
                      </ChannelFirstRow>
                      <PersonnelSticker>
                        인원수 {channel.curPersonnel} / {channel.personnel}{" "}
                      </PersonnelSticker>
                      <ContactTool>
                        <BsMegaphone /> {channel.content}
                      </ContactTool>
                      <RegularSticker2>
                        {channel.regular === true ? "정기" : "비정기"}
                      </RegularSticker2>
                      {/* <div>{channel.regular === true ? "정기" : "비정기"}</div> */}
                    </Channel>
                  );
                })}
            {isRoomOn === true &&
              (isMaster ? (
                <RoomContainer>
                  <Room id="room">
                    <ButtonX3 onClick={closeRoom}>X</ButtonX3>
                    <div>방장: {roomHost}</div>
                    <div>출발지: {roomDeparture} </div>
                    <div>목적지: {roomArrival} </div>
                    <div>
                      운전자: {roomDriver === null ? "없음" : roomDriver}
                    </div>
                    <div>
                      소통창구: {contentEdit === false ? (<>{roomContent} <span><button onClick={editSwitch}>편집</button></span></>) : <><span><input placeholder={roomContent} onChange={changeWord2}></input></span> <span><button onClick={editSwitch}>편집</button></span></>} 
                    </div>
                    
                    <div style={{ zIndex : 7}}>
                      탑승자:<RoomPeopleBox>{roomPeople.sort().map((people) => {
                        usersCount++;
                        if (usersCount === roomPeople.length)
                          return (<>
                          <RoomPeople id={people[1]} onClick={generateProfileBox}>{people[0]}
                          <HiddenInfo id={`hidden_${people[1]}`}><div>{people[2]}</div>
                          <div>{people[3]}</div></HiddenInfo></RoomPeople>
                          </>);
                        else return (<><RoomPeople id={people[1]} onClick={generateProfileBox}> {people[0]} 
                        <HiddenInfo id={`hidden_${people[1]}`}><div>{people[2]}</div>
                          <div>{people[3]}</div></HiddenInfo></RoomPeople>
                        </>);
                      })}</RoomPeopleBox>
                    </div>
                    
                  </Room>
                </RoomContainer>
              ) : (
                <RoomContainer>
                  <Room id="room">
                    <ButtonX3 onClick={closeRoom}>X</ButtonX3>
                    <div style={{marginBottom: "10px"}}>방장: {roomHost}</div>
                    <div style={{marginBottom: "10px"}}>출발지: {roomDeparture} </div>
                    <div style={{marginBottom: "10px"}}>목적지: {roomArrival} </div>
                    <div style={{marginBottom: "10px"}}>
                      운전자: {roomDriver === null ? "없음" : roomDriver}
                    </div>
                    <div style={{marginBottom: "10px"}}>
                      소통창구: {roomContent}
                    </div>
                    <div style={{marginBottom: "10px"}}>개인 출발지 / 도착지 지정하기 </div>
                    <span><input id="findD"></input></span>
                    <span><input id="findA"></input></span>
                    <span><button id="find">변경</button></span>
                    
                    <div style={{marginBottom: "10px"}}>
                      탑승자:<RoomPeopleBox>{roomPeople.sort().map((people) => {
                        usersCount++;
                        if (usersCount === roomPeople.length)
                          return (<>
                          <RoomPeople id={people[1]} onClick={generateProfileBox}>{people[0]}
                          <HiddenInfo id={`hidden_${people[1]}`}><div>{people[2]}</div>
                          <div>{people[3]}</div></HiddenInfo></RoomPeople>
                          </>);
                        else return (<><RoomPeople id={people[1]} onClick={generateProfileBox}> {people[0]} 
                        <HiddenInfo id={`hidden_${people[1]}`}><div>{people[2]}</div>
                          <div>{people[3]}</div></HiddenInfo>
                        </RoomPeople>
                        </>);
                      })}</RoomPeopleBox>  
                    </div>
                  </Room>
                </RoomContainer>
              ))}
            <ModalContainer id="modalbox">
              <ModalBox>
                <ButtonX1 onClick={closeCreateChannel}>X</ButtonX1>
                <FirstRow>
                  <StartPoint>
                    <div>&lt;출발지&gt;</div>
                    {/* <div id="stpt"></div> */}
                    <div id="form">
                      <input
                        type="text"
                        value={search}
                        id="keyword1"
                        style={{ width: "50px" }}
                        onChange={onChangeSearch}
                        onKeyPress={handleOnKeyPress}
                      />
                      <button className="start" id="submit_btn1" type="submit">
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {showListD ? (
                      <SubModal>
                        <ButtonX2 onClick={closeSubModal}>X</ButtonX2>
                        <PlaceList id="placesList1"></PlaceList>
                        <Pagination id="pagination1"></Pagination>
                      </SubModal>
                    ) : (
                      <div></div>
                    )}
                  </StartPoint>
                  <KakaoMap id="map" searchPlace={place}></KakaoMap>
                  <EndPoint>
                    &lt;도착지&gt;
                    <div id="form">
                      <input
                        type="text"
                        value={search2}
                        id="keyword2"
                        style={{ width: "50px" }}
                        onChange={onChangeSearch2}
                        onKeyPress={handleOnKeyPress}
                      />
                      <button className="end" id="submit_btn2" type="submit">
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {showListA ? (
                      <SubModal2>
                        <ButtonX2 onClick={closeSubModal2}>X</ButtonX2>
                        <PlaceList id="placesList2"></PlaceList>
                        <Pagination id="pagination2"></Pagination>
                      </SubModal2>
                    ) : (
                      <div></div>
                    )}
                  </EndPoint>
                </FirstRow>
                <SecondRow>
                  <div></div>
                  <div>운전자입니까? </div>
                  <div>
                    네
                    <input
                      type="radio"
                      name="driverCheck"
                      value="true"
                      onChange={driverChange}
                    />
                    아니오
                    <input
                      type="radio"
                      name="driverCheck"
                      value="false"
                      defaultChecked="true"
                      onChange={driverChange}
                    />
                  </div>

                  <div>
                    정기
                    <input
                      type="radio"
                      name="genderCheck"
                      value="true"
                      defaultChecked={regular === true ? true : false}
                      onChange={regularChange}
                    />
                    비정기
                    <input
                      type="radio"
                      name="genderCheck"
                      value="false"
                      defaultChecked={regular === false ? true : false}
                      onChange={regularChange}
                    />
                  </div>
                  <div>
                    참가인원제한
                    <input
                      type="number"
                      min="2"
                      max="47"
                      onChange={personnelChange}
                    ></input>
                  </div>
                  {/* 인원제한이랑 인원수랑 구분해야함 */}
                  <div>
                    참고사항
                    <input onChange={contentChange}></input>
                  </div>
                </SecondRow>
                <button onClick={openChannel2}>채널생성</button>
              </ModalBox>
            </ModalContainer>
          </ChannelBox>
          <ChannelPages>{flag === false ? pageGenerator() : searchPageGenerator()}</ChannelPages>
        </BoardBox>
      </Suspense>
    </Container>
  );
};

export default Board;
