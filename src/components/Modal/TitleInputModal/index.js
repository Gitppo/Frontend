import "./style.css";
import RoundContainer from "../../RoundContainer";
import {useEffect, useRef, useState} from "react";

export default function TitleInputModal({text, setText, onStart, onCancle}) {
  const [alert, setAlert] = useState("");
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <RoundContainer blueHeader={true} className={"ti-modal"}>
      <h4 style={{color: "#9B9B9B"}}>포트폴리오 제목을 입력하세요</h4>

      <div>
        <input
          type="text"
          className="title-input"
          ref={ref}
          value={text}
          onChange={(e) => {
            if (text?.length < 20) setText(e.target.value);
            else {
              setAlert("포트폴리오 제목은 20자를 초과할 수 없습니다.");
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onCancle();
            } else if (e.key === "Enter") {
              if (text?.length === 0) {
                setAlert("포트폴리오 제목을 입력해주세요.");
              } else {
                onStart();
              }
            }
          }}
        />
      </div>

      <div className="alert-msg">{alert}</div>
      <div className={"yn-modal-btn-wrapper"}>
        <button
          className={"round-button"}
          onClick={() => {
            if (text?.length === 0) setAlert("포트폴리오 제목을 입력해주세요.");
            else onStart();
          }}
        >
          시작하기
        </button>
        <button className={"round-button"} onClick={onCancle}>
          취소
        </button>
      </div>
    </RoundContainer>
  );
}