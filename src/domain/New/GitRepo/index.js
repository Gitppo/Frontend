import "./style.css";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import Modal from "../../../components/Modal";
import AlertModal from "../../../components/Modal/AlertModal";
import RadioBtn from "../../../components/Btn/RadioBtn";
import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";
import RoundContainer from "../../../components/RoundContainer";

export default function GitRepo() {
  const history = useHistory();
  const location = useLocation();

  const [alertShow, setAlertShow] = useState(false);
  const [repolist, setRepolist] = useState([
    {
      id: 1,
      name: "hyu-likelion/NESI",
      description: "바닐라 자바스크립트 구현 프로젝트 리액트로 바꿔보기",
    },
  ]);

  const onNext = () => {
    const target = repolist.filter((e) => e.checked);
    if (!target || target.length === 0) {
      setAlertShow(true);
      return;
    }

    history.push("/new/2", {
      ...location.state,
      gitrepos: repolist,
    });
  };

  useEffect(() => {
    if (!location.state || !location.state.hasOwnProperty("gitrepos")) {
      history.replace("/error/load-fail");
      return;
    }
    setRepolist(location.state.gitrepos);
  }, [history, location.state]);

  return (
    <div className="gr">
      <BeforeAfterBtn saveShow={false} prevShow={false} onNext={onNext} />

      <div className="gr-outer">
        <RoundContainer className={"gr-inner"} blueHeader={true}>
          <h3>
            포트폴리오를 위해
            <br />
            가져올 수 있는 레포는 총 {repolist?.length}개입니다.
          </h3>
          <br />

          <div>레포지토리가 private모드이면 인식되지 않습니다.</div>

          <ul className="gr-plist-wrapper">
            {repolist.map((box, index) => (
              <li key={index} className={"gr-plist-item"}>
                <b
                  className="gr-item-pname"
                  onClick={() => {
                    repolist[index].checked = !box?.checked;
                    setRepolist([...repolist]);
                  }}
                >
                  {box?.name}
                  <RadioBtn className="RadioBtn" value={box?.checked} />
                </b>

                {box?.description && (
                  <div className="gr-item-gray">ㄴ{box?.description}</div>
                )}
              </li>
            ))}
          </ul>

          <button className="round-button" onClick={onNext}>
            불러오기
          </button>
        </RoundContainer>
      </div>

      {alertShow && (
        <Modal backBlack={true}>
          <AlertModal
            title={"하나 이상의 레포지토리를 선택하세요"}
            setShow={setAlertShow}
            keyClose={true}
          />
        </Modal>
      )}
    </div>
  );
}