import "./style.css";

// 그림자 있는 글상자
function RoundContainer({
  className,
  style,
  children,
  props,
  blueHeader = false,
}) {
  return (
    <div
      id={"round-shadow-wrapper"}
      className={className}
      style={
        blueHeader
          ? {
              ...style,
              borderTop: "5px solid var(--blue2)",
              boxShadow: "0.5rem 0.5rem rgba(112,112,112,0.5)",
            }
          : style
      }
      {...props}
    >
      <div id={"round-shadow-wrapper-inner"}>{children}</div>
    </div>
  );
}

export default RoundContainer;
