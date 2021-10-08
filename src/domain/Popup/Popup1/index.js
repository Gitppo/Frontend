import Button from "../../../components/Button";
import "./style.css";

function Popup1() {
  return (
    <div className={"popup1"}>
      <div className={"popup1-wrapper"}>
        <div className={"popup1-box"}>
          <h3 className={"popup1-box-title"}>기존에 입력한 정보를 가져오시겠습니까?</h3>
          <Button className={"popup1-box-button"}>예</Button>
          <Button>아니요</Button>
        </div>
      </div>
    </div>
  );
}

export default Popup1;