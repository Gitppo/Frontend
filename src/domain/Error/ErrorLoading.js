import errorHippo from "../../assets/hippo-transparent.png";

function ErrorLoading() {
  return (
    <>
      <div className={"large-text-front"}>
        로딩-실패
        <br />
        ㅠ_ㅠ
      </div>
      <div className="error-hippo">
        <img src={errorHippo} alt="" />
      </div>
    </>
  );
}

export default ErrorLoading;
