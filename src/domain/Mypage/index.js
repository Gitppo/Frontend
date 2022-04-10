import "./style.css";

import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

import moment from "moment";

import RoundContainer from "../../components/RoundContainer";
import TitleInputModal from "../../components/Modal/TitleInputModal";
import BtnModal from "../../components/Modal/BtnModal";

import Pin from "../../assets/pin-red.png";

import {loginBack} from "../../hooks/login";
import {isValidUser, useUserContext} from "../../hooks/useUserContext";
import {getPortfolio, deletePortfolio} from "../../hooks/portfolio";

function Mypage() {
  const history = useHistory();
  const {user} = useUserContext();

  const [pfCnt, setPfCnt] = useState([0, 0]);
  const [pfType, setPfType] = useState(0);
  const [pfList, setPfList] = useState([]);
  const [pfTitle, setPfTitle] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);

  const onDelete = async (id) => {
    await deletePortfolio(id)
      .then((r) => {
        for (let i = 0; i < pfList.length; i++) {
          if (pfList[i].id === r) {
            pfList.splice(i, 1);
            break;
          }
        }
        setPfList([...pfList]);
      })
      .catch((e) => {
        console.error(`NetErr : Failed to delete portfolio ${id}. : ${e}`);
      });
  };
  const onRepair = async (id) => {
    history.push("/new/repo-load", {data: {id: id}});
  };

  const createPortfolio = () => {
    setPfTitle("");
    setShowInputModal(true);
  };
  const onTitleInput = () => {
    setShowInputModal(false);
    history.push("/new/repo-load", {title: pfTitle});
  };

  useEffect(() => {
    const total = pfList?.length || 0;

    if (!(total > 0)) setPfCnt([0, 0, 0]);
    else {
      const tmpSave = pfList?.filter((e) => e.pfTmpSave)?.length;
      setPfCnt([total, tmpSave, total - tmpSave]);
    }
  }, [pfList]);

  useEffect(() => {
    // invalid user
    if (!isValidUser(user)) {
      loginBack();
      return;
    }

    getPortfolio(user.id)
      .then((data) => {
        setPfList(
          data.map((e) => ({
            ...e,
            createdDateStr: e?.hasOwnProperty("createdDate")
              ? moment(e?.createdDate).format("YYYY.MM.DD")
              : "NULL",
            modifiedDateStr: e?.hasOwnProperty("modifiedDate")
              ? moment(e?.modifiedDate).format("YYYY.MM.DD HH:mm")
              : "NULL",
          }))
        );
      })
      .catch((e) => {
        console.error(e);
        setShowModal(true);
      });
  }, [user]);

  return (
    <div>
      <div className={"mp-upper"}>
        <div className={"mp-upper-left"}>
          <h3>새로운 포트폴리오 생성</h3>
          <button className={"round-white-btn"} onClick={createPortfolio}>
            바로가기
          </button>
        </div>

        <ul className={"mp-upper-right"}>
          <li
            onClick={() => setPfType(pfType === 1 ? 0 : 1)}
            style={pfType === 1 ? {backgroundColor: "var(--dark-red)"} : {}}
          >
            <span>임시 저장 중인 포트폴리오</span>
            <span className={"beautiful-title"}>{pfCnt[1]}</span>
          </li>

          <li
            onClick={() => setPfType(pfType === 2 ? 0 : 2)}
            style={pfType === 2 ? {backgroundColor: "var(--dark-red)"} : {}}
          >
            <span>최종 완성 포트폴리오</span>
            <span className={"beautiful-title"}>{pfCnt[2]}</span>
          </li>
        </ul>
      </div>

      <RoundContainer>
        <h1 className={"beautiful-title"}>
          {["기존", "임시저장 중인", "최종 완성"][pfType]} 포트폴리오 (
          {pfCnt[pfType]})
        </h1>

        <ul className={"mp-pf-wrapper"}>
          {[
            pfList,
            pfList.filter((e) => e.pfTmpSave),
            pfList.filter((e) => !e.pfTmpSave),
          ][pfType]?.map((box) => (
            <li className={"mp-pf-item"} key={box?.id}>
              <img className={"mp-pf-pin"} src={Pin} alt={""} />
              <h3 className={"mp-pf-item-title"}>{box?.pfName}</h3>

              <div className={"mp-pf-item-date"}>
                <div>생성 {box?.createdDateStr}</div>
                <div>
                  {box?.pfTmpSave ? "수정" : "저장"} {box?.modifiedDateStr}
                </div>
                <div
                  className="mp-pf-item-comment"
                  style={!box?.pfTmpSave ? {visibility: "hidden"} : {}}
                >
                  * 임시저장 상태입니다
                </div>
              </div>

              <div className={"mp-pf-item-button"}>
                {box?.pfTmpSave ? (
                  <button
                    className={"round-btn"}
                    onClick={() => onRepair(box?.id)}
                  >
                    수정
                  </button>
                ) : (
                  <button
                    className="round-btn"
                    onClick={() => history.push(`/export/${box?.id}`)}
                  >
                    보기
                  </button>
                )}
                <button
                  className={"round-red-btn"}
                  onClick={() => onDelete(box?.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}

          {!pfList?.length > 0 && (
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
          text={pfTitle}
          setText={setPfTitle}
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
