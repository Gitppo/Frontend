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

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

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
