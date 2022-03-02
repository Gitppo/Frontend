import "./style.css";
import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import {isValidUser, useUserContext} from "../../hooks/useUserContext";
import hippoIcon from "../../assets/hippo-blue.png";
import {doLogin} from "../../hooks/login";

export default function Callback({match}) {
  const location = useLocation();
  const history = useHistory();
  const {setUser} = useUserContext();

  useEffect(() => {
    const toURL = "/" + (match.params?.toURL ?? "my-page");
    doLogin(location.search)
      .then((r) => {
        if (!(isValidUser(r) > 0))
          throw Error("DataErr : Invalid user information.");

        setUser(r);
        history.push(toURL);
      })
      .catch((e) => {
        console.error(e);
        history.push("/error");
      });
  }, [history, location.search, match.params?.toURL, setUser]);

  return (
    <div className={"loading"}>
      <div className={"large-text-back"}>
        로그인
        <br />
        하는 중
      </div>

      <div className={"loading-hippo"}>
        <img src={hippoIcon} alt={"hippo"} />
      </div>
    </div>
  );
}
