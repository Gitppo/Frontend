import "./style.css";
import RadioBtn from "../../components/RadioBtn/index";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

function GitRepo() {
  const [repolist, setRepolist] = useState([
    {
      id: 1,
      repoName: "hyu-likelion/NESI",
      summary: "바닐라 자바스크립트 구현 프로젝트 리액트로 바꿔보기",
      people: "Kim",
    },
    {
      id: 2,
      repoName: "minjoo-cho/movie_app_2021",
      summary: "영화 리스트 만들기",
      people: "Cho",
    },
    {
      id: 3,
      repoName: "jingyeong-seo/jingyeong-seo.github.io",
      summary: "영화 예매 사이트",
      people: "Seo",
    },
    {
      id: 4,
      repoName: "jongsik-seo/jongsik-seo.github.io",
      summary: "띠용",
      people: "Seo",
    },
  ]);

  const history = useHistory();

  return (
    <div className="gitrepo">
      <BeforeAfterBtn
        saveShow={false}
        onPrev={history.push("/my-page")}
        onNext={history.push("/git-repo-detail")}
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

            {repolist.map((box,index) => (
              <li key={index}>
                <b className="gitrepo-inner-box-project-name">
                  { box.repoName }
                <RadioBtn className="RadioBtn"/>
                </b>
                <div className="gitrepo-inner-box-project-content">
                  ㄴ{ box.summary }
                </div>
              </li>
            ))}

            <button
              className="round-button"
              onClick={() => history.push("/git-repo-detail")}
            >
              불러오기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitRepo;
