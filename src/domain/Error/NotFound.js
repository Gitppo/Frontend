import errorHippo from "../../assets/hippo-transparent.png";

export default function NotFound() {
  return (
    <>
      <div className={"large-text-front"}>
        <div>404</div>
        <div>NOT FOUND</div>
      </div>

      <div className="error-hippo">
        <img src={errorHippo} alt="" style={{transform: "scaleX(-1)"}} />
      </div>
    </>
  );
}
