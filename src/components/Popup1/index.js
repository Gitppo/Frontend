import "./style.css";

function Popup1() {
  return (
    <div className={"popup1"}>
      <div className={"popup1-wrapper"}>
        <div className={"popup1-box"}>
          <h3 className={"popup1-box-title"}>기존에 입력한 정보를 가져오시겠습니까?</h3>
          <button className={"popup1-box-button round-button"}>예</button>
          <button className={"round-button"}>아니요</button>
        </div>
      </div>
    </div>
  );
}

export default Popup1;
