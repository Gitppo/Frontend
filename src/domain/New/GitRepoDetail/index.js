import "./style.css";
import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Select from "react-select";

import {getOptions} from "../../../hooks/options";

import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";

import Star from "../../../assets/star.png";
import BlueEye from "../../../assets/eye-blue.png";
import GrayEye from "../../../assets/eye-gray.png";
import Fold from "../../../assets/arrow-no-head.png";
import {saveRepository} from "../../../hooks/repository";

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

  const onInputChange = (e, index) => {
    repos[index][e.target.name] = e.target.value;
    setRepos([...repos]);
  };
  const deletePortfolio = (id) => {
    let i = 0;
    for (i = 0; i < repos.length; i++) {
      if (repos[i].id === id) {
        break;
      }
    }

    repos[i].checked = false;
    repos.splice(i, 1);

    setRepos([...repos]);
  };

  const tmpSave = () => {
    // console.log(repos);
    const tmp = repos.map((e) => ({
      pfId: match.params.pfID,
      rpGpId: e.id,
      rpName: e.name,
      rpSdate: e?.rpSdate || "",
      rpEdate: e?.rpEdate || "",
      rpShortContents: e?.rpShortContents || "",
      rpLongContents: e?.rpLongContents || "",
      rpReadme: e?.useReadme ?? true ? e?.readme : "",
      rpRole: e?.rpRole || "",
      rpStar: e?.stargazers_count || 0,
    }));

    console.log(tmp);

    saveRepository(tmp).then((r) => {
      for (let i in r) repos[i].rpID = r[i];
      setRepos([...repos]);
      location.state = {
        ...location.state,
        data: {
          ...location.state?.data,
          repo: repos,
        },
      };
    });
  };

  const repoDC = useCallback(() => {
    setRepos(
      JSON.parse(
        JSON.stringify(
          location.state.gitrepos
            .filter((e) => e.checked)
            .map((e) => ({...e, fold: false}))
        )
      )
    );
  }, [location.state.gitrepos]);

  const onPrev = () => {
    history.push(`/new/1/${match.params.pfID}`, {
      ...location.state,
    });
  };
  const onNext = () => {
    tmpSave();
    history.push(`/new/3/${match.params.pfID}`, {
      ...location.state,
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

    console.log(location.state);
    console.log(location.state.gitrepos.filter((e) => e.checked));

    repoDC();

    getOptions()
      .then((r) => {
        if (!r) {
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
      });
  }, [history, location.state, match.params, repoDC]);

  return (
    <div className="grd">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={tmpSave}
      />

      <div className="grd-wrapper">
        <div className="grd-top-container">
          <div className="grd-top-container-title">레포지토리</div>
          <button className="round-button" onClick={repoDC}>
            초기화
          </button>
        </div>
        {repos.map((box, index) => (
          <li className="grd-inner-box" key={box?.id}>
            <div
              className="grd-inner-box-info-container"
              onClick={() => {
                // fold: true - 접힘 / false - 열림
                repos[index].fold = !(box?.fold || false);
                setRepos([...repos]);
              }}
            >
              <div className="grd-inner-box-top-container">
                <h3 className="grd-inner-box-repo-title">{box?.name}</h3>
                <img
                  style={{height: "1rem", width: "auto", marginRight: "0.2em"}}
                  src={Star}
                  alt={""}
                />
                <div className="grd-inner-box-star-num">
                  {box?.stargazers_count}
                </div>
                <button
                  className="round-button"
                  onClick={() => deletePortfolio(box?.id)}
                >
                  삭제
                </button>
              </div>
              <div className="grd-inner-box-bottom-container">
                <div className="grd-inner-box-bottom-title">생성일</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.created_at}
                </div>
                <div className="grd-inner-box-bottom-title">최근 업데이트</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.updated_at}
                </div>
                <div className="grd-inner-box-bottom-title">사용언어</div>
                <div className="grd-inner-box-bottom-detail">
                  {/* //TODO : repair */}
                  {box?.languages[0]}
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
                    onChange={(e) => {
                      repos[index]["skillOptions"] = e;
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
              onClick={() => {
                // fold: true - 접힘 / false - 열림
                repos[index].fold = !(box?.fold || false);
                setRepos([...repos]);
              }}
            />
          </li>
        ))}
      </div>
    </div>
  );
}
export default GitRepoDetail;
