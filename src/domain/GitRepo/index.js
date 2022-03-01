import "./style.css";
import RadioBtn from "../../components/RadioBtn/index";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function GitRepo() {
  const history = useHistory();
  const location = useLocation();

  const [repolist, setRepolist] = useState([
    {
      id: 1,
      repoName: "hyu-likelion/NESI",
      summary: "바닐라 자바스크립트 구현 프로젝트 리액트로 바꿔보기",
      people: "Kim",
    },
  ]);

  const loadRepos = () => {
    history.push("/git-repo-detail", {
      title: location.state?.title,
      gitrepos: repolist.filter((e) => e.checked),
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
    <div className="gitrepo">
      <BeforeAfterBtn
        saveShow={false}
        onPrev={() => history.push("/my-page")}
        onNext={() => history.push("/git-repo-detail")}
      />

      <div className="gitrepo-outer-box">
        <div className="gitrepo-box round-container-upper-bold">
          <div className="gitrepo-inner-box">
            <h3 className="gitrepo-inner-box-title">
              포트폴리오를 위해
              <br />
              가져올 수 있는 레포는 총 {repolist?.length}개입니다.
            </h3>
            <br />

            <div className="gitrepo-inner-box-text">
              레포지토리가 private모드이면 인식되지 않습니다.
            </div>
            <br />

            {repolist.map((box, index) => (
              <li key={index}>
                <b className="gitrepo-inner-box-project-name">
                  {box?.name}
                  <RadioBtn
                    className="RadioBtn"
                    onChanged={() => {
                      repolist[index].checked = !box?.checked;
                      setRepolist([...repolist]);
                    }}
                  />
                </b>
                {box?.description && (
                  <div className="gitrepo-inner-box-project-content">
                    ㄴ{box?.description}
                  </div>
                )}
              </li>
            ))}

            <button className="round-button" onClick={loadRepos}>
              불러오기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitRepo;
