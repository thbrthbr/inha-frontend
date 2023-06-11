import React, { useEffect } from "react";
import styled from "styled-components";
import logoImg from "../img/logo.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ProfileStore,
  ChannelStore,
  MasterStore,
  MasterStore2,
} from "../store/store.js";

const HeaderArea = styled.div`
  height: 150px;
  width: 1300px;
  display: flex;
  font-size: 100%;
  // justify-content: space-between;
  align-items: center;
  margin-left: 50px;
`;
const CategoryItem = styled.span``;

const Item = styled.p`
  &:hover {
    color: blue;
  }
`;

function Header(props) {
  const movePage = useNavigate();

  const { switchOn, setSwitchOn } = ProfileStore();
  const { setShowListA, setShowListD } = ChannelStore();
  const { loggedin, setLoggedin } = MasterStore();
  const { loggedId, setLoggedId } = MasterStore2();
  const location = useLocation();
  // console.log(location.pathname);
  // console.log(switchOn);

  // if (location.pathname !== "/login/mypage/profiletask") {
  //   setSwitchOn(false);
  // }

  const stateInit = () => {
    setSwitchOn(true);
    setShowListA(false);
    setShowListD(false);
  };

  const logOut = () => {
    setLoggedId(null);
    movePage("/");
    setLoggedin(false);
  };

  const deny = () => {
    alert("Access Denied");
    movePage("/");
  };
  // useEffect(() => {
  //   deny();
  // }, []);

  useEffect(() => {
    if (loggedin === false) {
      console.log("두번찍히나");
      alert("Access Denied");
      movePage("/");
    }
  }, []);

  return (
    <>
      {/* {loggedin === true ? (
        <>
          <HeaderArea>
            <span style={{ height: "100px" }}>
              <Link
                to="/login/today/*"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <img src={logoImg} alt="logo" style={{ height: "80px" }} />
              </Link>
            </span>

            <CategoryItem>
              <Link
                to="/login/today/*"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Item
                  style={
                    location.pathname === "/login/today/*"
                      ? {
                          color: "blue",
                          textDecoration: "none",
                          marginLeft: "15px",
                          marginRight: "15px",
                        }
                      : {
                          color: "inherit",
                          textDecoration: "none",
                          marginLeft: "15px",
                          marginRight: "15px",
                        }
                  }
                  onClick={stateInit}
                >
                  오늘의 이동거리
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/calendar/*"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Item
                  style={
                    location.pathname === "/login/calendar/*"
                      ? {
                          color: "blue",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                      : {
                          color: "inherit",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                  }
                  onClick={stateInit}
                >
                  탄소배출일지
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/board/*"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Item
                  style={
                    location.pathname === "/login/board/*"
                      ? {
                          color: "blue",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                      : {
                          color: "inherit",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                  }
                  onClick={stateInit}
                >
                  카풀 쉐어링
                </Item>
              </Link>
            </CategoryItem>
            <CategoryItem>
              <Link
                to="/login/mypage/channeltask"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Item
                  style={
                    location.pathname.includes("/login/mypage")
                      ? {
                          color: "blue",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                      : {
                          color: "inherit",
                          textDecoration: "none",
                          marginRight: "15px",
                        }
                  }
                  onClick={stateInit}
                >
                  마이페이지
                </Item>
              </Link>
            </CategoryItem>
            <button onClick={logOut}>로그아웃</button>
          </HeaderArea>
          <Outlet />
        </>
      ) : (
        deny()
      )} */}
      <>
        <HeaderArea id="header">
          <span style={{ height: "100px" }}>
            <Link
              to="/login/today/*"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <img
                src={logoImg}
                alt="logo"
                style={{ height: "100px", marginRight: "15px" }}
              />
            </Link>
          </span>

          <CategoryItem>
            <Link
              to="/login/today/*"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Item
                style={
                  location.pathname === "/login/today/*"
                    ? {
                        fontSize: "30px",
                        color: "blue",
                        textDecoration: "none",
                        marginLeft: "15px",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                    : {
                        fontSize: "30px",
                        color: "inherit",
                        textDecoration: "none",
                        marginLeft: "15px",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                }
                onClick={stateInit}
              >
                하루요약
              </Item>
            </Link>
          </CategoryItem>
          <CategoryItem>
            <Link
              to="/login/calendar/*"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Item
                style={
                  location.pathname === "/login/calendar/*"
                    ? {
                        fontSize: "30px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                    : {
                        fontSize: "30px",
                        color: "inherit",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                }
                onClick={stateInit}
              >
                탄소배출일지
              </Item>
            </Link>
          </CategoryItem>
          <CategoryItem>
            <Link
              to="/login/board/*"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Item
                style={
                  location.pathname === "/login/board/*"
                    ? {
                        fontSize: "30px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                    : {
                        fontSize: "30px",
                        color: "inherit",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                }
                onClick={stateInit}
              >
                카풀 쉐어링
              </Item>
            </Link>
          </CategoryItem>
          <CategoryItem>
            <Link
              to="/login/mypage/channeltask"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Item
                style={
                  location.pathname.includes("/login/mypage")
                    ? {
                        fontSize: "30px",
                        color: "blue",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                    : {
                        fontSize: "30px",
                        color: "inherit",
                        textDecoration: "none",
                        marginRight: "30px",
                        marginTop: "60px",
                      }
                }
                onClick={stateInit}
              >
                마이페이지
              </Item>
            </Link>
          </CategoryItem>
          <button onClick={logOut}>로그아웃</button>
        </HeaderArea>
        <Outlet />
      </>
    </>
  );
}

export default Header;
