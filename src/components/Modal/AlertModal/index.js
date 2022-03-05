import "./style.css";
import {useEffect} from "react";
import RoundContainer from "../../RoundContainer";

export default function AlertModal({title, msg, setShow, keyClose = false}) {
  useEffect(() => {
    if (keyClose) {
      const close = (e) => {
        if (e.key === "Escape" || e.key === "Enter") {
          setShow(false);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [keyClose, setShow]);

  return (
    <RoundContainer
      className={"alert-modal"}
      blueHeader={true}
      onKeyPress={(e) => {
        console.log("TTT");
        console.log(e);
      }}
    >
      <h3>{title}</h3>

      {msg && <div style={{marginTop: "1em"}}>{msg}</div>}

      <button
        className="round-button"
        onClick={() => setShow(false)}
        style={{marginTop: "1em"}}
      >
        닫기
      </button>
    </RoundContainer>
  );
}
