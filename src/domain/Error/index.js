import {Route} from "react-router-dom";
import ErrorLoading from "./ErrorLoading";
import Error404 from "./Error404";
import "./style.css";

function Error({match}) {
  return (
    <div className={"error"}>
      <Route exact path={`${match.url}/git-load-fail`} component={ErrorLoading} />
      <Route path={"*"} component={Error404} />
    </div>
  );
}

export default Error;
