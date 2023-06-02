import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { MasterStore2, ChannelStore } from "./store/store.js";

const Container = styled.div`
  overflow: auto;
  height: 550px;
  width: 1048px;
`;

const ChannelRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ChannelItem = styled.div`
  border: 0.5px solid #c0c0c0;
  height: 200px;
  width: 150px;
  margin-top: 50px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  // border: 0.5px solid #c0c0c0;
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
  // border: 0.5px solid #c0c0c0;
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
  border: none;
  background-color: white;
  cursor: pointer;
`;

const ChannelTask = (props) => {
  const { loggedId } = MasterStore2();
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

  const getChannels = async () => {
    try {
      const res1 = await axios.get(`http://localhost:4000/carpools`, {
        withCredentials: true,
      });

      console.log(res1);

      let tempArr = [];
      for (let i = 0; i < res1.data.length; i++) {
        // console.log(res1.data[i].hostNickname);
        // console.log(loggedId);
        if (res1.data[i].hostNickname == loggedId) {
          tempArr.push(res1.data[i]);
        } else {
          for (let j = 0; j < res1.data[i].userChannelList.length; j++) {
            if (res1.data[i].userChannelList[j].nickname == loggedId) {
              tempArr.push(res1.data[i]);
            }
          }
        }
      }

      let set = new Set(tempArr);
      tempArr = Array.from(set);
      console.log(tempArr);
      setMyCarpools(tempArr.reverse());
      lastRow = Math.floor(tempArr.length / 4) + 1;
      console.log(lastRow);

      let tempArr2 = [];
      for (let i = 0; i < tempArr.length; i++) {
        let tempMiniArr = [];
        for (let j = 0; j < tempArr[i].userChannelList.length; j++) {
          tempMiniArr.push(tempArr[i].userChannelList[j].nickname);
        }
        tempArr2.push(tempMiniArr.sort());
      }

      console.log(tempArr2);
      setRoomPeople(tempArr2);

      for (let i = 0; i < lastRow; i++) {
        forLayout.push(true);
      }
      console.log(tempArr.reverse());

      setForLayOut(forLayout);
      return res1.data;
    } catch (e) {
      console.log("error: " + e);
    }
  };

  const deleteChannel = async (id, hostId, num) => {
    try {
      console.log(id);
      console.log(hostId);
      console.log(loggedId);
      if (hostId == loggedId) {
        let confirm = window.confirm("채널을 삭제하시겠습니까?");
        if (confirm) {
          // const res3 = await fetch(`http://localhost:4000/posts/${id}`, {
          //   method: "DELETE",
          // });
          // const res4 = await fetch(`http://localhost:4000/carpools/${id}`, {
          //   method: "DELETE",
          // });
          // const res2 = axios({
          //   url: `http://localhost:4000/posts/${id}`,
          //   method: "delete",
          //   withCredentials: true,
          // });
          // const res1 = axios({
          //   url: `http://localhost:4000/carpools/${id}`,
          //   method: "delete",
          //   withCredentials: true,
          // });
          const res2 = await axios.delete(`http://localhost:4000/posts/${id}`, {
            withCredentials: true,
          });
          const res1 = await axios.delete(
            `http://localhost:4000/carpools/${id}`,
            {
              withCredentials: true,
            }
          );
        } else {
          return;
        }
      } else {
        let confirm = window.confirm("채널에서 나가시겠습니까?");
        if (confirm) {
          const res3 = await axios(
            {
              method: "patch",
              url: `http://localhost:4000/posts/${id}`,
              data: {
                curPersonnel: num - 1,
              },
              headers: { "Content-Type": "application/json" },
            },
            {
              withCredentials: true,
            }
          );
          const res1 = await axios.delete(
            `http://localhost:4000/carpools/${id}`,
            {
              withCredentials: true,
            }
          );
        }
      }
    } catch (e) {
      console.log("error: " + e);
    }
  };
  useEffect(() => {
    getChannels();
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
                    <ChannelItem>
                      <ButtonX
                        onClick={(e) => {
                          deleteChannel(
                            channel.id,
                            channel.hostNickname,
                            channel.userChannelList.length
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
                        {channel.userChannelList.map((person) => {
                          return <div>{person.nickname}</div>;
                        })}
                      </PersonnelBox>
                    </ChannelItem>
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
