import errorHippo from "../../assets/hippo-transparent.png";

export default function Unauthorized() {
  return (
    <>
      <div className={"large-text-front"}>
        잘못된
        <br />
        접근권한
      </div>
      <div className="error-hippo">
        <img src={errorHippo} alt="" />
      </div>
    </>
  );
}
