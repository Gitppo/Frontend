import "./style.css";
import {useState} from "react";
import radioBtnIn from "../../assets/radio-btn-in.png";
import radioBtnOut from "../../assets/radio-btn-out.png";

function RadioBtn({className, style, onClick}) {
  const [isChecked, setIsChecked] = useState(false);
  const changeInner = (e) => {
    setIsChecked(!isChecked);
    onClick && onClick(e);
  };

  return (
    <div
      id={"radio-btn"}
      className={className}
      style={style}
      onClick={changeInner}
    >
      <img id={"radio-btn-out"} src={radioBtnOut} alt={""} />
      <img
        id={"radio-btn-in"}
        src={radioBtnIn}
        alt={""}
        style={{display: isChecked ? "block" : "none"}}
      />
    </div>
  );
}

export default RadioBtn;
