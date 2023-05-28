import React, { useEffect, useState, Suspense } from "react";
// import { useIsFocused } from "@react-navigation/native";
import styled from "styled-components";
import axios from "axios";
import { ChannelStore, ProfileStore } from "./store/store.js";
import assemble from "./img/assemble2.jpg";
import PacmanLoader from "react-spinners/PacmanLoader";
import qs from "qs";

const Container = styled.div``;

const BoardBox = styled.div`
  // border: 0.5px solid #c0c0c0;
  height: 600px;
  width: 1048px;
  margin-left: 10px;
`;

const SearchSection = styled.div`
  display: flex;
  flex-direction: colmun;
`;

const Searchbar = styled.input`
  margin-bottom: 10px;
`;

const Searchbar2 = styled.input`
  margin-bottom: 10px;
`;

const ChannelBox = styled.div`
  position: relative;
`;

const Channel = styled.div`
  border: 0.5px solid #c0c0c0;
  // height: 100px;
  width: 800px;
  margin-left: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const RoomContainer = styled.div`
  position: absolute;
  top: 0%;
  margin-top: -500px;
  margin-left: -50px;
  // left: 0%;
  // display: none;
  width: 2000px;
  height: 2000px;
  background-color: rgba(0, 0, 0, 0.5);
  // background-color: red;
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
  border: 0.5px solid #c0c0c0;
  top: 15%;
  position: fixed;
  height: 500px;
  width: 500px;
  margin-left: 300px;
  background-color: white;
  // z-index: 5;
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
  margin-left: 480px;
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
  margin-left: 475px;
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  background-color: white;
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
  width: 60px;
  height: 60px;
  z-index: 5;
  right: 2%;
  bottom: 2%;
  background-color: #ffc0cb;
  border-radius: 50%;
  border: none;
  cursor: pointer;
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
  // display = "flex";
  // justify-content = "space-between";
  // margin-top = "-10px";
