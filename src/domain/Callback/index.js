import "./style.css";
import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import axios from "axios";
import qs from "qs";
import {useUserContext} from "../../hooks/useUserContext";
import hippoIcon from "../../assets/hippo-blue.png";

export default function Callback() {
  const location = useLocation();
  const history = useHistory();

  const {setUser} = useUserContext();

  const doLogin = async () => {
    const {code} = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    const instance = axios.create({timeout: 5 * 60 * 1000});
    const {id, githubUserName} = await instance
      .post(`${process.env.REACT_APP_BACKEND}/auth?code=` + code)
      .then((r) => r.data);

    if (typeof id !== "number" || typeof githubUserName !== "string")
      throw Error("NetErr : Github login fail");

    setUser({id: id, githubUserName: githubUserName});
  };

  useEffect(() => {
    doLogin()
      // TODO : 로그인 완료 시 리다이렉트 주소 변경 -> agree
      .then(() => history.push("/my-page"))
      .catch((e) => {
        console.error(e);
        history.push("/error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
