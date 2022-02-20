import {useLocation} from "react-router";
import errorHippo from "../../assets/hippo-transparent.png";

function Error404() {
  const location = useLocation();
  if (location.pathname !== "/error/load-fail")
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
  else return <></>;
}

export default Error404;
