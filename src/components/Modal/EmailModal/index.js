import "./style.css";
import {useEffect, useState} from "react";
import PinRed from "../../../assets/pin-red.png";
import {init, send} from "@emailjs/browser";

export default function EmailModal({setShow}) {
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState({email: "", msg: ""});
  const [progress, setProgress] = useState(0);

  const formSubmit = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(reply?.email)) {
      setMsg("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!(reply?.msg?.length > 0)) {
      setMsg("문의 내용을 입력해주세요.");
      return;
    }

    setProgress(1);

    send(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      {
        user_email: reply.email,
        message: reply.msg,
      },
      process.env.REACT_APP_EMAIL_USER_ID
    ).then(
      (result) => {
        if (result.text === "OK") setProgress(2);
        else {
          console.error("NetErr : Failed to Send Message");
          console.error(result.text);
          setProgress(3);
        }
      },
      (error) => {
        console.error(error.text);
        setProgress(3);
      }
    );
  };

  useEffect(() => {
    init(process.env.REACT_APP_EMAIL_USER_ID);
  }, []);

  return (
    <div className={"ask-modal"}>
      <img src={PinRed} alt={""} className={"pin-img"} />
      <h2 className="beautiful-title" style={{color: "white"}}>
        문의
      </h2>

      <div>
        {/* 제출 중 */}
        {progress === 1 && (
          <h3 className="sending-msg">
            제출 중 입니다.
            <br />
            잠시만 기다려주세요.
          </h3>
        )}

        {/* 제출 성공 */}
        {progress === 2 && (
          <h3 className="sending-msg">제출 완료되었습니다.</h3>
        )}

        {/* 제출 실패 */}
        {progress === 3 && (
          <h3 className="sending-msg">
            제출에 실패하였습니다.
            <br />
            다시 시도해주세요.
          </h3>
        )}

        {/* 입력창 */}
        <div style={progress > 0 ? {visibility: "hidden"} : {}}>
          <div className="email-input">
            <span>E-mail</span>
            <span>
              <input
                type={"email"}
                value={reply?.email}
                onChange={(e) => setReply({...reply, email: e.target.value})}
                onKeyPress={(e) => e.key === "Enter" && formSubmit()}
              />
            </span>
          </div>

          <div>
            <span>문의 내용</span>
            <span>
              <textarea
                value={reply?.msg}
                onChange={(e) => setReply({...reply, msg: e.target.value})}
              />
            </span>
          </div>

          {msg && <div className="alert-msg">{msg}</div>}
        </div>

        {/* 버튼 */}
        <div
          className="btn-wrapper"
          style={progress === 1 ? {visibility: "hidden"} : {}}
        >
          {progress === 0 ? (
            <>
              <button className="round-button" onClick={formSubmit}>
                제출
              </button>
              <button className="round-button" onClick={() => setShow(false)}>
                취소
              </button>
            </>
          ) : (
            <button className="round-button" onClick={() => setShow(false)}>
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
