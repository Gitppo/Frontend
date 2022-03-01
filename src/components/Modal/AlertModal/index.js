import RoundContainer from "../../RoundContainer";
import "./style.css";

export default function AlertModal({title, msg, setShow}) {
  return (
    <RoundContainer className={"alert-modal"} blueHeader={true}>
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
