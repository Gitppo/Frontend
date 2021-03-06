import "./style.css";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import {loginBack} from "../../../hooks/login";
import {isValidUser, useUserContext} from "../../../hooks/useUserContext";

import RadioBtn from "../../../components/Btn/RadioBtn";
import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";
import RoundContainer from "../../../components/RoundContainer";
import BtnModal from "../../../components/Modal/BtnModal";

export default function GitRepoChoice({match}) {
  const history = useHistory();
  const location = useLocation();

  const {user} = useUserContext();

  const [alertShow, setAlertShow] = useState(false);
  const [repolist, setRepolist] = useState([]);

  const onNext = () => {
    const target = repolist.filter((e) => e.checked);
    if (!target || target.length === 0) {
      setAlertShow(true);
      return;
    }

    history.push(`/new/2/${match.params.pfID}`, {
      ...location.state,
      gitrepos: repolist,
    });
  };

  useEffect(() => {
    // url check
    if (!match.params?.pfID) {
      history.replace("/error");
      return;
    }

    // invalid user
    if (!isValidUser(user)) {
      loginBack(location.pathname);
      return;
    }

    if (!location.state?.hasOwnProperty("gitrepos")) {
      history.push("/new/repo-load", {
        ...(location.state || {}),
        data: {
          ...(location.state?.data || {}),
          id: match.params.pfID,
        },
      });
      return;
    }

    const gitrepos = JSON.parse(JSON.stringify(location.state.gitrepos)).map(
      (e) => ({
        ...e,
        id: -1,
        repoGitId: e?.id,
      })
    );

    if (location.state?.data?.hasOwnProperty("repo")) {
      for (let e of location.state?.data?.repo) {
        let search = false;
        for (let j in gitrepos) {
          if (e?.rpName === gitrepos[j]?.name) {
            search = true;
            gitrepos[j] = {
              ...gitrepos[j],
              ...e,
              checked: true,
              saved: true,
            };
            break;
          }
        }

        // ?????? ????????? ?????????????????? ?????? ???????????? ????????? ??????
        // -> ?????? ?????????????????? ????????? ??????
        if (!search) {
          gitrepos.push({
            name: e?.rpName,
            readme: e?.rpReadme,
            html_url: e?.rpShortContents,
            stargazers_count: e?.rpStart,
            created_at: e?.createdDate,
            updated_at: e?.rpEdate,
            checked: true,
            saved: true,
            ...e,
          });
        }
      }
    }

    setRepolist(gitrepos);
  }, [history, location.pathname, location.state, match.params, user]);

  return (
    <div className="gr">
      <BeforeAfterBtn saveShow={false} prevShow={false} onNext={onNext} />

      <div className="gr-outer">
        <RoundContainer className={"gr-inner"} blueHeader={true}>
          <h3>
            ?????????????????? ??????
            <br />
            ????????? ??? ?????? ????????? ??? {repolist?.length}????????????.
          </h3>
          <br />

          <div>?????????????????? private???????????? ???????????? ????????????.</div>

          <ul>
            {repolist.map((box, index) => (
              <li key={index} className={"gr-plist-item"}>
                <b
                  className="gr-item-pname"
                  onClick={() => {
                    repolist[index].checked = !box?.checked;
                    setRepolist([...repolist]);
                  }}
                >
                  {box?.name}
                  <RadioBtn className="RadioBtn" value={box?.checked} />
                </b>

                {box?.description && (
                  <div className="gr-item-gray">???{box?.description}</div>
                )}
              </li>
            ))}
          </ul>

          <button className="round-btn" onClick={onNext}>
            ????????????
          </button>
        </RoundContainer>
      </div>

      {alertShow && (
        <BtnModal
          title={"?????? ????????? ?????????????????? ???????????????"}
          setShow={setAlertShow}
          btns={[{name: "??????", onClick: () => setAlertShow(false)}]}
        />
      )}
    </div>
  );
}
