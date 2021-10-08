import "./style.css";

function Popup2() {
  return (
    <div className={"popup2"}>
      <div className={"popup2-wrapper"}>
        <div className={"popup2-box"}>
          <h3 className={"popup2-box-title"}>사용자 정보를 불러올 포트폴리오를 선택하세요.</h3>
          <div className={"popup2-box-portfolio"}>
            <h4 className={"popup2-box-portfolio-title"}>2021 조깃포 삼성 포트폴리오</h4>
            <h6 className={"popup2-box-portfolio-content"}>바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기</h6>
            <div className={"popup2-box-portfolio-date"}>
              <div>생성 2021.09.09 | 수정 2021.09.09 19:00</div>
            </div>
          </div>
          <div className={"popup2-box-button"}>
            <button className={"popup2-box-button-left round-button"}>완료</button>
            <button className={"round-button"}>취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup2;
