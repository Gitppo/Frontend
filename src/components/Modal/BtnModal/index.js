import {useEffect} from "react";
import Modal from "..";
import RoundContainer from "../../RoundContainer";
import "./style.css";

export default function BtnModal({
  title,
  msg,
  setShow,
  btns = [],
  backBlack = true,
}) {
  useEffect(() => {
    if (setShow) {
      const close = (e) => {
        if (e.key === "Escape" || e.key === "Enter") {
          setShow(false);
        }
      };
      window.addEventListener("keydown", close);
      return () => window.removeEventListener("keydown", close);
    }
  }, [setShow]);

  return (
    <Modal backBlack={backBlack}>
      <RoundContainer blueHeader={true} className={"yn-modal"}>
        <h3 className={"yn-modal-title"}>{title}</h3>
        {msg && <div style={{marginTop: "1em"}}>{msg}</div>}

        <div className={"yn-modal-btn-wrapper"}>
          {btns?.map((e) => (
            <button
              className={"round-button"}
              onClick={e?.onClick}
              key={`btns-${e?.name}`}
            >
              {e?.name}
            </button>
          ))}
        </div>
      </RoundContainer>
    </Modal>
  );
}
