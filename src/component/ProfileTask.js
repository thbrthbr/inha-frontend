import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ProfileStore, MasterStore2, MasterStore3 } from "./store/store.js";
import PacmanLoader from "react-spinners/PacmanLoader";
import { BiPencil } from "react-icons/bi";

const Uramen = styled.div`
  width: 1048px;
  height: 450px;
  background-color: white;
  border: 2px solid orange;
  margin-top: -2px;
`

const ProfileContainer = styled.div`
margin-left: 111.5px;
background-color: white;

margin-top: -2px;
height: 380px;
width: 936px;
padding-top: 70px;
border: 2px solid blue;
// position: relative;
`

const ProfileBox1 = styled.div`
// padding-top: 100px;
  padding: 10px;
  font-size: 30px;
  font-family: 'S-CoreDream-3Light';
  margin-left: 150px;
  // border: 0.5px solid #c0c0c0;
  width: 600px;
  height: 300px;
  display: grid;
  background-color: white;
  

  // grid-template-areas:
  //   "nickname gender level"
  //   "point    haveCar    rate";
`;

const ProfileBox2 = styled.div`
padding: 10px;
font-family: 'S-CoreDream-3Light';
margin-left: 150px;
  background-color: white;
  // border: 0.5px solid #c0c0c0;
  width: 600px;
  height: 300px;
  display: grid;
  // grid-template-areas:
  //   "nickname gender level"
  //   "point    haveCar    rate";
`;

const Nickname = styled.div`
  // grid-area: nickname;
`;
const Gender = styled.div`
  // grid-area: gender;
`;
const PhoneNumber = styled.div`
  // grid-area: level;
`;
const Point = styled.div`
  // grid-area: point;
`;
const HaveCar = styled.div`
  // grid-area: haveCar;
`;

const IsDriver = styled.div`
  // grid-area: haveCar;
`;

const Rate = styled.div`
  // grid-area: rate;
`;


