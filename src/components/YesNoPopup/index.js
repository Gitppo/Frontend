import "./style.css";

function YesNoPopup() {
  return (
    <div className={"yesnopopup"}>
      <div className={"yesnopopup-box round-container-upper-bold"}>
        <h3 className={"yesnopopup-box-title"}>
          기존에 입력한 정보를 가져오시겠습니까?
        </h3>

        <div className={"yesnopopup-box-button-wrapper"}>
          <button className={"yesnopopup-box-button round-button"}>예</button>
          <button className={"round-button"}>아니요</button>
        </div>
      </div>
    </div>
  );
}

export default YesNoPopup;
