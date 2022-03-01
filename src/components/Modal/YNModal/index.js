import RoundContainer from "../../RoundContainer";
import "./style.css";

export default function YNModal({title, onYes, onNo}) {
  return (
    <RoundContainer blueHeader={true} className={"yn-modal"}>
      <h3 className={"yn-modal-title"}>{title}</h3>

      <div className={"yn-modal-btn-wrapper"}>
        <button className={"round-button"} onClick={onYes}>
          예
        </button>
        <button className={"round-button"} onClick={onNo}>
          아니요
        </button>
      </div>
    </RoundContainer>
  );
}
