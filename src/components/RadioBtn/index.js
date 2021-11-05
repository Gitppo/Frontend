import "./style.css";
import {useState} from "react";

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
      <img id={"radio-btn-out"} src={"/icon/radio-btn-out.png"} alt={""} />
      <img
        id={"radio-btn-in"}
        src={"/icon/radio-btn-in.png"}
        alt={""}
        style={{display: isChecked ? "block" : "none"}}
      />
    </div>
  );
}

export default RadioBtn;
