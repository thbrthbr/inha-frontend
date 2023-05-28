import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ProfileStore } from "./store/store.js";
import PacmanLoader from "react-spinners/PacmanLoader";

const ProfileBox1 = styled.div`
  border: 0.5px solid #c0c0c0;
  width: 600px;
  height: 300px;
  display: grid;
  grid-template-areas:
    "nickname gender level"
    "point    haveCar    rate";
`;

const ProfileBox2 = styled.div`
  border: 0.5px solid #c0c0c0;
  width: 600px;
  height: 300px;
  display: grid;
  grid-template-areas:
    "nickname gender level"
    "point    haveCar    rate";
`;

const Nickname = styled.div`
  grid-area: nickname;
`;
const Gender = styled.div`
  grid-area: gender;
`;
const PhoneNumber = styled.div`
  grid-area: level;
`;
const Point = styled.div`
  grid-area: point;
`;
const HaveCar = styled.div`
  grid-area: haveCar;
`;
const Rate = styled.div`
  grid-area: rate;
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
  } = ProfileStore();

  const modifty = () => {
    if (switchOn === false) {
      setSwitchOn(true);
      console.log(switchOn);
    }
    if (switchOn === true) {
      setSwitchOn(false);
      console.log(switchOn);
    }
    patchUserData();
  };

  const nickNameChange = (e) => {
    setNickname(e.currentTarget.value);
    console.log(nickname);
  };

  const genderChange = (e) => {
    setGender(e.currentTarget.value);
    console.log(gender);
  };

  const phoneNumberChange = (e) => {
    setPhoneNumber(e.currentTarget.value);
    console.log(phoneNumber);
  };

  const isCarChange = (e) => {
    setOwnCar(e.currentTarget.value);
    console.log(ownCar);
  };

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");
      console.log(res.data);
      const data = res.data;
      setNickname(data[0]["nickname"]);
      setPhoneNumber(data[0]["phoneNumber"]);
      setRating(data[0]["rating"]);
      setCarPoolCount(data[0]["carPoolCount"]);
      setGender(data[0]["gender"]);
      setOwnCar(data[0]["ownCar"]);
      setMileage(data[0]["mileage"]);

      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const patchUserData = async () => {
    try {
      const updateDataObj = {
        nickname: nickname,
        gender: gender,
        phoneNumber: phoneNumber,
        ownCar: ownCar,
        rating: rating,
        mileage: mileage,
      };
      const res = await axios.patch(
        "http://localhost:4000/users/1",
        updateDataObj
      );
      return res.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {switchOn === true ? (
        <ProfileBox1>
          <Nickname>닉네임: {nickname}</Nickname>
          <Gender>성별: {gender}</Gender>
          <PhoneNumber>전화번호: {phoneNumber}</PhoneNumber>
          <Point>포인트: {mileage}</Point>
          <HaveCar>자차보유: {ownCar}</HaveCar>
          <Rate>평점: {rating}</Rate>
        </ProfileBox1>
      ) : (
        <ProfileBox2>
          <Nickname>
            닉네임: <input onChange={nickNameChange}></input>
          </Nickname>
          <Gender>
            <div>성별:</div>
            <input
              type="radio"
              name="genderCheck"
              value="male"
              defaultChecked={gender === "male" ? true : false}
              checked={gender === "male" ? true : false}
              onChange={genderChange}
            />
            남자
            <input
              type="radio"
              name="genderCheck"
              value="female"
              defaultChecked={gender === "female" ? true : false}
              checked={gender === "female" ? true : false}
              onChange={genderChange}
            />
            여자
          </Gender>
          <PhoneNumber>
            전화번호: <input onChange={phoneNumberChange}></input>
          </PhoneNumber>
          <HaveCar>
            자차보유: <input onChange={isCarChange}></input>
          </HaveCar>
        </ProfileBox2>
      )}
      <button onClick={modifty}>프로필수정</button>
    </>
  );
};

export default ProfileTask;
