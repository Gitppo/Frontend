import "./style.css";
import {useEffect, useState} from "react";

import moment from "moment";

import RoundContainer from "../../RoundContainer";
import PinRed from "../../../assets/pin-red.png";

import {useUserContext} from "../../../hooks/useUserContext";
import {getPortfolio, getPortfolioDetail} from "../../../hooks/portfolio";

export default function PortfolioChoiceModal({initPersonal, onNo}) {
  const {user} = useUserContext();

  const [msg, setMsg] = useState("");
  const [checked, setChecked] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [portfolio, setPortfolio] = useState([]);

  const onYes = () => {
    if (checked > -1) {
      getPortfolioDetail(checked)
        .then((r) => {
          if (!(r?.personal?.id >= 0)) {
            setMsg("선택한 포트폴리오의 입력 내용이 없습니다.");
          } else {
            initPersonal(r?.personal);
            onNo();
          }
        })
        .catch((e) => {
          console.error(e);
          setMsg("선택한 포트폴리오를 불러오는데 실패하였습니다");
        });
    } else {
      setMsg("* 불러올 포트폴리오를 선택하세요");
    }
  };

  useEffect(() => {
    getPortfolio(user.id)
      .then((r) => {
        if (!(r?.length > 0)) {
          setProgress(2);
        } else {
          setProgress(1);
          setPortfolio(
            r?.map((e) => ({
              ...e,
              createdDateStr: e?.hasOwnProperty("createdDate")
                ? moment(e?.createdDate).format("YYYY.MM.DD")
                : "NULL",
              modifiedDateStr: e?.hasOwnProperty("modifiedDate")
                ? moment(e?.modifiedDate).format("YYYY.MM.DD HH:mm")
                : "NULL",
            }))
          );
        }
      })
      .catch((e) => {
        // 로딩 실패
        console.error(e);
        setProgress(3);
      });
  }, [user.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  switch (progress) {
    // 로딩 완료
    case 1:
      return (
        <RoundContainer blueHeader={true} className={"pfc-modal"}>
          <h3>사용자가 불러올 포트폴리오를 선택하세요.</h3>

          {/* 포트폴리오 리스트 */}
          <div className="pf-list">
            {portfolio?.map((e, i) => (
              <RoundContainer
                key={`portfolio-${i}`}
                className={`${
                  e?.id === checked && "pf-list-item-checked"
                } pf-list-item`}
                onClick={() => {
                  if (checked === e?.id) {
                    setChecked(-1);
                    setMsg("* 불러올 포트폴리오를 선택하세요");
                  } else {
                    setChecked(e?.id);
                    setMsg("");
                  }
                }}
              >
                <h4>{e?.pfName}</h4>
                {/* <div className="subtitle">{e?.subtitle}</div> */}
                <div className="date">
                  <div>생성 {e?.createdDateStr}</div>
                  <div>수정 {e?.modifiedDateStr}</div>
                </div>
                <img src={PinRed} alt={""} className={"pf-list-pin"} />
              </RoundContainer>
            ))}
          </div>

          {msg?.length > 0 && <div className="alert-msg">{msg}</div>}
          <div className={"yn-modal-btn-wrapper"}>
            <button className={"round-btn"} onClick={onYes}>
              예
            </button>
            <button className={"round-red-btn"} onClick={onNo}>
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
            <button className={"round-btn"} onClick={onNo}>
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
            <button className={"round-btn"} onClick={onNo}>
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
