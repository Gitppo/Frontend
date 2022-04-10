import "./style.css";
import {useState} from "react";

import EmailModal from "../../Modal/EmailModal";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";

function AskBtn() {
  const [showAsk, setShowAsk] = useState(false);

  return (
    <div id="ask-btn-wrapper">
      <EmailModal
        setShow={setShowAsk}
        style={
          showAsk
            ? {opacity: "1", transform: "scale(1)"}
            : {opacity: "0", transform: "scale(0)"}
        }
      />
      <button
        id={"ask-button"}
        onClick={() => setShowAsk(true)}
        style={
          showAsk
            ? {opacity: "0", transform: "scale(0)"}
            : {opacity: "1", transform: "scale(1)"}
        }
      >
        <span>문의하기</span>
        <FontAwesomeIcon icon={faComment} />
      </button>
    </div>
  );
}

export default AskBtn;
