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

function Button({className, onClick, children}) {
  return (
    <button className={className} onClick={onClick} id={"ctm-button"}>
      {children}
    </button>
  );
}

export default Button;
