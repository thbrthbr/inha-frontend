import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MasterStore2, ChannelStore, MasterStore3 } from "./store/store.js";
import postit from "./img/postit.png";

const Container = styled.div`
  overflow: auto;
  height: 450px;
  width: 1048px;
  margin-top: -2px;
  border: 2px solid orange;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChannelRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Temp = styled.div`
border: 0.5px solid #c0c0c0;
  height: 200px;
  width: 150px;

  background-image: url(./img/postit.png);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ChannelItem = styled.div`
  height: 200px;
  width: 150px;
  margin-top: -250px;
  margin-left: 50px;
  font-family: 'S-CoreDream-3Light';
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  z-index: 5;
`;

const Title = styled.div`
  font-size: 8px;
`;

const Contents = styled.div`
  margin-top: 30px;
  font-size: 8px;
`;

const DriverBox = styled.div`
  margin-top: 20px;
  height: 20px;
  width: 100px;
  font-size: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PersonnelBox = styled.div`
  margin-top: 5px;
  height: 80px;
  width: 100px;
  font-size: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonX = styled.button`
  margin-left: 130px;
  margin-top: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ChannelTask = (props) => {
  const { loggedId } = MasterStore2();
  const { loggedRealId } = MasterStore3();
  const {
    myCarpools,
    setMyCarpools,
    forLayOut,
    setForLayOut,
    roomPeople,
    setRoomPeople,
  } = ChannelStore();

  let channelCount = 0;
  let channelCount2 = 0;
  let rowCounter = 0;
  let lastRow = 0;
  let five = 5;
  let count = 0;
  const forLayout = [];

  const getChannels2 = async () => {
    try {
      const res1 = await axios.get(`${process.env.REACT_APP_API_URL}/api/carpools?userId=${loggedRealId}`, {
        withCredentials: true,
      });

      console.log(res1);
      

      let tempArr = [];
      for (let i = 0; i < res1.data.data.length; i++) {
        if (res1.data.data[i].hostId == loggedRealId) {
          tempArr.push(res1.data.data[i]);
        } else {
          for (let j = 0; j < res1.data.data[i].userHasChannelList.length; j++) {
            if (res1.data.data[i].userHasChannelList[j].userId == loggedRealId) {
              tempArr.push(res1.data.data[i]);
            }
          }
        }
      }

      let set = new Set(tempArr);
      tempArr = Array.from(set);
      setMyCarpools(tempArr.reverse());
      lastRow = Math.floor(tempArr.length / 4) + 1;

      let tempArr2 = [];
      for (let i = 0; i < tempArr.length; i++) {
        let tempMiniArr = [];
        for (let j = 0; j < tempArr[i].userHasChannelList.length; j++) {
          tempMiniArr.push(tempArr[i].userHasChannelList[j].nickname);
        }
        tempArr2.push(tempMiniArr.sort());
      }

      console.log(tempArr2);
      setRoomPeople(tempArr2);

      for (let i = 0; i < lastRow; i++) {
        forLayout.push(true);
      }

      setForLayOut(forLayout);
      // return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const deleteChannel = async (id, hostId, num) => {
    try {
      console.log(id);
      console.log(hostId);
      console.log(loggedId);
      if (hostId == loggedRealId) {
        let confirm = window.confirm("채널을 삭제하시겠습니까?");
        if (confirm) {
          const res2 = await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts?postId=${id}&userId=${loggedRealId }`, {
            withCredentials: true,
          });
          alert("채널이 삭제 되었습니다")
          window.location.reload();

        } else {
          return;
        }
      } else {
        let confirm = window.confirm("채널을 삭제하시겠습니까?");
        if (confirm) {

          alert("권한이 없습니다.");
        }
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };

  useEffect(() => {
    getChannels2();
  }, []);

  return (
    <Container>
      {forLayOut.map((people) => {
        return (
          <ChannelRow>
            {myCarpools.map((channel) => {
              channelCount++;
              if (channelCount2 <= channelCount) {
                channelCount2++;
                if (channelCount >= five) {
                  channelCount2 = 122131433551343;
                } else {
                  return (
                    <div style={{position: "relative"}}>
                      <div>
                        <img src={postit} style={{height: "300px", width: "250px"}}/>
                      </div>
                    <ChannelItem> 
                      <ButtonX
                        onClick={(e) => {
                          deleteChannel(
                            channel.channelId,
                            channel.hostId,
                            channel.userHasChannelList.length
                          );
                        }}
                      >
                        x
                      </ButtonX>
                      <Title>{channel.departures}</Title>
                      <Title>-&gt;</Title>
                      <Title>{channel.arrivals}</Title>
                      <DriverBox>
                        운전자:
                        {channel.driverNickname === null
                          ? " 없음"
                          : channel.driverNickname}
                      </DriverBox>
                      <PersonnelBox>
                        탑승자:
                        {channel.userHasChannelList.map((person) => {
                          return <div>{person.nickname}</div>;
                        })}
                      </PersonnelBox>
                    </ChannelItem>
                    </div>
                  );
                }
              }
              if (myCarpools.length == channelCount) {
                channelCount2 = five;
                five = five + 4;
                channelCount = 0;
              }
            })}
          </ChannelRow>
        );
      })}
    </Container>
  );
};

export default ChannelTask;
