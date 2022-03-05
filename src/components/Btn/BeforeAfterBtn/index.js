import "./style.css";
import arrowImg from "../../../assets/arrow.png";

function BeforeAfterBtn({
  style,
  prevShow = true,
  nextShow = true,
  saveShow = false,
  onPrev,
  onNext,
  onSave,
}) {
  return (
    <div className="bf-at-btn" style={{...style}}>
      {/* 오른쪽 */}
      <div
        className="bf-at-wrapper"
        onClick={onPrev}
        style={!prevShow ? {visibility: "hidden"} : {}}
      >
        <img src={arrowImg} className="bf-at-img" alt={""} />
        <div className="bf-at-title">이전</div>
      </div>

      {/* 오른쪽 */}
      <div>
        <div className="bf-at-wrapper">
          {saveShow && (
            <div className="bf-at-title bf-at-save" onClick={onSave}>
              임시저장
            </div>
          )}
        </div>

        {nextShow && (
          <div className="bf-at-wrapper" onClick={onNext}>
            <div className="bf-at-title">다음</div>
            <img
              src={arrowImg}
              className="bf-at-img"
              alt={""}
              style={{transform: "scaleX(-1)"}}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default BeforeAfterBtn;
