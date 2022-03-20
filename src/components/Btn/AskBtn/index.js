import "./style.css";
import {useState} from "react";

import EmailModal from "../../Modal/EmailModal";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-solid-svg-icons";

function AskBtn() {
  const [showAsk, setShowAsk] = useState(false);

  return (
    <div id="ask-btn-wrapper">
      {showAsk ? (
        <EmailModal setShow={setShowAsk} />
      ) : (
        <button onClick={() => setShowAsk(true)} id={"ask-button"}>
          <span>문의하기</span>
          <FontAwesomeIcon icon={faComment} />
        </button>
      )}
    </div>
  );
}

export default AskBtn;
