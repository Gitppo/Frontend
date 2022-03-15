import "./style.css";
import ReactDOM from "react-dom";
import {useEffect} from "react";

export default function Modal({
  style,
  className,
  children,
  backBlack = false,
  ...props
}) {
  const el = document.getElementById("modal");
  const preventContextMenu = (e) => e.preventDefault();

  useEffect(() => {
    el.addEventListener("contextmenu", preventContextMenu);
    return () => el.removeEventListener("contextmenu", preventContextMenu);
  }, [el]);

  return ReactDOM.createPortal(
    <div
      id={"modal-child"}
      className={className}
      style={
        backBlack ? {...style, background: "var(--black-transparent)"} : style
      }
      {...props}
    >
      <>{children}</>
    </div>,
    el
  );
}
