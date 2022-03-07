import "./style.css";

import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import moment from "moment";

import RoundContainer from "../../components/RoundContainer";
import TitleInputModal from "../../components/Modal/TitleInputModal";
import BtnModal from "../../components/Modal/BtnModal";

import Pin from "../../assets/pin-red.png";

import {useUserContext} from "../../hooks/useUserContext";
import {
  getPortfolio,
  getPortfolioDetail,
  deletePortfolio,
} from "../../hooks/portfolio";

function Mypage() {
  const history = useHistory();
  const {user} = useUserContext();

  const [portfolio, setPortfolio] = useState([]);
  const [portfolioTitle, setPortfolioTitle] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  const onDelete = async (id) => {
    const targetID = await deletePortfolio(id);
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].id === targetID) {
        portfolio.splice(i, 1);
        break;
      }
    }
    setPortfolio([...portfolio]);
  };
  const onRepair = async (id) => {
    getPortfolioDetail(id).then((r) => {
      console.log(r);
      history.push("/new/repo-load", {data: r});
    });
  };

  const createPortfolio = () => {
    setPortfolioTitle("");
    setShowInputModal(true);
  };
  const onTitleInput = () => {
    setShowInputModal(false);
    history.push("/new/repo-load", {title: portfolioTitle});
  };

  useEffect(() => {
    getPortfolio(user.id)
      .then((data) => {
        setPortfolio(data);
      })
      .catch((e) => {
        console.error(e);
        setShowModal(true);
      });
  }, [user.id]);

  return (
    <div>
      <div className={"mypage-upper-box"}>
        <div className={"mypage-upper-box-left"}>
          <h3 className={"mypage-new-title"}>새로운 포트폴리오 생성</h3>
          <button className={"round-button"} onClick={createPortfolio}>
            바로가기
          </button>
        </div>

        <div className={"mypage-upper-box-right"}>
          <div className={"mypage-manage"}>
            <span>임시 저장 중인 포트폴리오</span>
            <span className={"beautiful-title"}>
              {portfolio?.filter((e) => e?.pfTmpSave ?? true).length || 0}
            </span>
          </div>
          <div className={"mypage-manage"}>
            <span>최종 완성 포트폴리오</span>
            <span className={"beautiful-title"}>
              {portfolio?.filter((e) => !(e?.pfTmpSave ?? true)).length || 0}
            </span>
          </div>
        </div>
      </div>

      <RoundContainer>
        <h1 className={"beautiful-title"}>
          기존 포트폴리오 ({portfolio?.length || 0})
        </h1>

        <ul className={"mypage-wrapper-box"}>
          {portfolio?.map((box) => (
            <li className={"mypage-wrapper"} key={box?.id}>
              <img className={"pin-image"} src={Pin} alt={""} />
              <h4 className={"mypage-wrapper-box-title"}>{box?.pfName}</h4>
              <div className={"mypage-wrapper-box-date"}>
                생성{" "}
                {box?.hasOwnProperty("createdDate")
                  ? moment(box?.createdDate).format("YYYY.MM.DD")
                  : "NULL"}
              </div>
              <div className={"mypage-wrapper-box-date"}>
                수정{" "}
                {box?.hasOwnProperty("modifiedDate")
                  ? moment(box?.modifiedDate).format("YYYY.MM.DD HH:mm")
                  : "NULL"}
              </div>
              <div className={"mypage-wrapper-box-button"}>
                <button
                  className={"round-button"}
                  onClick={() => onRepair(box?.id)}
                >
                  수정
                </button>
                <button
                  className={"round-button"}
                  onClick={() => onDelete(box?.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}

          {!portfolio?.length > 0 && (
            <h3
              style={{
                textAlign: "center",
                color: "var(--dark-red)",
                marginTop: "1em",
              }}
            >
              기존 포트폴리오가 없습니다.
            </h3>
          )}
        </ul>
      </RoundContainer>

      {/* 제목 입력 모달 */}
      {showInputModal && (
        <TitleInputModal
          text={portfolioTitle}
          setText={setPortfolioTitle}
          onStart={onTitleInput}
          onCancle={() => setShowInputModal(false)}
          backBlack={true}
        />
      )}

      {/* 경고창 */}
      {showModal && (
        <BtnModal
          title={"포트폴리오 로딩에 실패하였습니다."}
          setShow={setShowModal}
          btns={[{name: "닫기", onClick: () => setShowModal(false)}]}
        />
      )}
    </div>
  );
}

export default Mypage;
