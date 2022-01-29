import RoundContainer from "../../components/RoundContainer";
import "./style.css";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";

const data = {
  num: {
    savedPortfolio: "3",
    finishedPortfolio: "1",
    originPortfolio: "2",
  },
  portfolioBox: {
    title: "2021 조깃포 LG 포트폴리오",
    creation: "2021.04.04",
    revision: {
      date: "2021.05.05",
      time: "19:00",
    },
  },
};

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
            <span className={"beautiful-title"}>{data.num.savedPortfolio}</span>
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
        <h1 className={"beautiful-title"}>
          기존 포트폴리오 ({data.num.originPortfolio})
        </h1>

        <ul className={"mypage-wrapper-box"}>
          <li>
            <h4 className={"mypage-wrapper-box-title"}>
              {data.portfolioBox.title}
            </h4>
            <div className={"mypage-wrapper-box-date"}>
              생성 {data.portfolioBox.creation}
            </div>
            <div className={"mypage-wrapper-box-date"}>
              수정 {data.portfolioBox.revision.date}{" "}
              {data.portfolioBox.revision.time}
            </div>
            <div className={"mypage-wrapper-box-button"}>
              <button className={"mypage-wrapper-box-button-left round-button"}>
                수정
              </button>
              <button className={"round-button"}>삭제</button>
            </div>
          </li>

          <li>
            <h4 className={"mypage-wrapper-box-title"}>
              2021 조깃포 삼성 포트폴리오
            </h4>
            <div className={"mypage-wrapper-box-date"}>생성 2021.09.09</div>
            <div className={"mypage-wrapper-box-date"}>
              수정 2021.09.09 19:00
            </div>
            <div className={"mypage-wrapper-box-button"}>
              <button className={"mypage-wrapper-box-button-left round-button"}>
                수정
              </button>
              <button className={"round-button"}>삭제</button>
            </div>
          </li>
        </ul>
      </RoundContainer>
    </div>
  );
}

export default Mypage;
