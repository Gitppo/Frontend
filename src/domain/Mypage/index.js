import "./style.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useUserContext} from "../../hooks/useUserContext";

import RoundContainer from "../../components/RoundContainer";
import TitleInputModal from "../../components/Modal/TitleInputModal";
import Modal from "../../components/Modal/index";

import Pin from "../../assets/pin-red.png";
import AlertModal from "../../components/Modal/AlertModal/index";
import {getPortfolio} from "../../hooks/portfolio";

function Mypage() {
  const history = useHistory();
  const {user} = useUserContext();

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "2021 조깃포 LG 포트폴리오",
      state: 0,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
  ]);
  const [portfolioTitle, setPortfolioTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  const deletePortfolio = (id) => {
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].id === id) {
        portfolio.splice(i, 1);
        break;
      }
    }
    setPortfolio([...portfolio]);
  };

  useEffect(() => {
    getPortfolio(user.id)
      .then((data) => {
        console.log(data);
        setPortfolio(data);
      })
      .catch((e) => {
        console.error(e);
        setShowModal(true);
      });
  }, [user.id]);

  const createPortfolio = () => {
    setPortfolioTitle("");
    setShowInputModal(true);
  };
  const onTitleInput = () => {
    setShowInputModal(false);
    history.push("/loading", {title: portfolioTitle});
  };

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
              {portfolio?.filter((e) => e.state === 1).length || 0}
            </span>
          </div>
          <div className={"mypage-manage"}>
            <span>최종 완성 포트폴리오</span>
            <span className={"beautiful-title"}>
              {portfolio?.filter((e) => e.state === 0).length || 0}
            </span>
          </div>
        </div>
      </div>

      <RoundContainer>
        <h1 className={"beautiful-title"}>
          기존 포트폴리오 ({portfolio?.length || 0})
        </h1>

        <ul className={"mypage-wrapper-box"}>
          {portfolio?.map((box, index) => (
            <li className={"mypage-wrapper"} key={index}>
              <img className={"pin-image"} src={Pin} alt={""} />
              <h4 className={"mypage-wrapper-box-title"}>{box?.title}</h4>
              <div className={"mypage-wrapper-box-date"}>
                생성 {box?.creation}
              </div>
              <div className={"mypage-wrapper-box-date"}>
                수정 {box?.revision?.date} {box?.revision?.time}
              </div>
              <div className={"mypage-wrapper-box-button"}>
                <button
                  className={"mypage-wrapper-box-button-left round-button"}
                >
                  수정
                </button>
                <button
                  className={"round-button"}
                  onClick={() => deletePortfolio(box?.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}

          {!portfolio && (
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
        <Modal backBlack={true}>
          <TitleInputModal
            text={portfolioTitle}
            setText={setPortfolioTitle}
            onStart={onTitleInput}
            onCancle={() => setShowInputModal(false)}
          />
        </Modal>
      )}

      {/* 경고창 */}
      {showModal && (
        <Modal backBlack={true}>
          <AlertModal
            title={"포트폴리오 로딩에 실패하였습니다."}
            setShow={setShowModal}
          />
        </Modal>
      )}
    </div>
  );
}

export default Mypage;
