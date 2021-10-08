import Button from "../../components/Button";
import "./style.css";

function Mypage() {
  return (
    <div className={"mypage"}>
      <div className={"mypage-new"}>
        <h3 className={"mypage-new-title"}>새로운 포트폴리오 생성</h3>
        <button className={"mypage-new-button"}>바로가기</button>
      </div>

      <div className={"mypage-manage"}>
        <div>임시 저장 중인 포트폴리오 1</div>
      </div>

      <div className={"mypage-manage"}>
        <div>최종 완성 포트폴리오 3</div>
      </div>

      <div className={"mypage-wrapper"}>
        <div className={"mypage-wrapper-title"}>기존 포트폴리오 (3)</div>
        <div className={"mypage-wrapper-box"}>
          <div className={"mypage-wrapper-box-title"}>2021 조깃포 삼성 포트폴리오</div>
          <div className={"mypage-wrapper-box-date"}>생성 2021.09.09</div>
          <div className={"mypage-wrapper-box-date"}>수정 2021.09.09 19:00</div>
          <div className={"mypage-wrapper-box-button"}>
            <Button className={"mypage-wrapper-box-button-left"}>수정</Button>
            <Button>삭제</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;