import "./style.css";

import {useCallback, useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import {useUserContext} from "../../../hooks/useUserContext";
import {getRepository} from "../../../hooks/repository";
import {createPortfolio} from "../../../hooks/portfolio";

import hippoIcon from "../../../assets/hippo-blue.png";

export default function LoadRepo() {
  const history = useHistory();
  const location = useLocation();
  const {user} = useUserContext();

  const createPF = useCallback(async () => {
    try {
      let pfID;
      if (!location.state?.hasOwnProperty("data")) {
        // create new portfolio
        pfID = await createPortfolio(user.id, location.state?.title);
        if (!pfID) {
          throw Error("NetErr : Invalid portfolio ID.");
        }
      } else {
        pfID = location.state.data.id;
      }

      // load repositories
      const repos = await getRepository(user.githubUserName);

      // move to next page
      history.push(`/new/1/${pfID}`, {...location.state, gitrepos: repos});
    } catch (e) {
      console.error(e);
      history.replace("/error/load-fail");
    }
  }, [history, location.state, user.githubUserName, user.id]);

  useEffect(createPF, [createPF]);

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
