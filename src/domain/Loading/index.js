import "./style.css";

import {useEffect} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import axios from "axios";

import {useUserContext} from "../../hooks/useUserContext";
import hippoIcon from "../../assets/hippo-blue.png";

function Loading() {
  const history = useHistory();
  const location = useLocation();
  const {user} = useUserContext();

  const getRepository = async () => {
    const instance = axios.create({timeout: 5 * 60 * 1000});

    return instance
      .get(`${process.env.REACT_APP_BACKEND}/api/repository`, {
        params: {
          githubUserName: user.githubUserName,
        },
      })
      .then((r) => {
        if (r.status !== 200 || r.data.status !== "OK")
          throw Error("NetErr : Failed to load github repos.");

        return r.data.data;
      })
      .catch((e) => {
        throw e;
      });
  };

  useEffect(() => {
    getRepository()
      .then((r) => history.push("/git-repo", {...location.state, gitrepos: r}))
      .catch((e) => {
        console.error(e);
        history.replace("/error/load-fail");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

export default Loading;
