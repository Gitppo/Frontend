import React from "react";
import "./style.css";

// 그림자 있는 글상자
function RoundContainer({className, style, children, ...props}) {
  return (
    <div id={"round-shadow-wrapper"} className={className} style={style}>
      <div id={"round-shadow-wrapper-inner"}>{children}</div>
    </div>
  );
}

export default RoundContainer;
