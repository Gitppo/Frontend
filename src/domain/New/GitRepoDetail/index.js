import "./style.css";
import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Select from "react-select";

import {loginBack} from "../../../hooks/login";
import {getPortfolioDetail, userHasPortfoilo} from "../../../hooks/portfolio";
import {DEFAULT_SKILL_LIST, getOptions} from "../../../hooks/options";
import {editRepository, saveRepository} from "../../../hooks/repository";
import {isValidUser, useUserContext} from "../../../hooks/useUserContext";

import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";
import BtnModal from "../../../components/Modal/BtnModal";
import MdPreviewModal from "../../../components/Modal/MdPreviewModal";

import Star from "../../../assets/star.png";
import BlueEye from "../../../assets/eye-blue.png";
import GrayEye from "../../../assets/eye-gray.png";
import Fold from "../../../assets/arrow-no-head.png";

// react-select style
const styles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
    height: "2.2rem",
  }),
  control: (styles) => ({
    ...styles,
    border: 0,
    boxShadow: "none",
    backgroundColor: "#EEF1F7",
    borderRadius: "0.5em",
    padding: "0",
    height: "2.2rem",
  }),
  option: (styles, {isDisabled, isFocused, isSelected}) => {
    const color = "#EEF1F7";
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? color
        : isFocused
        ? color
        : undefined,
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled ? (isSelected ? color : color) : undefined,
      },
    };
  },
  valueContainer: (styles) => ({
    ...styles,
    padding: "0 0.2em",
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: "#0F2C7F",
    color: "#C6C6C6",
    borderRadius: "0.5em",
    padding: "0",
    // padding: "0.15em",
    //margin: "0 0 0 0.1%",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "#FFFFFF",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      color: "#FFFFFF",
      cursor: "pointer",
    },
  }),
  indicator: (styles) => ({
    ...styles,
    padding: "0",
  }),
};

