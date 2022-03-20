import "./style.css";
import {useEffect, useState} from "react";

import {saveAs} from "file-saver";

import Modal from "../index";
import RoundContainer from "../../RoundContainer";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {faFileCode, faFilePdf} from "@fortawesome/free-regular-svg-icons";

const CONVERTIO = (
  <a
    href="https://convertio.co/kr/html-pdf/"
    target={"_blank"}
    rel="noreferrer"
  >
    <u>https://convertio.co/kr/html-pdf/</u>
  </a>
);

const doCopy = (text) => {
  if (!document.queryCommandSupported("copy")) {
    return alert("복사하기가 지원되지 않는 브라우저입니다.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style = `
    top: 0;
    left: 0;
    position: fixed;
  `;
  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const exportHtml = (title, removeBackground) => {
  return `
  <!DOCTYPE html>
  <html lang="ko-kr">
    <head>
      <meta charset="utf-8" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
      <title>${title} - Powered by.Gitppo</title>
      <style>
        body, * {
          box-sizing: border-box;
          font-family: 'Noto Sans KR', sans-serif;
        }
        ul, li {
          list-style: none;
        }
      </style>
    </head>
    <body style="padding: 0; margin: 0; width: fit-content; ${
      removeBackground
        ? ""
        : "background-color: #19265a; display: flex; flex-direction: row; justify-content: center;"
    }">
      ${document.getElementById("#export-portfolio-preview").innerHTML}
    </body>
  </html>
  `;
};

export default function ShareModal({setShow, link, title = "포트폴리오"}) {
  const [msg, setMsg] = useState({show: false});
  const [copied, setCopied] = useState(false);

  const timer = () => {
    setCopied(false);
    clearTimeout(timer);
  };

  const copyLink = () => {
    doCopy(link);
    setCopied(true);
    setTimeout(timer, 2000);
  };

  const downloadHtml = () => {
    saveAs(
      new Blob([exportHtml(title, false)], {type: "text/plain;charset=utf-8"}),
      `${title}_Gitppo.html`
    );
  };

  const downloadPdf = () => {
    saveAs(
      new Blob([exportHtml(title, true)], {type: "text/plain;charset=utf-8"}),
      `${title}_Gitppo.html`
    );
    setMsg({
      show: true,
      msg: <>{CONVERTIO}을 통해서 pdf로 변환하세요</>,
    });
  };

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setShow(false);
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [setShow]);

  return (
    <Modal backBlack={true}>
      <RoundContainer blueHeader={true} className={"share-modal"}>
        <h4 style={{color: "#9B9B9B"}}>공유 가능한 링크</h4>
        <div
          className="link-box"
          title={"링크를 누르면 복사가 됩니다."}
          onClick={copyLink}
        >
          <div> {link}</div>
          <div className="clipboard">
            {copied ? (
              <FontAwesomeIcon
                icon={faClipboardCheck}
                color={"var(--dark-red)"}
              />
            ) : (
              <FontAwesomeIcon icon={faClipboard} color={"var(--blue2)"} />
            )}
          </div>
        </div>

        <div className="msg">{copied && "클립보드로 복사되었습니다"}</div>
        <br />

        <h4 style={{color: "#9B9B9B"}}>다운로드</h4>

        <div
          onMouseLeave={() => setMsg({show: false})}
          style={{paddingBottom: "1rem"}}
        >
          <div className="download">
            <span
              title={"html로 다운로드"}
              onClick={downloadHtml}
              onMouseOver={() =>
                setMsg({
                  show: true,
                  msg: <>포트폴리오를 html로 다운로드합니다</>,
                })
              }
            >
              <FontAwesomeIcon icon={faFileCode} />
            </span>
            <span
              title={"PDF로 다운로드"}
              onClick={downloadPdf}
              onMouseOver={() =>
                setMsg({
                  show: true,
                  msg: (
                    <>파일 다운로드 후 {CONVERTIO} 을 통해서 pdf로 변환합니다</>
                  ),
                })
              }
            >
              <FontAwesomeIcon icon={faFilePdf} />
            </span>
          </div>
          <div className="msg">{msg?.show && msg?.msg}</div>
        </div>

        <div className="yn-modal-btn-wrapper">
          <button className="round-red-btn" onClick={() => setShow(false)}>
            닫기
          </button>
        </div>
      </RoundContainer>
    </Modal>
  );
}
