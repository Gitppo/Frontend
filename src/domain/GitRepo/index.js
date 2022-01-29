import "./style.css";
import RadioBtn from "../../components/RadioBtn/index";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";

const data = {
  repoName: "hyu-likelion/NESI",
  people: "Kim",
};

function GitRepo() {
  const history = useHistory();

  const loadRepos = () => {
    history.push("/git-repo-detail");
  };
  const prevPage = () => {
    history.push("/my-page");
  };
  const nextPage = () => {
    history.push("/git-repo-detail");
  };

  return (
    <div className="gitrepo">
      <BeforeAfterBtn saveShow={false} onPrev={prevPage} onNext={nextPage} />

      <div className="gitrepo-outer-box">
        <div className="gitrepo-box round-container-upper-bold">
          <div className="gitrepo-inner-box">
            <h3 className="gitrepo-inner-box-title">
              포트폴리오를 위해
              <br />
              가져올 수 있는 레포는 총 {3}</span>
              개입니다.
            </h3>
            <br />

            <div className="gitrepo-inner-box-text">
              레포지토리가 private모드이면 인식되지 않습니다.
            </div>
            <br />

            <>
              <b className="gitrepo-inner-box-project-name">
                {data.repoName}
                <RadioBtn className="RadioBtn" />
              </b>
              <div className="gitrepo-inner-box-project-content">
                ㄴ바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
              </div>
            </>

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
