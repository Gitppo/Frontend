import "./style.css";
import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import {doLogin} from "../../hooks/login";
import {isValidUser, useUserContext} from "../../hooks/useUserContext";

import hippoIcon from "../../assets/hippo-blue.png";

export default function Callback() {
  const history = useHistory();
  const location = useLocation();

  const {setUser} = useUserContext();

  useEffect(() => {
    console.log(location.pathname);
    const toURL = "/" + (location.pathname.substring(10) || "my-page");
    console.log(toURL);

    doLogin(location.search)
      .then((r) => {
        if (!r) throw Error("DataErr : No user info.");

        const user = {
          id: r?.id,
          githubUserName: r?.githubUserName,
          name: r?.name,
          loginDate: r?.loginDate,
        };

        if (!isValidUser(user)) {
          throw Error("DataErr : Invalid user info.");
        }

        setUser(user);

        if (r.roleKey === "ROLE_FIRST") {
          history.push("/agree");
        } else {
          history.push(toURL);
        }
      })
      .catch((e) => {
        console.error(e);
        history.push("/error");
      });
  }, [history, location.pathname, location.search, setUser]);

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
