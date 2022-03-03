import "./style.css";
import {useCallback, useEffect, useState} from "react";
import radioBtnIn from "../../assets/radio-btn-in.png";
import radioBtnOut from "../../assets/radio-btn-out.png";

function RadioBtn({className, style, value, onChanged}) {
  const [isChecked, setIsChecked] = useState(value ?? false);
  const changeInner = useCallback(() => {
    setIsChecked(!isChecked);
    onChanged && onChanged(!isChecked);
  }, [isChecked, onChanged]);

  useEffect(() => {
    setIsChecked(value ?? false);
  }, [value]);

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
