import "./style.css";
import {useState} from "react";
import HippoImg from "../../../assets/profile.png";
import Modal from "..";

export default function ProgressModal() {
  const [progress, setProgress] = useState(100);

  const onchange = (val) => setProgress(val);
  window.onprogress = onchange;

  if (progress < 100)
    return (
      <Modal style={progress === 100 ? {display: "none"} : {}}>
        <img src={HippoImg} alt={progress} id="pg-img" />
        <div
          id="pg-circle"
          style={{
            background: `conic-gradient(var(--dark-red) 0% ${progress}%, transparent ${progress}% 100%)`,
          }}
        />
      </Modal>
    );
  else return <></>;
}
