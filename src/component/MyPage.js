import React from "react";
import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { ProfileStore } from "./store/store.js";

const PageBox = styled.div`
  border: 0.5px solid #c0c0c0;
  height: 600px;
  width: 1048px;
  margin-left: 10px;
`;

const UpperBar = styled.div`
  display: flex;
  align-items: center;
`;

const PageCategory = styled.div`
  height: 50px;
  width: 100px;
  border: 0.5px solid #c0c0c0;
`;

const MyPage = (props) => {
  const { switchOn, setSwitchOn } = ProfileStore();

  const stateInit = () => {
    setSwitchOn(true);
  };
  return (
    <>
      <PageBox>
        <UpperBar>
          <PageCategory onClick={stateInit}>
            <Link
              to="/login/mypage/channeltask"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              채널관리
            </Link>
          </PageCategory>
          <PageCategory onClick={stateInit}>
            <Link
              to="/login/mypage/profiletask"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              프로필수정
            </Link>
          </PageCategory>
        </UpperBar>
        <Outlet />
      </PageBox>
    </>
  );
};

export default MyPage;
