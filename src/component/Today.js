import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Icon } from "@iconify/react";

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
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodayLine = styled.div`
  display: flex;
  align-items: center;
`;

const TodayBox = styled.div`
  width: 300px;
  height: 450px;
  border: 0.5px solid #c0c0c0;
`;

const Today = (props) => {
  return (
    <>
      <TodayContainer>
        <h3> Today's Summary</h3>
        <TodayLine>
          <Icon
            icon="bi:arrow-left-circle-fill"
            style={{
              cursor: "pointer",
              width: "100px",
              fontSize: "40px",
              color: "blue",
            }}
          />
          <TodayBox></TodayBox>
          <Icon
            icon="bi:arrow-right-circle-fill"
            style={{
              cursor: "pointer",
              width: "100px",
              fontSize: "40px",
              color: "blue",
            }}
          />
        </TodayLine>
      </TodayContainer>
    </>
  );
};

export default Today;
