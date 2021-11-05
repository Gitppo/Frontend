import "./style.css";
import RadioBtn from "../../components/RadioBtn/index";

function GitRepo() {
  return (
    <div className="gitrepo">
      <div className="gitrepo-page-manage">
        <div className="gitrepo-previous">
          <span>Img</span>
          이전
        </div>
        <div className="gitrepo-save">임시저장</div>
        <div className="gitrepo-next">
          다음
          <span>Img</span>
        </div>
      </div>

      <div className="gitrepo-wrapper">
        <div className="gitrepo-inner-box round-container-upper-bold">
          <h1 className="gitrepo-inner-box-title">
            포트폴리오를 위해 가져올 수 있는 레포는 총 3개입니다.
          </h1>
          <br />

          <h2 className="gitrepo-inner-box-text">
            레포지토리가 private모드이면 인식되지 않습니다.
          </h2>
          <br />

          <div className="gitrepo-inner-box-project-name">
            hyu-likelion/NESI
            <RadioBtn />
          </div>
          <div>ㄴ바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기</div>
          <div className="round-button">불러오기</div>
        </div>
      </div>
    </div>
  );
}

export default GitRepo;
