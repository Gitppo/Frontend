import errorHippo from "../../assets/hippo-transparent.png";

export default function RequireLogin() {
  return (
    <>
      <div className={"large-text-front"}>
        로그인이
        <br />
        필요한
        <br />
        서비스
      </div>
      <div className="error-hippo">
        <img src={errorHippo} alt="" />
      </div>
    </>
  );
}
