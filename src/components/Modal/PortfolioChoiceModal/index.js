import "./style.css";
import {useEffect, useState} from "react";

import RoundContainer from "../../RoundContainer";
import PinRed from "../../../assets/pin-red.png";

import {useUserContext} from "../../../hooks/useUserContext";
import {getPortfolio} from "../../../hooks/portfolio";

export default function PortfolioChoiceModal({onYes, onNo}) {
  const {user} = useUserContext();
  const [checked, setChecked] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "2021 조깃포 삼성 포트폴리오",
      subtitle: "바닐라자바스크립트 구현 프로젝트 리엑트로 바꿔보기",
      createDate: "2021.09.09",
      editDate: "2021.09.09 19:00",
    },
  ]);

  useEffect(() => {
    setChecked(0);

    getPortfolio(user.id)
      .then((r) => {
        if (!r || !(r.length > 0)) {
          setProgress(2);
        } else {
          setProgress(1);
          setPortfolio(r);
        }
      })
      .catch((e) => {
        // 로딩 실패
        console.error(e);
        setProgress(3);
      });
  }, [user.id]);

  switch (progress) {
    // 로딩 완료
    case 1:
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
    // 포트폴리오 0개
    case 2:
      return (
        <RoundContainer blueHeader={true} className={"pfc-modal"}>
          <h3>선택 가능한 포트폴리오가 없습니다</h3>
          <div className={"yn-modal-btn-wrapper"}>
            <button className={"round-button"} onClick={onNo}>
              닫기
            </button>
          </div>
        </RoundContainer>
      );
    // 로딩 실패
    case 3:
      return (
        <RoundContainer blueHeader={true} className={"pfc-modal"}>
          <h3>포트폴리오를 불러오는데 실패하였습니다</h3>
          <div className={"yn-modal-btn-wrapper"}>
            <button className={"round-button"} onClick={onNo}>
              닫기
            </button>
          </div>
        </RoundContainer>
      );
    // 로딩 중
    case 0:
    default:
      return (
        <RoundContainer blueHeader={true} className={"pfc-modal"}>
          <h3>기존 포트폴리오를 불러오는 중입니다</h3>
        </RoundContainer>
      );
  }
}
