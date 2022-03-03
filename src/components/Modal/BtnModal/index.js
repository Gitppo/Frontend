import RoundContainer from "../../RoundContainer";
import "./style.css";

export default function BtnModal({
  title,
  btn1 = "예",
  btn2 = "아니오",
  onBtn1,
  onBtn2,
  oneBtn = false,
}) {
  return (
    <RoundContainer blueHeader={true} className={"yn-modal"}>
      <h3 className={"yn-modal-title"}>{title}</h3>

      <div className={"yn-modal-btn-wrapper"}>
        <button className={"round-button"} onClick={onBtn1}>
          {btn1}
        </button>
        {!oneBtn && (
          <button className={"round-button"} onClick={onBtn2}>
            {btn2}
          </button>
        )}
      </div>
    </RoundContainer>
  );
}
