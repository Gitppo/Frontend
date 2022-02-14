import "./style.css";

function ChoicePopup() {
  return (
    <div className={"choicepopup"}>
      <div className={"choicepopup-box"}>
        <h2 className={"choicepopup-box-title"}>
          사용자 정보를 불러올 포트폴리오를 선택하세요.
        </h2>
        <div className={"choicepopup-box-portfolio"}>
          <h4 className={"choicepopup-box-portfolio-title"}>
            2021 조깃포 삼성 포트폴리오
          </h4>
          <h6 className={"choicepopup-box-portfolio-content"}>
            바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
          </h6>
          <div className={"choicepopup-box-portfolio-date"}>
            <div>생성 2021.09.09 | 수정 2021.09.09 19:00</div>
          </div>
        </div>
        <div className={"choicepopup-box-button"}>
          <button className={"choicepopup-box-button-left round-button"}>
            완료
          </button>
          <button className={"round-button"}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default ChoicePopup;
