import {Route} from "react-router-dom";

import GitRepo from "./GitRepo";
import InfoInput from "./InfoInput";
import LoadRepo from "./LoadRepo";
import GitRepoDetail from "./GitRepoDetail";

export default function New({match}) {
  return (
    <>
      <Route exact path={`${match.url}/repo-load`} component={LoadRepo} />
      <Route path={`${match.url}/1/:pfID`} component={GitRepo} />
      <Route path={`${match.url}/2/:pfID`} component={GitRepoDetail} />
      <Route path={`${match.url}/3/:pfID`} component={InfoInput} />
    </>
  );
}
