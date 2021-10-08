import "./style.css";

// const style = {
//   padding: "0.3em 1em",
//
//   border: "none",
//   borderRadius: "2em",
//   backgroundColor: "#002D84",
//
//   fontFamily: "yoon-u",
//   fontSize: "1.2em",
//   color: "white",
//
//   cursor: "pointer",
//
//   "&:hover": {
//     backgroundColor: "#aa3937",
//   }
// }

function Button({className, style, onClick, children, onMouseOver}) {
  return (
    <button
      id={"ctm-button"}
      className={className}
      style={style}
      onClick={onClick}
      onMouseOver={onMouseOver}
    >
      {children}
    </button>
  );
}

export default Button;