const ProfileTask = (props) => {
  const {
    id,
    setId,
    nickname,
    setNickname,
    setGender,
    setPhoneNumber,
    setRating,
    setMileage,
    setCarPoolCount,
    setCanDrive,
    setOwnCar,
    gender,
    phoneNumber,
    ownCar,
    canDrive,
    rating,
    mileage,
    carPoolCount,
    switchOn,
    setSwitchOn,
    phoneF,
    setPhoneF,
    phoneS,
    setPhoneS,
    phoneT,
    setPhoneT
  } = ProfileStore();
  const { loggedRealId } = MasterStore3();
  const { setLoggedId, loggedId } = MasterStore2();

  const modifty = () => {
    if (switchOn === false) {
      setSwitchOn(true);
      patchUserData();
      console.log(switchOn);
    }
    if (switchOn === true) {
      setSwitchOn(false);
      console.log(switchOn);
    }
    
  };

  const nickNameChange = (e) => {
    setNickname(e.currentTarget.value);
    console.log(nickname);
  };

  const genderChange = (e) => {
    if(e.currentTarget.value === "true")
    {
      setGender(e.currentTarget.value);
    }
    else{
      setGender(e.currentTarget.value);
    }
    // setGender(e.currentTarget.value);
    console.log(gender);
  };

  const phoneNumberChange = (e) => {
    setPhoneNumber(e.currentTarget.value);
    console.log(phoneNumber);
  };

  const phoneChange = (e) => {
    if (e.target.id === "first") {
      setPhoneF(e.target.value);
    }
    if (e.target.id === "second") {
      setPhoneS(e.target.value);
    }
    if (e.target.id === "third") {
      setPhoneT(e.target.value);
    }
  };

  const hasCarChange = (e) => {
    if(e.currentTarget.value === "yes")
    {
      setOwnCar(true);
    }
    else{
      setOwnCar(false);
    }
    console.log(ownCar);
  };

  const isDriverChange = (e) => {
    if(e.currentTarget.value === "yes")
    {
      setCanDrive(true);
    }
    else{
      setCanDrive(false);
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/users/${loggedRealId}?userId=${loggedRealId}`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      const data = res.data.data;
      setNickname(data.nickname);
      setPhoneNumber(data.cellphone);
      setRating(data.rating);
      setCarPoolCount(data.carpoolCount);
      setGender(data.sex);
      setOwnCar(data.ownCar);
      setMileage(data.point);
      setCanDrive(data.driving);

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const patchUserData = async () => {
    try {
      const updateDataObj = {
        userId: loggedRealId,
        nickname: nickname,
        cellphone: phoneF + "-" + phoneS + "-" + phoneT,
        ownCar: ownCar,
        driving: canDrive
      };
      const res = await axios.patch(
        "http://localhost:8080/api/users",
        updateDataObj,
        {
          withCredentials: true,
        }
      );
      setLoggedId(nickname);
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Uramen>
      <ProfileContainer>
        <div style={{position: "absolute", marginTop: "-71px",  width: "115px", height: "200px", backgroundColor: "white"}}></div>
      {switchOn === true ? (
        <ProfileBox1>
          <Nickname>닉네임: {nickname}</Nickname>
          <Gender>성별: {gender === false ? "여자" : "남자"}</Gender>
          <PhoneNumber>전화번호: {phoneNumber}</PhoneNumber>
          <Point>포인트: {mileage}</Point>
          <IsDriver>운전가능여부: {canDrive === false ? "불가" : "가능"}</IsDriver>
          <HaveCar>자차보유: {ownCar === false ? "미보유" : "보유"}</HaveCar>
          <Rate>평점: {rating}</Rate>
        </ProfileBox1>
      ) : (
        <ProfileBox2>
          <Nickname>
            닉네임: <input style={{
                      // width: "30px",
                      // marginRight: "5px",
                      // marginLeft: "5px",
                      borderColor: "black",
                      borderRadius: "5px"
                    }} onChange={nickNameChange}></input>
          </Nickname>
          <Gender>
            <div>성별:</div>
            <input
              type="radio"
              name="genderCheck"
              value="male"
              // defaultChecked={gender === "male" ? true : false}
              // checked={gender === "male" ? true : false}
              onChange={genderChange}
            />
            남자
            <input
              type="radio"
              name="genderCheck"
              value="female"
              // defaultChecked={gender === "female" ? true : false}
              // checked={gender === "female" ? true : false}
              onChange={genderChange}
            />
            여자
          </Gender>
          <PhoneNumber>
            전화번호: 
            <input
                    style={{
                      width: "30px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black",
                      borderRadius: "5px"
                    }}
                    id="first"
                    onChange={phoneChange}
                  ></input>
                  -
                  <input
                    style={{
                      width: "40px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black",
                      borderRadius: "5px"
                    }}
                    id="second"
                    onChange={phoneChange}
                  ></input>
                  -
                  <input
                    style={{
                      width: "40px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black",
                      borderRadius: "5px"
                    }}
                    id="third"
                    onChange={phoneChange}
                  ></input>
            {/* <input onChange={phoneNumberChange}></input> */}
          </PhoneNumber>
          <IsDriver>
          <div>운전가능여부:</div>
            <input
              type="radio"
              name="isDriver"
              value="yes"
              // defaultChecked={ownCar === "male" ? true : false}
              // checked={canDrive === "yes" ? true : false}
              onChange={isDriverChange}
            />
            가능
            <input
              type="radio"
              name="isDriver"
              value="no"
              // defaultChecked={gender === "female" ? true : false}
              // checked={canDrive === "no" ? true : false}
              onChange={isDriverChange}
            />
            미보유
          </IsDriver>
          <HaveCar>
            <div>자차보유:</div>
            <input
              type="radio"
              name="hasCarCheck"
              value="yes"
              // defaultChecked={ownCar === "male" ? true : false}
              // checked={ownCar === "yes" ? true : false}
              onChange={hasCarChange}
            />
            불가
            <input
              type="radio"
              name="hasCarCheck"
              value="no"
              // defaultChecked={gender === "female" ? true : false}
              // checked={ownCar === "no" ? true : false}
              onChange={hasCarChange}
            />
            미보유
             {/* <input onChange={isCarChange}></input> */}
          </HaveCar>
          
        </ProfileBox2>
      )}
      <button style={{borderRadius: "50%", cursor:"pointer", backgroundColor: "white", marginTop: "-60px", marginLeft: "735px", height: "50px", width: "50px", position: "absolute"}} onClick={modifty}><BiPencil style={{fontSize: "20px"}}/></button>
    </ProfileContainer>
    </Uramen>
    
  );
};

export default ProfileTask;
