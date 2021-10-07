import "./style.css";

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
