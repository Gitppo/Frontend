import "./style.css";

export default function YesNoPopup({className, style, title, onYes, onNo}) {
  return (
    <div className={`yesnopopup ${className ?? ""}`} style={style}>
      <div className={"yesnopopup-box round-container-upper-bold"}>
        <h3 className={"yesnopopup-box-title"}>
          {/* 기존에 입력한 정보를 가져오시겠습니까? */}
          {title}
        </h3>

        <div className={"yesnopopup-box-button-wrapper"}>
          <button
            className={"yesnopopup-box-button round-button"}
            onClick={onYes}
          >
            예
          </button>
          <button className={"round-button"} onClick={onNo}>
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
