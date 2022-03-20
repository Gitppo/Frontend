import {Route} from "react-router-dom";

import GitRepoChoice from "./GitRepoChoice";
import GitRepoInput from "./GitRepoInput";
import PersonalInput from "./PersonalInput";
import LoadRepo from "./LoadRepo";

export default function New({match}) {
  return (
    <>
      <Route exact path={`${match.url}/repo-load`} component={LoadRepo} />
      <Route path={`${match.url}/1/:pfID`} component={GitRepoChoice} />
      <Route path={`${match.url}/2/:pfID`} component={GitRepoInput} />
      <Route path={`${match.url}/3/:pfID`} component={PersonalInput} />
    </>
  );
}
