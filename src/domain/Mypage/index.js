import React, { } from "react";
import RoundContainer from "../../components/RoundContainer";
import "./style.css";
import Pin from "../../image/pin.png";

function Mypage() {
  const num = {
    savedPortfolio: "3",
    finishedPortfolio: "1",
    originPortfolio: "1"
  }

  const portfolioBox = ([
    {
      id: 1,
      title: "2021 조깃포 LG 포트폴리오",
      creation:"2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00"
      }
    },
    {
      id: 2,
      title: "2021 조깃포 삼성 포트폴리오",
      creation:"2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00"
      }
    },
    {
      id: 3,
      title: "2021 조깃포 현대 포트폴리오",
      creation:"2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00"
      }
    }
  ]);

  function deleteDiv() {
    const div = document.getElementById("contents");
    div.remove();
  }

  
function Mypage() {
  const history = useHistory();
  const createPofol = () => {
    history.push("/git-repo");
  };

  return (
    <div>
      <div className={"mypage-upper-box"}>
        <div className={"mypage-upper-box-left"}>
          <h3 className={"mypage-new-title"}>새로운 포트폴리오 생성</h3>
          <button className={"round-button"} onClick={createPofol}>
            바로가기
          </button>
        </div>

        <div className={"mypage-upper-box-right"}>
          <div className={"mypage-manage"}>
            <span>임시 저장 중인 포트폴리오</span>
            <span className={"beautiful-title"}>{num.savedPortfolio}</span>
          </div>
          <div className={"mypage-manage"}>
            <span>최종 완성 포트폴리오</span>
            <span className={"beautiful-title"}>
              {data.num.finishedPortfolio}
            </span>
          </div>
        </div>
      </div>
      
      <RoundContainer>
        <h1 className={"beautiful-title"}>기존 포트폴리오 ({num.originPortfolio})</h1>
        <ul className={"mypage-wrapper-box"}>
          {portfolioBox.map((box, index) => (          
            <li id={"contents"} key={index}>
              <img className={"pin-image"} src={Pin} alt={""}/>
              <h4 className={"mypage-wrapper-box-title"}>{box.title}</h4>
              <div className={"mypage-wrapper-box-date"}>생성 {box.creation}</div>
              <div className={"mypage-wrapper-box-date"}>수정 {box.revision.date} {box.revision.time}</div>
              <div className={"mypage-wrapper-box-button"}>
                <button className={"mypage-wrappe r-box-button-left round-button"}>수정</button>        
                <button className={"round-button"} onClick={deleteDiv}>삭제</button>
              </div>
            </li>
          ))}

        </ul>
      </RoundContainer>
    </div>
  );
}
 
export default Mypage;
