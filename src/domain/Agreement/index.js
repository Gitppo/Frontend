import RoundContainer from "../../components/App/RoundContainer";
import "./style.css";

const contract = [
  "이용약관 동의 내용.... 본 약관은 2021년도부터 적용됩니다. 블라블라블라블라블라블라",
  "이용약관 동의 내용.... 본 약관은 2021년도부터 적용됩니다. 블라블라블라블라블라블라",
];

function Agreement() {
  return (
    <div className={"agree"}>
      <h2 className={"beautiful-title"}>이용 약관 동의</h2>
      <RoundContainer>
        <div>
          <h2 className={"beautiful-title"}>
            <div>이용약관, 개인정보 수집 및 이용, 프로모션 알림,</div>
            <div>메일 및 푸시 알림 수신(선택)에 모두 동의합니다.</div>
          </h2>
        </div>
        <hr />
        <h4>만 14세 이상입니다.</h4>

        <div className={"agree-contract-title"}>
          <h4>깃포 이용약관 동의</h4>
        </div>
        <div className={"agree-contract-content"}>
          <h4>이용약관</h4>
          <div>{contract[0]}</div>
        </div>

        <div className={"agree-contract-title"}>
          <h4>깃포 이용약관 동의</h4>
        </div>
        <div className={"agree-contract-content"}>
          <h4>이용약관</h4>
          <div>{contract[1]}</div>
        </div>

        <div className={"agree-button-container"}>
          <button className={"round-button"}>동의</button>
        </div>
      </RoundContainer>
    </div>
  );
}
export default Agreement;
