import "./style.css";
import {useEffect, useRef, useState} from "react";
import PinRed from "../../../assets/pin-red.png";
import {init} from "@emailjs/browser";
import {sendEmailJS} from "../../../hooks/email";
import {useUserContext} from "../../../hooks/useUserContext";

export default function EmailModal({setShow, style}) {
  const {user} = useUserContext();

  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState({email: "", msg: ""});
  const [progress, setProgress] = useState(0);

  const ref1 = useRef();
  const ref2 = useRef();

  const sendEmail = () => {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(reply?.email)) {
      setMsg("이메일 형식이 올바르지 않습니다.");
      return;
    }
    if (!(reply?.msg?.length > 0)) {
      setMsg("문의 내용을 입력해주세요.");
      return;
    }

    // 전송 중 메시지로 변경
    setProgress(1);

    sendEmailJS(user, reply.email, reply.msg)
      .then(() => {
        setProgress(2);
      })
      .catch((e) => {
        console.error(e);
        setProgress(3);
      });
  };

  useEffect(() => {
    init(process.env.REACT_APP_EMAIL_USER_ID);
    ref1.current.focus();
  }, []);

  return (
    <div className={"ask-modal"} style={style}>
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
                ref={ref1}
                value={reply?.email}
                onChange={(e) => setReply({...reply, email: e.target.value})}
                onKeyDown={(e) => {
                  if (e.key === "Enter") ref2.current.focus();
                  else if (e.key === "Escape") setShow(false);
                }}
              />
            </span>
          </div>

          <div>
            <span>문의 내용</span>
            <span>
              <textarea
                ref={ref2}
                value={reply?.msg}
                onChange={(e) => {
                  if (e.target.value !== "\n")
                    setReply({...reply, msg: e.target.value});
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setShow(false);
                }}
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
              <button className="round-red-btn" onClick={sendEmail}>
                제출
              </button>
              <button
                className="round-white-btn"
                onClick={() => setShow(false)}
              >
                취소
              </button>
            </>
          ) : (
            <button className="round-btn" onClick={() => setShow(false)}>
              닫기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
