import "./style.css";
import {useState} from "react";

function RadioBtn({style, onClick}) {
  const [isChecked, setIsChecked] = useState(false);
  const changeInner = (e) => {
    setIsChecked(!isChecked);
    onClick && onClick(e);
  };

  return (
    <div id={"radio-btn"} onClick={changeInner} style={style}>
      <img
        id={"radio-btn-out"}
        src={"/icon/radio-btn-out.png"}
        alt={"radio-btn"}
      />
      <img
        id={"radio-btn-in"}
        src={"/icon/radio-btn-in.png"}
        alt={"radio-btn"}
        style={{display: isChecked ? "block" : "none"}}
      />
    </div>
  );
}

export default RadioBtn;
