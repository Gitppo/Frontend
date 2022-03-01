import "./style.css";
import {useState} from "react";
import RoundContainer from "../../RoundContainer";
import PinRed from "../../../assets/pin-red.png";

export default function PortfolioChoiceModal({
  onYes,
  onNo,
  checked,
  setChecked,
}) {
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "2021 조깃포 삼성 포트폴리오",
      subtitle: "바닐라자바스크립트 구현 프로젝트 리엑트로 바꿔보기",
      createDate: "2021.09.09",
      editDate: "2021.09.09 19:00",
    },
  ]);

  return (
    <RoundContainer blueHeader={true} className={"pfc-modal"}>
      <h3>사용자가 불러올 포트폴리오를 선택하세요.</h3>
      <br />

      {/* 포트폴리오 리스트 */}
      <div className="pf-list">
        {portfolio?.map((e, i) => (
          <RoundContainer
            key={`portfolio-${i}`}
            className={`${
              e?.id === checked && "pf-list-item-checked"
            } pf-list-item`}
            onClick={() => setChecked(e?.id)}
          >
            <h4>{e?.title}</h4>
            <div className="subtitle">{e?.subtitle}</div>
            <div className="date">
              <span>생성 {e?.createDate}</span>
              {" | "}
              <span>수정 {e?.editDate}</span>
            </div>
            <img src={PinRed} alt={""} className={"pf-list-pin"} />
          </RoundContainer>
        ))}
      </div>

      <div className={"yn-modal-btn-wrapper"}>
        <button className={"round-button"} onClick={onYes}>
          예
        </button>
        <button className={"round-button"} onClick={onNo}>
          아니요
        </button>
      </div>
    </RoundContainer>
  );
}
