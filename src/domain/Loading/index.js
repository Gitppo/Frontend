import "./style.css";

import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import {useUserContext} from "../../hooks/useUserContext";
import {getRepository} from "../../hooks/repository";

import hippoIcon from "../../assets/hippo-blue.png";

export default function Loading() {
  const history = useHistory();
  const location = useLocation();
  const {user} = useUserContext();

  useEffect(() => {
    getRepository(user.githubUserName)
      .then((r) => history.push("/git-repo", {...location.state, gitrepos: r}))
      .catch((e) => {
        console.error(e);
        history.replace("/error/load-fail");
      });
  }, [history, location.state, user.githubUserName]);

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
