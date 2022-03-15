import "./style.css";

import {Route} from "react-router-dom";

import NotFound from "./NotFound";
import LoadFail from "./LoadFail";
import Unauthorized from "./Unauthorized";
import RequireLogin from "./RequireLogin";

export default function Error({match}) {
  return (
    <div className={"error"}>
      <Route exact path={`${match.url}/`} component={NotFound} />
      <Route
        exact
        path={`${match.url}/unauthorized`}
        component={Unauthorized}
      />
      <Route
        exact
        path={`${match.url}/login-require`}
        component={RequireLogin}
      />
      <Route exact path={`${match.url}/load-fail`} component={LoadFail} />
    </div>
  );
}
