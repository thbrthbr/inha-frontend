import React, { useEffect } from "react";
import styled from "styled-components";
import logoImg from "./img/logo.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
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
  margin-top: 120px;
  margin-right: 50px;
  border: 4px solid black;
  height: 500px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LoginButton = styled.button`
  margin-top: 10px;
  background-color: white;
`;

const SigninButton = styled.button`
  margin-top: 10px;
  background-color: white;
`;

const SignInInput = styled.input`
  margin-bottom: 5px;
  border-color: black;
`;

const SignInInput2 = styled.input.attrs((props) => ({
  type: "password",
}))`
  margin-bottom: 5px;
  border-color: black;
`;

const ChoiceBox = styled.div`
  display: flex;
  // flex-direction: column;
  margin-bottom: 5px;
`;

const Transparent = styled.button`
background-color: white;
border: none;
cursor: pointer;
`

const Radio = styled.input.attrs((props) => ({
  type: "radio",
}))`
//  accent-color: black;
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
    phoneF,
    setPhoneF,
    phoneS,
    setPhoneS,
    phoneT,
    setPhoneT,
    birthdateY,
    setBirthdateY,
    birthdateM,
    setBirthdateM,
    birthdateD,
    setBirthdateD,
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

  const birthdateChange = (e) => {
    if (e.target.id === "year") {
      setBirthdateY(e.target.value);
    }
    if (e.target.id === "month") {
      setBirthdateM(e.target.value);
    }
    if (e.target.id === "day") {
      setBirthdateD(e.target.value);
    }
  };

  const isDriverChange = (e) => {
    setIsDriver(e.target.value);
  };

  const ownCarChange = (e) => {
    setOwnCar(e.target.value);
  };

  const signInRequest = async () => {
    try {
      const signInData = {
        realId: id,
        password: password,
        name: name,
        nickname: nickname,
        sex: gender,
        cellphone:
          phoneF.toString() + "-" + phoneS.toString() + "-" + phoneT.toString(),
        birthdayDate:
          birthdateY.toString() +
          "-" +
          birthdateM.toString() +
          "-" +
          birthdateD.toString(),
        ownCar: ownCar,
        driving: isDriver,
      };

      console.log(toString(phoneF));
      console.log(signInData);
      const res = await axios.post(`http://localhost:8080/join`, signInData, {
        withCredentials: true,
      });
      console.log(res);

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
        "http://localhost:8080/loginProc",
        {
          username: id,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.status);

      // 나중에 다시 확인
      if (res.status === 200) {
        alert("로그인 되셨습니다");
        setLoggedin(true);
        console.log(res.data);
        console.log(res.data.nickname);
        console.log(res.data.userId);
        setLoggedId(res.data.nickname);
        setLoggedRealId(res.data.userId);
        movePage("login/today/*");
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 401) {
        alert("아이디나 비밀번호를 확인해주세요");
        window.location.reload();
      } else {
        alert("로그인 실패");
        window.location.reload();
      }
      console.log("error: " + e);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await axios.post(
  //         "/loginProc",
  //         {
  //           realId: id,
  //           password: password,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(res);

  //       // 나중에 다시 확인
  //       if (res.status === "200") {
  //         alert("로그인 되셨습니다");
  //       }
  //     } catch (e) {
  //       alert("로그인 실패");
  //       console.log("error: " + e);
  //     }
  //   })();
  // }, []);

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
          style={{ marginTop: "80px", marginRight: "100px" }}
        />

          {loggedin === false ? (
            isSignIn === false ? (
              <LoginBox>
                <div>
                  <Transparent onClick={kariLogInRequest}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Transparent>
                </div>
                <div style={{fontSize:"20px"}}>ID</div>
                <input type="text" onChange={idChange} style={{marginBottom: "20px", borderColor: "black"}}></input>
                <div style={{fontSize:"20px"}}>PASSword</div>
                <input type="password" onChange={passwordChange} style={{marginBottom: "20px",  borderColor: "black"}}></input>
                <LoginButton onClick={logInRequest}>LOGin</LoginButton>
                <SigninButton onClick={startSignIn}>SIGNin</SigninButton>
              </LoginBox>
            ) : (
              <LoginBox>
                <button style={{ position: "absolute", left: "0%", border: "none", cursor:"pointer", backgroundColor: "white", height: "30px", marginTop: "-470px" }} onClick={startSignIn}>
                  <AiOutlineArrowLeft/>
                </button>
                &lt;아이디&gt;
                <SignInInput onChange={idChange}></SignInInput>
                &lt;비밀번호&gt;
                <SignInInput2 onChange={passwordChange}></SignInInput2>
                &lt;이름&gt;
                <SignInInput onChange={nameChange}></SignInInput>
                &lt;닉네임&gt;
                <SignInInput onChange={nicknameChange}></SignInInput>
                &lt;성별&gt;
                <ChoiceBox>
                  <div>남자</div>
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    style={{
                      borderColor: "black"
                    }}
                    onChange={genderChange}
                  />
                  <div>여자</div>
                  <input
                    type="radio"
                    name="gender"
                    value="false"
                    style={{
                      borderColor: "black"
                    }}
                    onChange={genderChange}
                  />
                </ChoiceBox>
                &lt;전화번호&gt;
                <ChoiceBox>
                  <input
                    style={{
                      width: "30px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black"
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
                      borderColor: "black"
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
                      borderColor: "black"
                    }}
                    id="third"
                    onChange={phoneChange}
                  ></input>
                </ChoiceBox>
                {/* <SignInInput onChange={phoneChange}></SignInInput> */}
                &lt;생년월일&gt;
                <ChoiceBox>
                  <input
                    style={{
                      width: "40px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black"
                    }}
                    placeholder="YYYY"
                    id="year"
                    onChange={birthdateChange}
                  ></input>
                  <input
                    style={{
                      width: "30px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black"
                    }}
                    placeholder="MM"
                    id="month"
                    onChange={birthdateChange}
                  ></input>
                  <input
                    style={{
                      width: "30px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      borderColor: "black"
                    }}
                    placeholder="DD"
                    id="day"
                    onChange={birthdateChange}
                  ></input>
                </ChoiceBox>
                {/* <SignInInput onChange={birthdateChange}></SignInInput> */}
                &lt;운전가능여부&gt;
                <ChoiceBox>
                  <div>예</div>
                  <Radio name="driverCheck"
                    value="true"
                    onChange={isDriverChange}></Radio>
                  <div>아니오</div>
                  <Radio name="driverCheck"
                    value="false"
                    onChange={isDriverChange}></Radio>
                </ChoiceBox>
                &lt;자차여부&gt;
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
                <button style={{
                      borderColor: "black",
                      backgroundColor: "white"
                    }} onClick={signInRequest}>SUBmit</button>
              </LoginBox>
            )
          ) : (
            <LoginBox>
              <button>
                <Link
                  to="/login/today/*"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  &gt;&gt;
                </Link>
              </button>
              {loggedId}님 환영합니다
            </LoginBox>
          )}

      </Container>
    </>
  );
};

export default Main;
