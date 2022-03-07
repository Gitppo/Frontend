import "./style.css";
import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Select from "react-select";

import {getOptions} from "../../../hooks/options";
import {editRepository, saveRepository} from "../../../hooks/repository";

import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";
import BtnModal from "../../../components/Modal/BtnModal";

import Star from "../../../assets/star.png";
import BlueEye from "../../../assets/eye-blue.png";
import GrayEye from "../../../assets/eye-gray.png";
import Fold from "../../../assets/arrow-no-head.png";
import {getPortfolioDetail} from "../../../hooks/portfolio";

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

  const [repos, setRepos] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const initRepo = useCallback(() => {
    let tmpRepos = [];
    for (let e of location.state.gitrepos.filter((e) => e.checked)) {
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
  }, [location.state.gitrepos, match.params.pfID]);

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
        repoGitId: e?.repoGitId || -1,
        rpName: e?.rpName || "noname",
        rpSdate: e?.rpSdate || "",
        rpEdate: e?.rpEdate || "",
        rpShortContents: e?.rpShortContents ?? "",
        rpLongContents: e?.rpLongContents ?? "",
        rpReadme: (!e?.useReadme ? "" : e?.readme) || "",
        rpRole: e?.rpRole || "",
        rpStar: e?.rpStar || 0,
        rpSkills: e?.skillsArr?.map((e) => e?.value) || [],
        rpLanguages: e?.rpLanguages || [],
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
    onSave(true)
      .then((r) => {
        history.push(`/new/3/${match.params.pfID}`, r);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (
      !match.params?.hasOwnProperty("pfID") ||
      !location.state ||
      !location?.state?.hasOwnProperty("gitrepos")
    ) {
      history.replace("/error/load-fail");
      return;
    }

    initRepo();

    getOptions()
      .then((r) => {
        if (!(r?.length > 0)) {
          throw Error("Failed to load getOptions.");
        }
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
          ["C", "C++", "JavaScript", "CSS", "React", "Firebase"].map((e) => ({
            value: e,
            label: e,
          }))
        );
      });
  }, [history, location.state, match.params, initRepo]);

  return (
    <div className="grd">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={onSave}
      />

      <div className="grd-wrapper">
        <div className="grd-top-container">
          <div className="grd-top-container-title">레포지토리</div>
          <button className="round-button" onClick={initRepo}>
            초기화
          </button>
        </div>
        {repos.map((box, index) => (
          <li className="grd-inner-box" key={box?.repoGitId}>
            <div className="grd-inner-box-info-container">
              <div className="grd-inner-box-top-container">
                <h3
                  className="grd-inner-box-repo-title"
                  onClick={() => onFold(index)}
                >
                  {box?.rpName}
                </h3>
                <img
                  style={{height: "1rem", width: "auto", marginRight: "0.2em"}}
                  src={Star}
                  alt={""}
                />
                <div className="grd-inner-box-star-num">{box?.rpStar}</div>
                <button
                  className="round-button"
                  onClick={() => onDelete(index)}
                >
                  삭제
                </button>
              </div>
              <div className="grd-inner-box-bottom-container">
                <div className="grd-inner-box-bottom-title">생성일</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.created_at || box?.rpSdate}
                </div>
                <div className="grd-inner-box-bottom-title">최근 업데이트</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.updated_at || box?.rpEdate}
                </div>
                <div className="grd-inner-box-bottom-title">사용언어</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.langStr}
                </div>
              </div>
            </div>

            <div style={box?.fold ? {display: "none"} : {}}>
              <div className="grd-inner-box-title">
                <div className="grd-inner-box-text">
                  {box?.description ?? "Description이 없습니다."}
                </div>
              </div>
              <div className="grd-inner-box-readme">
                README.md
                <img
                  style={{
                    height: "1rem",
                    width: "auto",
                    marginLeft: "0.5em",
                    cursor: "pointer",
                  }}
                  src={box?.useReadme ? GrayEye : BlueEye}
                  alt={""}
                  onClick={() => {
                    repos[index].useReadme = !(box?.useReadme ?? false);
                    setRepos([...repos]);
                  }}
                />
              </div>
              <h3 className="grd-inner-box-detail">상세 설명</h3>
              <div className="grd-inner-box-title-container">
                <div className="container-title">기간</div>
                <div className="grd-inner-box-right">
                  <input
                    type={"text"}
                    name="rpSdate"
                    className="grd-inner-box-date"
                    placeholder="시작일"
                    value={box?.rpSdate || ""}
                    onChange={(e) => onInputChange(e, index)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <span style={{color: "#272727"}}>~</span>
                  <input
                    type={"text"}
                    name="rpEdate"
                    className="grd-inner-box-date"
                    placeholder="마감일"
                    value={box?.rpEdate || ""}
                    onChange={(e) => onInputChange(e, index)}
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                </div>
              </div>

              <div className="grd-inner-box-title-container">
                <div className="container-title">역할</div>
                <div className="grd-inner-box-right">
                  <input
                    name="rpRole"
                    className="grd-inner-box-right"
                    placeholder="프론트엔드 개발 / 디자인"
                    value={box?.rpRole || ""}
                    onChange={(e) => onInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="grd-inner-box-title-container">
                <div className="container-title">기술스택</div>
                <div className="grd-inner-box-right">
                  <Select
                    isMulti
                    styles={styles}
                    placeholder=""
                    name="selects"
                    className="grd-inner-box-skill"
                    classNamePrefix="select"
                    options={skillOptions}
                    value={box?.skillsArr}
                    inputValue={box?.skillsValue}
                    onInputChange={(e) => {
                      repos[index]["skillsValue"] = e;
                      setRepos([...repos]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const {value} = e.target;
                        if (
                          box?.skillsArr?.filter((t) => t.value === value)
                            ?.length > 0
                        ) {
                          return;
                        }
                        if (!(box?.skillsValue?.length > 0)) {
                          return;
                        }

                        repos[index]["skillsArr"] = [
                          ...(box?.skillsArr ?? []),
                          {
                            value: box?.skillsValue,
                            label: box?.skillsValue,
                          },
                        ];
                        repos[index].skillsValue = "";
                        setRepos([...repos]);
                      }
                    }}
                    onChange={(e) => {
                      repos[index]["skillsArr"] = e;
                      setRepos([...repos]);
                    }}
                  />
                </div>
              </div>

              <div className="grd-inner-box-title-container">
                <div className="container-title">URL</div>
                <div className="grd-inner-box-right">
                  <input
                    name="rpShortContents"
                    className="grd-inner-box-right"
                    placeholder="000.000.000"
                    value={box?.rpShortContents || ""}
                    onChange={(e) => onInputChange(e, index)}
                  />
                </div>
              </div>

              <div className="grd-inner-box-title-container-info">
                <div className="container-title">설명</div>
                <textarea
                  name="rpLongContents"
                  className="grd-inner-box-info-text"
                  placeholder="설명"
                  value={box?.rpLongContents || ""}
                  onChange={(e) => onInputChange(e, index)}
                />
              </div>
            </div>
            <img
              className={`grd-inner-box-fold-image${box?.fold ? "-down" : ""}`}
              src={Fold}
              alt={""}
              onClick={() => onFold(index)}
            />
          </li>
        ))}
      </div>

      {showAlert && (
        <BtnModal
          title={"저장에 실패하였습니다"}
          setShow={setShowAlert}
          btns={[{name: "닫기", onClick: () => setShowAlert(false)}]}
        />
      )}
    </div>
  );
}
export default GitRepoDetail;
