import "./style.css";

import arrowImg from "../../assets/arrow.png";

function BeforeAfterBtn() {
  return (
    <div className="gitrepo-top-button-container">
      <div className="gitrepo-before">
        <div className="gitrepo-button-container">
          <img src={arrowImg} className="button-image" alt={""} />
          <div className="gitrepo-button-title">이전</div>
        </div>
      </div>

      <div className="gitrepo-save">임시저장</div>
      <div className="gitrepo-after">
        <div className="gitrepo-button-container">
          <div className="gitrepo-button-title">다음</div>
          <img src={arrowImg} className="button-image" alt={""} />
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterBtn;
