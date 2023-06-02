import React from "react";
import styled from "styled-components";
import logoImg from "./img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginStore,
  MasterStore,
  MasterStore2,
  MasterStore3,
} from "./store/store.js";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  margin-top: 200px;
  margin-right: 50px;
  border: 0.5px solid #c0c0c0;
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
  margin-top: 10px;
`;

const SigninButton = styled.button`
  margin-top: 10px;
`;

const SignInInput = styled.input`
  margin-bottom: 5px;
`;

const ChoiceBox = styled.div`
  display: flex;
  // flex-direction: column;
  margin-bottom: 5px;
`;

const Main = (props) => {
  const movePage = useNavigate();
  const {
    isSignIn,
    setIsSignIn,
    id,
    setId,
    password,
    setPassword,
    nickname,
    setNickname,
    name,
    setName,
    gender,
    setGender,
    phone,
    setPhone,
    birthdate,
    setBirthdate,
    isDriver,
    setIsDriver,
    ownCar,
    setOwnCar,
  } = LoginStore();

  const { loggedin, setLoggedin } = MasterStore();
  const { loggedId, setLoggedId } = MasterStore2();
  const { loggedRealId, setLoggedRealId } = MasterStore3();

  const startSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const idChange = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const nicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const genderChange = (e) => {
    setGender(e.target.value);
  };

  const phoneChange = (e) => {
    setPhone(e.target.value);
  };

  const birthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const isDriverChange = (e) => {
    setIsDriver(e.target.value);
  };

  const ownCarChange = (e) => {
    setOwnCar(e.target.value);
  };

  const signInRequest = async () => {
    try {
      const res = await axios.post(
        `http://localhost:4000/join`,
        {
          realId: id,
          password: password,
          name: name,
          nickname: nickname,
          sex: gender,
          cellphone: phone,
          birthdayDate: birthdate,
          ownCar: ownCar,
          driving: isDriver,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.httpStatus === "OK") {
        alert("회원가입에 성공하셨습니다");
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const logInRequest = async () => {
    try {
      const res = await axios.post(
        "/loginProc",
        {
          realId: id,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      // 나중에 다시 확인
      if (res.status === "200") {
        alert("로그인 되셨습니다");
      }
    } catch (e) {
      alert("로그인 실패");
      console.log("error: " + e);
    }
  };

  const kariLogInRequest = async (e) => {
    try {
      // e.preventDefault();
      const res = await axios.get(`http://localhost:4000/joins`);

      console.log(res);
      // const temp = {
      //   realId: 0,
      //   password: password,
      // };

      // const res = axios({
      //   url: `http://localhost:4000/joins`,
      //   method: "post",
      //   temp,
      // });

      // console.log(res);
      // console.log(res.ok);
      // let resFix = await res.json();
      // console.log(resFix);

      // if (res.ok) {
      //   let resFix = await res.json();
      //   console.log(resFix);
      //   // let count = 0;
      //   // for (let i = 0; i < resFix.data.length; i++) {
      //   //   if (resFix.data.realId === id) {
      //   //     alert("로그인 되셨습니다");
      //   //     count++;
      //   //   }
      //   // }
      //   // if (count === 0) {
      //   //   alert("로그인 실패");
      //   //   window.location.reload();
      //   // }
      // } else {
      //   console.log(res.ok);
      //   console.log("왜안돼");
      // }

      // 나중에 다시 확인

      let count = 0;
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].realId === id) {
          if (res.data[i].password === password) {
            alert("로그인 되셨습니다");
            setLoggedin(true);
            setLoggedId(res.data[i].nickname);
            setLoggedRealId(res.data[i].realId);
            console.log(res.data[i].nickname);
            movePage("login/today/*");
            count++;
            return;
          } else {
            alert("비밀번호를 확인해주세요");
            count++;
            window.location.reload();
            return;
          }
          // if (count === 0) {
          //   alert("비밀번호를 확인해주세요");
          //   count++;
          //   window.location.reload();
          //   return;
          // }
        }
      }
      if (count === 0) {
        alert("입력하신 아이디가 가입되어있지 않습니다");
        window.location.reload();
        return;
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  return (
    <>
      <Container>
        <img
          src={logoImg}
          alt="logo"
          style={{ marginTop: "100px", marginRight: "100px" }}
        />

        <LoginBox>
          {loggedin === false ? (
            isSignIn === false ? (
              <>
                <div>
                  <button>
                    <Link
                      to="/login/today/*"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      만능로그인
                    </Link>
                  </button>
                  <button onClick={kariLogInRequest}>임시로그인</button>
                  {/* 이버튼은서버연결되면지울부분 */}
                </div>
                <div>ID</div>
                <input type="text" onChange={idChange}></input>
                <div>비밀번호</div>
                <input type="password" onChange={passwordChange}></input>
                <LoginButton onClick={logInRequest}>로그인</LoginButton>
                <SigninButton onClick={startSignIn}>회원가입</SigninButton>
              </>
            ) : (
              <>
                <button onClick={startSignIn}>&lt;&lt;</button>
                아이디
                <SignInInput onChange={idChange}></SignInInput>
                비밀번호
                <SignInInput onChange={passwordChange}></SignInInput>
                이름
                <SignInInput onChange={nameChange}></SignInInput>
                닉네임
                <SignInInput onChange={nicknameChange}></SignInInput>
                성별
                <SignInInput onChange={genderChange}></SignInInput>
                전화번호
                <SignInInput onChange={phoneChange}></SignInInput>
                생년월일
                <SignInInput onChange={birthdateChange}></SignInInput>
                운전가능여부
                <ChoiceBox>
                  <div>예</div>
                  <input
                    type="radio"
                    name="driverCheck"
                    value="true"
                    onChange={isDriverChange}
                    // defaultChecked={regular === true ? true : false}
                    // onChange={regularChange}
                  />
                  <div>아니오</div>
                  <input
                    type="radio"
                    name="driverCheck"
                    value="false"
                    onChange={isDriverChange}
                    // defaultChecked={regular === false ? true : false}
                    // onChange={regularChange}
                  />
                </ChoiceBox>
                자차여부
                <ChoiceBox>
                  <div>예</div>
                  <input
                    type="radio"
                    name="carCheck"
                    value="true"
                    onChange={ownCarChange}
                    // defaultChecked={regular === true ? true : false}
                    // onChange={regularChange}
                  />
                  <div>아니오</div>
                  <input
                    type="radio"
                    name="carCheck"
                    value="false"
                    onChange={ownCarChange}
                    // defaultChecked={regular === false ? true : false}
                    // onChange={regularChange}
                  />
                </ChoiceBox>
                <button onClick={signInRequest}>회원가입</button>
              </>
            )
          ) : (
            <>
              <button>
                <Link
                  to="/login/today/*"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  &gt;&gt;
                </Link>
              </button>
              님 환영합니다
            </>
          )}
        </LoginBox>
      </Container>
    </>
  );
};

export default Main;
