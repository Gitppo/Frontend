import "./style.css";
import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import {useUserContext} from "../../hooks/useUserContext";
import hippoIcon from "../../assets/hippo-blue.png";
import {doLogin} from "../../hooks/login";

export default function Callback() {
  const location = useLocation();
  const history = useHistory();
  const {setUser} = useUserContext();

  useEffect(() => {
    doLogin(location.search)
      .then((r) => {
        if (!(r?.githubUserName?.length > 0))
          throw Error("DataErr : Invalid user information.");

        setUser(r);

        // TODO : 로그인 완료 시 리다이렉트 주소 변경 -> agree
        history.push("/my-page");
      })
      .catch((e) => {
        console.error(e);
        history.push("/error");
      });
  }, [history, location.search, setUser]);

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