function GitRepoDetail({match}) {
  const location = useLocation();
  const history = useHistory();

  const {user} = useUserContext();

  const [repos, setRepos] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [readmeModal, setReadmeModal] = useState({show: false});

  const initRepo = useCallback(() => {
    let tmpRepos = [];
    let total = location.state?.gitrepos?.filter((e) => e.checked);
    if (!(total?.length > 0)) {
      total = location.state?.data?.repo?.map((e) => ({...e, saved: true}));
    }
    total = total || [];

    for (let e of total) {
      const {languages} = e;

      // language sum
      let total = 0;
      let langArr = [];
      for (let i in languages) {
        total += languages[i];
        langArr.push({
          lang: i,
          val: languages[i],
        });
      }

      // 비율 계산
      for (let i = 0; i < langArr.length; i++) {
        langArr[i].perc = ((langArr[i].val / total) * 100).toFixed(1);
      }
      // 비율을 내림차순으로 정렬
      langArr.sort((a, b) => b.perc - a.perc);
      // to string
      let langStr = "";
      for (let i = 0; i < langArr.length && i < 2; i++) {
        langStr += `${langArr[i].lang}: ${langArr[i].perc}% / `;
      }
      if (langStr?.length > 0) {
        langStr = langStr.substring(0, langStr.length - 2);
      }

      tmpRepos.push({
        ...e,
        pfId: parseInt(match.params.pfID),
        repoGitId: e?.repoGitId || -1,
        rpName: e?.rpName ?? e?.name ?? "",
        rpSdate: e?.rpSdate ?? e?.created_at ?? "",
        rpEdate: e?.rpEdate ?? e?.updated_at ?? "",
        rpShortContents: e?.rpShortContents ?? e?.html_url ?? "",
        rpLongContents: e?.rpLongContents ?? e?.description ?? "",
        rpReadme: e?.readme || "",
        rpRole: e?.rpRole || "",
        rpStar: e?.rpStar ?? e?.stargazers_count ?? 0,
        rpSkills: e?.rpSkills || [],
        rpLanguages: languages,
        langStr: langStr,
        skillsArr: e?.rpSkills?.map((e) => ({value: e, label: e})) || [],
        skillsValue: "",
        useReadme: e?.useReadme ?? true,
        fold: false,
      });
    }

    // Deep copy
    setRepos(JSON.parse(JSON.stringify(tmpRepos)));
  }, [location.state, match.params.pfID]);

  const onInputChange = (e, index) => {
    repos[index][e.target.name] = e.target.value;
    setRepos([...repos]);
  };
  const onFold = (index) => {
    // fold: true - 접힘 / false - 열림
    repos[index].fold = !(repos[index]?.fold || false);
    setRepos([...repos]);
  };
  const onDelete = (index) => {
    repos.splice(index, 1);
    setRepos([...repos]);
  };

  const onSave = async (isReturn = false) => {
    let newRepos = [],
      editRepos = [];

    for (let e of repos) {
      // 전송 전 한번 더 정리
      const tmp = {
        rpName: e?.rpName || "noname",
        rpSdate: e?.rpSdate || "",
        rpEdate: e?.rpEdate || "",
        rpShortContents: e?.rpShortContents ?? "",
        rpLongContents: e?.rpLongContents ?? "",
        rpReadme: (!e?.useReadme ? "" : e?.readme) || "",
        rpRole: e?.rpRole || "",
        rpStar: e?.rpStar || 0,
        rpSkills: e?.skillsArr?.map((e) => e?.value) || [],
        rpLanguages: e?.rpLanguages || {},
      };

      // Reformat
      if (e?.saved) {
        // PUT
        editRepos.push({
          ...tmp,
          id: e?.id,
        });
      } else {
        // POST
        newRepos.push({
          ...tmp,
          pfId: e?.pfId,
          repoGitId: e?.repoGitId,
        });
      }
    }

    if (newRepos) {
      await saveRepository(newRepos)
        .then((r) => {
          for (let i = 0; i < r.length; i++) {
            repos[i].id = r[i];
            repos[i].saved = true;
          }
        })
        .catch((e) => {
          console.error(e);
          setShowAlert(true);
        });
    }

    if (editRepos) {
      await editRepository(editRepos)
        .then((r) => {
          for (let i = 0; i < r.length; i++) {
            repos[i].id = r[i];
            repos[i].saved = true;
          }
        })
        .catch((e) => {
          console.error(e);
          setShowAlert(true);
        });
    }

    return await getPortfolioDetail(match.params.pfID)
      .then((r) => {
        if (!r) throw Error("NetErr : Failed to reload portfolio.");

        const newState = {
          ...(location?.state || {}),
          data: r,
          gitrepos: location.state?.gitrepos?.map((e) => {
            for (let repo of repos) {
              if (e?.repoGitId === repo?.repoGitId) {
                return repo;
              }
            }
            return e;
          }),
        };

        if (isReturn) return newState;
        else history.replace(location.pathname, newState);
      })
      .catch((e) => {
        console.error(e);
        history.push("/error/load-fail");
      });
  };
  const onPrev = () => {
    history.push(`/new/1/${match.params.pfID}`, {
      ...location.state,
    });
  };
  const onNext = () => {
    onSave(true).then((r) => {
      history.push(`/new/3/${match.params.pfID}`, r);
    });
  };

  useEffect(() => {
    // url check
    if (!match.params?.hasOwnProperty("pfID")) {
      history.replace("/error");
      return;
    }

    // invalid user
    if (!isValidUser(user)) {
      loginBack(location.pathname);
      return;
    }

    // authority check
    if (!userHasPortfoilo(user.id, match.params.pfID)) {
      history.replace("/error/unauthorized");
      return;
    }

    // data check
    if (!location.state?.gitrepos && !location.state?.data?.repo) {
      getPortfolioDetail(match.params.pfID)
        .then((r) => {
          history.replace(location.pathname, {data: r});
        })
        .catch((e) => {
          console.error(e);
          history.replace("/error/load-fail");
        });
      return;
    }

    initRepo();
    getOptions()
      .then((r) => {
        setSkillOptions(
          r?.map((e) => ({
            value: e.name,
            label: e.name,
          }))
        );
      })
      .catch((e) => {
        console.error(e);
        setSkillOptions(
          DEFAULT_SKILL_LIST.map((e) => ({
            value: e,
            label: e,
          }))
        );
      });
  }, [history, location, match.params, user, initRepo]);

  return (
    <div className="grd">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={onSave}
      />

      <div className="grd-outer">
        <div className="grd-outer-title">
          <div className="beautiful-title">레포지토리</div>
          <button className="round-white-btn" onClick={initRepo}>
            초기화
          </button>
        </div>

        {repos.map((e, i) => (
          <div className="grd-inner" key={e?.repoGitId}>
            <div className="grd-inner-header">
              <div className="grd-inner-header-title">
                <h3 onClick={() => onFold(i)}>{e?.rpName}</h3>
                <img
                  style={{height: "1rem", width: "auto", marginRight: "0.2em"}}
                  src={Star}
                  alt={""}
                />
                <h4>{e?.rpStar}</h4>
                <button className="round-btn" onClick={() => onDelete(i)}>
                  삭제
                </button>
              </div>

              <ul className="grd-inner-header-info">
                <li>
                  <h4>생성일</h4>
                  <span className="grd-inner-bottom-detail">
                    {e?.created_at || e?.rpSdate}
                  </span>
                </li>

                <li>
                  <h4>최근 업데이트</h4>
                  <div className="grd-inner-bottom-detail">
                    {e?.updated_at || e?.rpEdate}
                  </div>
                </li>

                <li>
                  <h4>사용언어</h4>
                  <div className="grd-inner-bottom-detail">{e?.langStr}</div>
                </li>
              </ul>
            </div>

            <div
              style={e?.fold ? {display: "none"} : {}}
              className="grd-inner-body"
            >
              <li>{e?.description ?? "Description이 없습니다."}</li>
              <li className="grd-inner-readme">
                <span
                  onClick={() => {
                    console.log(e?.readme);
                    setReadmeModal({show: true, source: e?.readme});
                  }}
                >
                  README.md
                </span>
                <img
                  src={e?.useReadme ? GrayEye : BlueEye}
                  alt={""}
                  onClick={() => {
                    repos[i].useReadme = !(e?.useReadme ?? false);
                    setRepos([...repos]);
                  }}
                />
              </li>

              <li style={{borderBottom: "none", paddingBottom: "0"}}>
                <h3>상세 설명</h3>
              </li>
              <li>
                <div className="grd-detail-left">기간</div>
                <div className="grd-detail-right">
                  <input
                    type={"text"}
                    name="rpSdate"
                    placeholder="시작일"
                    value={e?.rpSdate || ""}
                    onChange={(e) => onInputChange(e, i)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <span style={{color: "#272727"}}>~</span>
                  <input
                    type={"text"}
                    name="rpEdate"
                    placeholder="마감일"
                    value={e?.rpEdate || ""}
                    onChange={(e) => onInputChange(e, i)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </li>

              <li>
                <div className="grd-detail-left">역할</div>
                <div className="grd-detail-right">
                  <input
                    name="rpRole"
                    placeholder="프론트엔드 개발 / 디자인"
                    value={e?.rpRole || ""}
                    onChange={(e) => onInputChange(e, i)}
                  />
                </div>
              </li>

              <li>
                <div className="grd-detail-left">기술스택</div>
                <div className="grd-detail-right">
                  <Select
                    isMulti
                    styles={styles}
                    placeholder=""
                    name="selects"
                    className="grd-inner-skill"
                    classNamePrefix="select"
                    options={skillOptions}
                    value={e?.skillsArr}
                    inputValue={e?.skillsValue}
                    onInputChange={(e) => {
                      repos[i]["skillsValue"] = e;
                      setRepos([...repos]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const {value} = e.target;
                        if (
                          e?.skillsArr?.filter((t) => t.value === value)
                            ?.length > 0
                        ) {
                          return;
                        }
                        if (!(e?.skillsValue?.length > 0)) {
                          return;
                        }

                        repos[i]["skillsArr"] = [
                          ...(e?.skillsArr ?? []),
                          {
                            value: e?.skillsValue,
                            label: e?.skillsValue,
                          },
                        ];
                        repos[i].skillsValue = "";
                        setRepos([...repos]);
                      }
                    }}
                    onChange={(e) => {
                      repos[i]["skillsArr"] = e;
                      setRepos([...repos]);
                    }}
                  />
                </div>
              </li>

              <li>
                <div className="grd-detail-left">URL</div>
                <div className="grd-detail-right">
                  <input
                    name="rpShortContents"
                    placeholder="000.000.000"
                    value={e?.rpShortContents || ""}
                    onChange={(e) => onInputChange(e, i)}
                  />
                </div>
              </li>

              <li>
                <div className="grd-detail-left">설명</div>
                <textarea
                  name="rpLongContents"
                  placeholder="설명"
                  value={e?.rpLongContents || ""}
                  onChange={(e) => onInputChange(e, i)}
                />
              </li>
            </div>

            <div className="grd-inner-fold-img-wrapper">
              <img
                src={Fold}
                alt={""}
                onClick={() => onFold(i)}
                style={{transform: `rotate(${e?.fold ? 90 : -90}deg)`}}
              />
            </div>
          </div>
        ))}
      </div>

      {showAlert && (
        <BtnModal
          title={"저장에 실패하였습니다"}
          setShow={setShowAlert}
          btns={[{name: "닫기", onClick: () => setShowAlert(false)}]}
        />
      )}

      {readmeModal?.show && (
        <MdPreviewModal
          source={readmeModal?.source || ""}
          setModal={setReadmeModal}
        />
      )}
    </div>
  );
}
export default GitRepoDetail;
