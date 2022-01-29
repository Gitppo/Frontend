import "./style.css";
import RadioBtn from "../../components/RadioBtn/index";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";

const data = {
  repoName: "hyu-likelion/NESI",
  people: "Kim",
};

function GitRepo() {
  return (
    <div className="gitrepo">
      <BeforeAfterBtn />
      <div className="gitrepo-wrapper">
        <div className="gitrepo-inner-box round-container-upper-bold">
          <h1 className="gitrepo-inner-box-title">
            포트폴리오를 위해 가져올 수 있는 레포는 총{" "}
            <span>{3}</span>개입니다.
          </h1>
          <br />

          <h2 className="gitrepo-inner-box-text">
            레포지토리가 private모드이면 인식되지 않습니다.
          </h2>
          <br />

          <h4 className="gitrepo-inner-box-project-name">
            {data.repoName}
            <RadioBtn className="RadioBtn" />
          </h4>
          <h5 className="gitrepo-inner-box-project-content">
            ㄴ바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
          </h5>
          <div className="round-button">불러오기</div>
        </div>
      </div>
    </div>
  );
}

export default GitRepo;
