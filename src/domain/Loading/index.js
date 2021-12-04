import "./style.css";
import hippoIcon from "../../assets/hippo-blue.png";

function Loading() {
  return (
    <div className={"loading"}>
      <div className={"large-text-back"}>
        깃-레포
        <br />
        불러오는 중
      </div>

      <div className={"loading-hippo"}>
        <img src={hippoIcon} alt={"hippo"} />
      </div>
    </div>
  );
}

export default Loading;
