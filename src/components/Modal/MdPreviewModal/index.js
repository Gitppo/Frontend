import "./style.css";
import {useEffect} from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

import Modal from "..";
import RoundContainer from "../../RoundContainer";

export default function MdPreviewModal({source, setModal}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        setModal(false);
      }
    };

    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "unset";
    };
  }, [setModal]);

  return (
    <Modal backBlack={true}>
      <RoundContainer blueHeader={true} className={"md-pv-container"}>
        <div className="header">
          <h1 className="beautiful-title">README.md</h1>
          <button
            className="round-red-btn"
            onClick={() => setModal({show: false})}
          >
            닫기
          </button>
        </div>

        <MarkdownPreview source={source} className={"md-pv-source"} />
      </RoundContainer>
    </Modal>
  );
}
