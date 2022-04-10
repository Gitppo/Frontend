import Modal from "..";
import "./style.css";
import Arrow from "../../../assets/arrow.png";

export default function ExportUserGuide({setShow}) {
  const onClose = () => {
    setShow(false);
  };
  const onForeverClose = () => {
    localStorage.setItem("show-export-user-guide", "false");
    onClose();
  };

  return (
    <Modal backBlack={true}>
      <div className="eug">
        <div className="eug-console">
          <div>왼쪽 회색바를 통해 열고 닫을 수 있어요</div>
          <img src={Arrow} alt="" />
        </div>

        <div className="eug-share">
          <div>
            PDF/HTML/LINK 등의 형식으로
            <br />
            포트폴리오를 공유할 수 있어요
          </div>
          <img src={Arrow} alt="" />
        </div>

        <div className="eug-close">
          <div onClick={onClose}>안내창 닫을래요</div>
          <div onClick={onForeverClose}>다시는 안볼래요</div>
        </div>
      </div>
    </Modal>
  );
}
