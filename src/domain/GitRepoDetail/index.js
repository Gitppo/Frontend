import "./style.css";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import Star from "../../assets/star.png";
// import Pen from "../../assets/pen.png";
// import Eye from "../../assets/eye.png";
// import Fold from "../../assets/fold.png";

function GitRepoDetail() {
  return (
    <div className="gitrepodetail">
      <BeforeAfterBtn />

      <div className="gitrepodetail-wrapper">
        <div className="gitrepodetail-top-container">
          <div className="gitrepodetail-top-container-title">레포지토리</div>
          <div className="gitrepodetail-top-container-groupname">그룹명</div>
          <div className="round-button">병합</div>
          <div className="round-button">삭제</div>
        </div>
        <div className="gitrepodetail-inner-box">
          <div className="gitrepodetail-inner-box-info-container">
            <div className="gitrepodetail-inner-box-top-container">
              <div className="gitrepodetail-inner-box-repo-title">
                hyu-likelion/NESI
              </div>
              <img
                className="gitrepodetail-inner-box-image"
                src={Star}
                alt={""}
              />
              <div className="gitrepodetail-inner-box-star-num">25</div>
              <div className="round-button">삭제</div>
            </div>
            <div className="gitrepodetail-inner-box-bottom-container">
              <div className="gitrepodetail-inner-box-bottom-title">생성일</div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                2017.12.12
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">
                최근 업데이트
              </div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                2017.12.12
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">
                사용언어
              </div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                JavaScript 56.8%
              </div>
            </div>
          </div>
          <div className="gitrepodetail-inner-box-title-container">
            <div className="gitrepodetail-inner-box-title-container-text">
              바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
            </div>
            {/* <img className="gitrepodetail-inner-box-image" src={Pen} alt={""} /> */}
          </div>
          <div className="gitrepodetail-inner-box-readme-container">
            <div className="gitrepodetail-inner-box-title-container-text">
              README.md
            </div>
            {/* <img className="gitrepodetail-inner-box-image" src={Eye} alt={""} />
            <img className="gitrepodetail-inner-box-image" src={Pen} alt={""} /> */}
          </div>
          <div className="gitrepodetail-inner-box-plus-info-title">
            상세 설명
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            기간
            <input
              className="gitrepodetail-inner-box-plus-info-title-date"
              placeholder="시작일"
            ></input>
            ~
            <input
              className="gitrepodetail-inner-box-plus-info-title-date"
              placeholder="마감일"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            역할
            <input
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="프론트엔드개발 / 디자인"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            기술스택
            <input
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="기술스택칸은 안 넓어도 괜찮지 않을까아ㅏㅏ"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            도메인
            <input
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="000.000.000"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-end-info">
            설명
            <input
              className="gitrepodetail-inner-box-plus-info-title-plus-info-box"
              placeholder="✧٩(ˊωˋ*)و✧"
            ></input>
          </div>
          <div className="save-button-container">
            <div className="round-button">저장</div>
            {/* <img
              className="gitrepodetail-inner-box-fold-image"
              src={Fold}
              alt={""}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitRepoDetail;