`;

const ChannelPages = styled.div`
  width: 1248px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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

  const { nickname } = ProfileStore();
  const {
    channelList,
    setChannelList,
    channelArr,
    setChannelArr,
    addChannelArr,
    startPoint,
    setStartPoint,
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
  } = ChannelStore();

  const createChannel = () => {
    document.getElementById("modalbox").style.display = "block";
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    // width: 100%;`;
  };
  const closeCreateChannel = () => {
    document.getElementById("modalbox").style.display = "none";
    const scrollY = document.body.style.top;
    document.body.style.cssText = "";
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
    setIsRoomOn(false);
  };

  const reload = (event) => {
    setRender(!render);
  };

  const reload2 = async (event) => {
    try {
      // setRender(!render);
      console.log("셋째트염");
      const res = await axios.get("http://localhost:4000/posts");
      // 진짜 서버 연결하면 수정해야하는 부분 @@@@
      document.getElementById(`${1}`).style.color = "blue";
      channelNum = res.data.length;
      channelPages =
        channelNum % 10 === 0
          ? Math.floor(channelNum / 10)
          : Math.floor(channelNum / 10) + 1;
      setChannelPg(channelPages);
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
        addChannelArr(tempArr);
        console.log(channelArr);
        tempArr = [];
      }
      window.scrollTo(0, 0);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const driverChange = (e) => {
    if (e.target.value === "true") {
      setDriverExsist(true);
    } else {
      setDriverExsist(false);
    }
  };

  //@@@@@@@@@@@@@@@@@@@@@@@@@@
  const enterChannel = async (personnel, channelId) => {
    try {
      const parsing = parseInt(channelId);
      setIsRoomOn(true);
      const sum = parseInt(personnel) + 1;
      const personnelPlus = {
        personnel: sum,
      };

      const res1 = await axios.get(
        `http://localhost:4000/carpools?carpoolId=${channelId}`
      );

      console.log(res1.data);

      const res2 = await axios({
        method: "patch",
        url: `http://localhost:4000/posts/${parsing}`,
        data: personnelPlus,
        headers: { "Content-Type": "application/json" },
      });

      return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };
  //@@@@@@@@@@@@@@@@@@@@@@@@@@

  const getChannelData = async () => {
    try {
      // window.location.reload();
      console.log(channelArr);
      console.log("첫트염");
      console.log(channelCount);
      setPageNum(0);
      const res = await axios.get("http://localhost:4000/posts");
      setChannelCount(res.data.length);
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
      document.getElementById("1").style.color = "blue";
      setChannelList(res.data);
      setFirstTake(true);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const getPageChannel = async (e) => {
    try {
      console.log("둘째트염");
      // setChannelArr([]);
      const res = await axios.get("http://localhost:4000/posts");
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
      window.scrollTo(0, 0);
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
        userId: "2", // 로그인 구현 후 수정
        channelId: "2",
        title: "2",
        departures: inputStartPoint,
        departuresLatitude: departuresLatitude,
        departuresLongitude: departuresLongitude,
        arrivals: inputEndPoint,
        arrivalsLatitude: arrivalsLatitude,
        arrivalsLongitude: arrivalsLongitude,
        personnel: 11,
        content: content,
        regular: driverExsist === true ? nickname : null,
        carpoolDate: "2",
        driverId: nickname,
      };
      const res = await axios.post("http://localhost:4000/posts", channelData);

      setInputStartPoint(null);
      setInputEndPoint(null);

      window.location.reload();

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  let whichPoint = null;

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
        pageArr.push(
          <span
            id={i}
            style={{
              size: "30px",
              cursor: "pointer",
              marginRight: "20px",
            }}
            onClick={getPageChannel}
          >
            {i}
          </span>
        );
      } else {
        pageArr.push(
          <span
            id={i}
            style={{
              size: "30px",
              cursor: "pointer",
            }}
            onClick={getPageChannel}
          >
            {i}
          </span>
        );
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
        const res = await axios.get("http://localhost:4000/posts");
        // let paginationElD = null;
        // let paginationElA = null;
        if (DorA === "findD") {
          completeXY.push(location);
          completeDA.push(locationName);
          // for (let i = 0; i < res.data.length; i++) {
          //   let tempArr = [];
          //   tempArr.push(res.data[i].arrivalsLatitude);
          //   tempArr.push(res.data[i].arrivalsLongtitude);
          //   dbLocation.push(tempArr);
          // }
          // console.log(dbLocation);
          // console.log(res.data);
        } else {
          completeXY.push(location);
          completeDA.push(locationName);
          console.log(completeXY);
          const dbLocation = [];
          for (let i = 0; i < res.data.length; i++) {
            let tempArrD = [];
            let tempArrA = [];
            tempArrD.push(res.data[i].departuresLatitude);
            tempArrD.push(res.data[i].departuresLongitude);
            tempArrA.push(res.data[i].arrivalsLatitude);
            tempArrA.push(res.data[i].arrivalsLongitude);
            dbLocation.push([
              tempArrD,
              tempArrA,
              [res.data[i].departures, res.data[i].arrivals],
            ]);
            // [0] == [2][0] / [1] == [2][1]
          }
          console.log(dbLocation);
          for (let i = 0; i < dbLocation.length; i++) {
            //여기에 위도경도 로직구현
          }
        }

        return res.data;
      } catch (e) {
        console.log("error: " + e);
      }
    };

    // const searchChannel = async (data, pagination, DorA) => {
    //   try {
    //     // const res = await axios.get("http://localhost:4000/carpools");
    //     // 진짜 서버 연결하면 수정해야하는 부분 @@@@
    //     let paginationElD = null;
    //     let paginationElA = null;
    //     if (DorA === "findD") {
    //       const dataD = data;
    //       const paginationD = pagination;

    //       const listElD = document.getElementById("invisible1");
    //       const fragmentD = document.createDocumentFragment();
    //       removeAllChildNods(listElD);
    //       for (let i = 0; i < dataD.length; i++) {
    //         const itemElD = getListItem(i, dataD[i]);
    //         fragmentD.appendChild(itemElD);
    //       }

    //       listElD?.appendChild(fragmentD);

    //       // const pagination1 = pagination;

    //       paginationElD = document.getElementById("invisible1Sub");
    //       // const fragmentD = document.createDocumentFragment();
    //       while (paginationElD?.hasChildNodes()) {
    //         paginationElD.removeChild(paginationElD.lastChild);
    //       }

    //       for (let i = 1; i <= paginationD.last; i++) {
    //         const elD = document.createElement("a");
    //         elD.href = "#";
    //         elD.innerHTML = String(i);

    //         if (i === paginationD.current) {
    //           elD.className = "on";
    //         } else {
    //           elD.onclick = setTimeout(
    //             (function (i) {
    //               return function () {
    //                 paginationD.gotoPage(i);
    //                 return false;
    //               };
    //             })(i),
    //             1000
    //           );
    //         }

    //         fragmentD.appendChild(elD);
    //       }
    //       paginationElD?.appendChild(fragmentD);
    //       // console.log(paginationElD.children);

    //       let k = 1;
    //       Array.from(paginationElD.children).map((link) => {
    //         // pagination.current = k;
    //         setTimeout(link.click(), 1000);
    //         Array.from(listElD.children).map((item) => {
    //           startArround.push(
    //             item.lastChild.firstChild.nextElementSibling.childNodes[0].data
    //           );
    //         });
    //         k++;
    //       });

    //       // Array.from(listElD.children).map((item) => {
    //       //   startArround.push(
    //       //     item.lastChild.firstChild.nextElementSibling.childNodes[0].data
    //       //   );
    //       // });

    //       // console.log(listElD.children);
    //       // for (let i = 1; i <= paginationD.last; i++) {
    //       //   Array.from(listElD.children).map((item) => {
    //       //     startArround.push(
    //       //       item.lastChild.firstChild.nextElementSibling.childNodes[0].data
    //       //     );
    //       //   });
    //       //   if (i < paginationD.last)
    //       //     document.getElementById("invisible1Sub").click();
    //       // }
    //       let num2 = new Set(startArround);
    //       startArround = Array.from(num2);
    //       console.log(startArround);
    //     } else {
    //       const dataA = data;
    //       const paginationA = pagination;

    //       const listElA = document.getElementById("invisible1");
    //       const fragmentA = document.createDocumentFragment();
    //       removeAllChildNods(listElA);
    //       for (let i = 0; i < dataA.length; i++) {
    //         const itemElD = getListItem(i, dataA[i]);
    //         fragmentA.appendChild(itemElD);
    //       }

    //       listElA?.appendChild(fragmentA);

    //       paginationElA = document.getElementById("invisible2Sub");
    //       // const fragmentD = document.createDocumentFragment();
    //       while (paginationElA?.hasChildNodes()) {
    //         paginationElA.removeChild(paginationElA.lastChild);
    //       }

    //       for (let i = 1; i <= paginationA.last; i++) {
    //         const elA = document.createElement("a");
    //         elA.href = "#";
    //         elA.innerHTML = String(i);

    //         if (i === paginationA.current) {
    //           elA.className = "on";
    //         } else {
    //           listElA.onclick = (function (i) {
    //             return function () {
    //               paginationA.gotoPage(i);
    //             };
    //           })(i);
    //         }

    //         fragmentA.appendChild(elA);
    //       }
    //       paginationElA?.appendChild(fragmentA);
    //     }

    //     // return res.data;
    //   } catch (e) {
    //     console.log("error: " + e);
    //   }
    // };

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
          if (i == 1) {
            el.style.color = "blue";
          } else {
            el.style.color = "black";
          }
          if (i !== pagination1.last) {
            el.style.marginRight = "10px";
          }
          el.href = "#";
          el.innerHTML = String(i);

          if (i === pagination1.current) {
            el.className = "on";
          } else {
            el.onclick = (function (i) {
              return function () {
                whichPoint = "start";
                pagination1.gotoPage(i);
                el.style.color = "red";
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
          if (i == 1) {
            el2.style.color = "blue";
          } else {
            el2.style.color = "black";
          }
          if (i !== pagination2.last) {
            el2.style.marginRight = "10px";
          }
          el2.href = "#";
          el2.innerHTML = String(i);

          if (i === pagination2.current) {
            el2.className = "on";
          } else {
            el2.onclick = (function (i) {
              return function () {
                whichPoint = "end";
                pagination2.gotoPage(i);
                el2.style.color = "red";
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

  // const isFocused = useIsFocused();

  useEffect(() => {
    getChannelData();
    console.log("된거니");
  }, []);

  const check = () => {
    console.log(channelList);
    console.log(channelArr[pageNum].slice(0).reverse());
    console.log(typeof pageNum);
  };

  return (
    <Container>
      <Suspense fallback={<PacmanLoader color="#000000" size={25} />}>
        <BoardBox>
          <SearchSection>
            <div style={{ marginLeft: "285px" }}>출발지</div>
            <Searchbar id="findD"></Searchbar>
            <div style={{ marginLeft: "40px" }}>목적지</div>
            <Searchbar2 id="findA"></Searchbar2>
            <button
              id="find"
              style={{ marginBottom: "8px", marginLeft: "20px" }}
            >
              검색
            </button>
          </SearchSection>
          <Assemble onClick={createChannel}>
            <img
              src={assemble}
              alt="assemble"
              style={{ marginTop: "2px", height: "32px" }}
            />
          </Assemble>
          <ChannelBox>
            {firstTake === false
              ? channelList
                  .slice(0)
                  .reverse()
                  .map((channel) => {
                    firstCount++;
                    if (firstCount < 10) {
                      return (
                        <Channel
                          onClick={(e) => {
                            enterChannel(channel.personnel, channel.id);
                          }}
                        >
                          <div>출발지 {channel.departures}</div>
                          <div>도착지 {channel.arrivals}</div>
                          <div>인원수 0 / {channel.personnel} </div>
                          <div>참고사항: {channel.content}</div>
                          <div>
                            {channel.regular === true ? "정기" : "비정기"}
                          </div>
                        </Channel>
                      );
                    }
                  })
              : channelArr[pageNum].map((channel) => {
                  return (
                    <Channel
                      onClick={(e) => {
                        enterChannel(channel.personnel, channel.id);
                      }}
                    >
                      <div>출발지 {channel.departures}</div>
                      <div>도착지 {channel.arrivals}</div>
                      <div>인원수 0 / {channel.personnel} </div>
                      <div>참고사항: {channel.content}</div>
                      <div>{channel.regular === true ? "정기" : "비정기"}</div>
                    </Channel>
                  );
                })}
            {isRoomOn === true ? (
              <RoomContainer>
                <Room>
                  <ButtonX3 onClick={closeRoom}>X</ButtonX3>
                </Room>
              </RoomContainer>
            ) : null}
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
                        검색
                        {/* <S.SearchIcon /> */}
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
                        검색
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
                    <input type="number" min="2" max="47"></input>
                  </div>
                  {/* 인원제한이랑 인원수랑 구분해야함 */}
                  <div>
                    참고사항
                    <input onChange={contentChange}></input>
                  </div>
                </SecondRow>
                <button onClick={openChannel}>채널생성</button>
              </ModalBox>
            </ModalContainer>
          </ChannelBox>
          <ChannelPages>{pageGenerator()}</ChannelPages>
        </BoardBox>
      </Suspense>
    </Container>
  );
};

export default Board;
