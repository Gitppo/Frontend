import "./style.css";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import RadioBtn from "../../../components/Btn/RadioBtn";
import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";
import RoundContainer from "../../../components/RoundContainer";
import BtnModal from "../../../components/Modal/BtnModal";

export default function GitRepo({match}) {
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

    history.push(`/new/2/${match.params.pfID}`, {
      ...location.state,
      gitrepos: repolist,
    });
  };

  useEffect(() => {
    if (
      !match.params?.hasOwnProperty("pfID") ||
      !location.state ||
      !location.state.hasOwnProperty("gitrepos")
    ) {
      history.replace("/error/load-fail");
      return;
    }

    const gitrepos = JSON.parse(JSON.stringify(location.state.gitrepos)).map(
      (e) => ({
        ...e,
        id: -1,
        repoGitId: e?.id,
      })
    );

    if (location.state.hasOwnProperty("data")) {
      for (let e of location.state?.data?.repo) {
        let search = false;
        for (let j in gitrepos) {
          if (e?.rpName === gitrepos[j]?.name) {
            search = true;
            gitrepos[j] = {
              ...gitrepos[j],
              ...e,
              checked: true,
              saved: true,
            };
            break;
          }
        }

        // 기존 추가한 포트폴리오가 이번 조회에서 제거된 경우
        // -> 기존 포트폴리오를 목록에 추가
        if (!search) {
          gitrepos.push({
            name: e?.rpName,
            readme: e?.rpReadme,
            html_url: e?.rpShortContents,
            stargazers_count: e?.rpStart,
            created_at: e?.createdDate,
            updated_at: e?.rpEdate,
            checked: true,
            saved: true,
            ...e,
          });
        }
      }
    }

    setRepolist(gitrepos);
  }, [history, location.state, match.params]);

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

          <ul>
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
            선택하기
          </button>
        </RoundContainer>
      </div>

      {alertShow && (
        <BtnModal
          title={"하나 이상의 레포지토리를 선택하세요"}
          setShow={setAlertShow}
          btns={[{name: "닫기", onClick: () => setAlertShow(false)}]}
        />
      )}
    </div>
  );
}
