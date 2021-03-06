import "./style.css";

import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Modal from "../../../components/Modal";
import BtnModal from "../../../components/Modal/BtnModal";
import PortfolioChoiceModal from "../../../components/Modal/PortfolioChoiceModal";
import RoundContainer from "../../../components/RoundContainer";
import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";

import HippoImg from "../../../assets/profile.png";

import {loginBack} from "../../../hooks/login";
import {DEFAULT_SKILL_LIST, getOptions} from "../../../hooks/options";
import {isValidUser, useUserContext} from "../../../hooks/useUserContext";
import {getPortfolioDetail, userHasPortfoilo} from "../../../hooks/portfolio";
import {
  deletePersonal,
  editPersonal,
  savePersonal,
} from "../../../hooks/personal";

const onArrChange = (target, setTarget, i, e) => {
  const {name, value} = e?.target;
  target[i][name] = value;
  setTarget([...target]);
};
const onJsonChange = (target, setTarget, e) => {
  const {name, value} = e?.target;
  target[name] = value;
  setTarget({...target});
};

export default function PersonalInput({match}) {
  const location = useLocation();
  const history = useHistory();

  const {user} = useUserContext();

  const [showFirstModal, setShowFirstModal] = useState(false),
    [showSecondModal, setShowSecondModal] = useState(false),
    [alertModal, setAlertModal] = useState({show: false});

  const [skillStack, setSkillStack] = useState([]),
    [personalId, setPersonalId] = useState(-1);

  const [basicList, setBasicList] = useState({
      biName: "",
      biMail: "",
      biBirth: "",
      biPhone: "",
    }),
    [introList, setIntroList] = useState({shortIntro: "", longIntro: ""}),
    [careerList, setCareerList] = useState([]),
    [eduList, setEduList] = useState([]),
    [licList, setLicList] = useState([]),
    [awardList, setAwardList] = useState([]),
    [actList, setActList] = useState([]),
    [snsList, setSnsList] = useState([]),
    [skillList, setSkillList] = useState([]),
    [paperList, setPaperList] = useState([]),
    [delInfoList, setDelInfoList] = useState({
      activity: [],
      award: [],
      career: [],
      education: [],
      license: [],
      paper: [],
      skill: [],
      sns: [],
    });

  const setter = {
    activity: setActList,
    award: setAwardList,
    career: setCareerList,
    education: setEduList,
    license: setLicList,
    paper: setPaperList,
    skill: setSkillList,
    sns: setSnsList,
  };

  const onImgChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        basicList.biImage = base64.toString();
        setBasicList({...basicList});
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onRemove = (olist, name, i) => {
    if (olist[i]?.id > -1) {
      delInfoList[name].push(olist[i].id);
      setDelInfoList({...delInfoList});
    }

    const list = [...olist];
    list.splice(i, 1);
    setter[name](list);
  };

  const initPersonal = useCallback((data = undefined) => {
    if (!data) {
      setPersonalId(-1);
      setShowFirstModal(true);
      return;
    }

    setPersonalId(data?.id ?? -1);
    setActList(data?.activities || []);
    setAwardList(data?.awards || []);
    setBasicList(data?.basicInfo || {});
    setCareerList(data?.careers || []);
    setEduList(data?.educations || []);
    setIntroList(data?.introduction || {});
    setLicList(data?.licenses || []);
    setPaperList(data?.papers || []);
    setSnsList(data?.snsList || []);
    setSkillList(data?.skills || []);
  }, []);

  const onSave = async () => {
    let result = {
      pfId: parseInt(match.params.pfID),
      activities: actList || [],
      awards: awardList || [],
      basicInfo: basicList || {},
      careers: careerList || [],
      educations: eduList || [],
      introduction: introList,
      licenses: licList || [],
      papers: paperList || [],
      snsList: snsList || [],
      skills: skillList || [],
    };

    for (let i in result) {
      if (!Array.isArray(result[i])) {
        continue;
      }

      let delList = [];
      for (let j = 0; j < result[i]?.length || 0; j++) {
        let blank = true;
        for (let k in result[i][j]) {
          if (result[i][j][k]?.length > 0) {
            blank = false;
            break;
          }
        }
        if (blank) delList.push(j);
      }

      delList.sort((a, b) => b - a);
      for (let j of delList) {
        result[i].splice(j, 1);
      }
    }

    if (personalId > -1) {
      result.id = personalId;

      let editResult = await editPersonal(result)
        .then((r) => {
          if (!r) {
            throw Error("DataErr : Failed to reload personal information.");
          }

          // history ??????
          let newState = location?.state || {};
          newState.data.personal = r;
          history.replace(location.pathname, newState);

          return true;
        })
        .catch((e) => {
          console.error(e);
          setAlertModal({
            show: true,
            title: "?????? ????????? ??????????????? ?????????????????????",
          });
          return false;
        });

      for (let sname in delInfoList) {
        if (delInfoList[sname]?.length > 0) {
          for (let i = 0; i < delInfoList[sname].length; i++) {
            editResult &= await deletePersonal(sname, delInfoList[sname][i]);
          }
        }
      }
      setDelInfoList({
        activity: [],
        award: [],
        career: [],
        education: [],
        license: [],
        paper: [],
        skill: [],
        sns: [],
      });

      return editResult;
    } else {
      return savePersonal(result)
        .then((r) => {
          if (!r) {
            throw Error("DataErr : Failed to reload personal information.");
          }

          // history ??????
          let newState = location?.state || {};
          newState.data.personal = r;
          history.replace(location.pathname, newState);

          return true;
        })
        .catch((e) => {
          console.error(e);
          setAlertModal({
            show: true,
            title: "?????? ????????? ??????????????? ?????????????????????.",
          });

          return false;
        });
    }
  };

  const onPrev = () => {
    history.push(`/new/2/${match.params.pfID}`, {
      ...location.state,
    });
  };
  const onNext = () => {
    onSave().then((r) => {
      if (r) {
        history.push(`/export/${match.params.pfID}`, {
          ...location.state,
        });
      }
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

    // authority check
    if (!userHasPortfoilo(user.id, match.params.pfID)) {
      history.replace("/error/unauthorized");
      return;
    }

    // data check
    if (!location.state?.data?.repo) {
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

    initPersonal(location?.state?.data?.personal);
    getOptions()
      .then((r) => {
        setSkillStack(r.map((e) => e?.name || ""));
      })
      .catch((e) => {
        console.error(e);
        setSkillStack(DEFAULT_SKILL_LIST);
      });
  }, [history, location, match.params, user, initPersonal]);

  return (
    <div className="info-input">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={onSave}
      />

      <RoundContainer blueHeader={true}>
        {/* mainInfo: ?????? ????????????, ?????? */}
        <div className="main-info">
          {/* generalInfo: ?????? ???????????? */}
          <div className="left">
            <h1 className="beautiful-title">?????? ????????????</h1>
            <br />
            <div className="info-input-form">
              <input
                type="text"
                name="biName"
                placeholder="??????"
                value={basicList.biName || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
              <input
                type="email"
                name="biMail"
                placeholder="?????????"
                value={basicList.biMail || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
              <input
                type="text"
                name="biBirth"
                placeholder="????????????"
                value={basicList.biBirth || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <input
                type="text"
                name="biPhone"
                placeholder="????????????"
                value={basicList.biPhone || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
            </div>
          </div>

          {/* ?????? */}
          <div className="right">
            <h1 className="beautiful-title">??????</h1>
            <br />

            <div className="img-container">
              <div className="img-preview">
                <img src={basicList?.biImage || HippoImg} alt={""} />
              </div>

              <div className="img-btns">
                <label
                  htmlFor="img-file"
                  className="round-btn"
                  style={{textAlign: "center"}}
                >
                  ?????? ??????
                </label>
                <button
                  className="round-red-btn"
                  onClick={() => {
                    basicList.biImage = "";
                    setBasicList({...basicList});
                  }}
                >
                  ?????? ????????????
                </button>

                <input
                  id="img-file"
                  type="file"
                  accept="image/*"
                  onChange={onImgChange}
                  style={{display: "none"}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ii-etc">
          <h1 className="beautiful-title">??? ?????? ??????</h1>
          <br />

          <div>
            <div className="title">
              <h3>????????????</h3>
            </div>
            <div className="info-intro">
              <input
                id="introShort"
                type="text"
                name="shortIntro"
                placeholder="????????????"
                value={introList.shortIntro || ""}
                onChange={(e) => {
                  onJsonChange(introList, setIntroList, e);
                }}
              />
              <textarea
                id="introLong"
                placeholder="????????????"
                name="longIntro"
                value={introList.longIntro || ""}
                onChange={(e) => {
                  onJsonChange(introList, setIntroList, e);
                }}
              />
            </div>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>????????????</h3>
              <button
                onClick={() => {
                  setCareerList([
                    ...careerList,
                    {
                      carName: "",
                      carDepartmentName: "",
                      carPosition: "",
                      carEndDate: "",
                      carJob: "",
                    },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {careerList.map((x, i) => (
                <li key={`career-list-${i}`} className={"clist-item"}>
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(careerList, "career", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="carName"
                      placeholder="?????????"
                      value={x?.carName || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carDepartmentName"
                      placeholder="?????????"
                      value={x?.carDepartmentName || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carStartDate"
                      placeholder="?????????"
                      value={x?.carStartDate || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="carEndDate"
                      placeholder="?????????"
                      value={x?.carEndDate || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="carPosition"
                      value={x?.carPosition || ""}
                      placeholder="??????"
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carJob"
                      value={x?.carJob || ""}
                      placeholder="??????"
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                      style={{flex: "2"}}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>????????????</h3>
              <button
                onClick={() => {
                  setEduList([
                    ...eduList,
                    {
                      eduType: "",
                      eduStartDate: "",
                      eduEndDate: "",
                      eduGrade: "",
                    },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {eduList.map((x, i) => (
                <li key={`school-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(eduList, "education", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <select
                      name="eduType"
                      defaultValue={x?.eduType || ""}
                      onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                    >
                      <option value="" disabled>
                        ??????
                      </option>
                      <option value="????????????">????????????</option>
                      <option value="?????????">?????????</option>
                      <option value="?????????">?????????</option>
                      <option value="??????">??????</option>
                    </select>

                    <select
                      name="eduGrade"
                      defaultValue={x?.eduGrade || ""}
                      onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                    >
                      <option value="" disabled>
                        ??????
                      </option>
                      <option value="??????">??????</option>
                      <option value="??????">??????</option>
                    </select>
                    <input
                      type="text"
                      name="eduStartDate"
                      placeholder="?????????"
                      value={x?.eduStartDate || ""}
                      onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    {x?.eduGrade !== "??????" && (
                      <input
                        type="text"
                        name="eduEndDate"
                        placeholder="?????????"
                        value={x?.eduEndDate || ""}
                        onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>??????/????????????</h3>
              <button
                onClick={() => {
                  setLicList([
                    ...licList,
                    {
                      licName: "",
                      licLevel: "",
                      licOrganization: "",
                      licDate: "",
                    },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {licList.map((x, i) => (
                <li key={`cer-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(licList, "license", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{width: "100%"}}>
                    <input
                      type="text"
                      name="licName"
                      placeholder="??????/?????? ??????"
                      value={x?.licName || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licLevel"
                      placeholder="??????/??????/??????"
                      value={x?.licLevel || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licOrganization"
                      placeholder="????????????"
                      value={x?.licOrganization || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licDate"
                      placeholder="?????????"
                      value={x?.licDate || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>??????</h3>
              <button
                onClick={() => {
                  setAwardList([
                    ...awardList,
                    {
                      awContents: "",
                      awName: "",
                      awOrganization: "",
                      awDate: "",
                    },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {awardList.map((x, i) => (
                <li key={`award-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(awardList, "award", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{width: "100%"}}>
                    <input
                      type="text"
                      name="awName"
                      placeholder="?????????"
                      value={x?.awName || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="awOrganization"
                      placeholder="??????"
                      value={x?.awOrganization || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="awDate"
                      placeholder="?????????"
                      value={x?.awDate || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="awContents"
                      placeholder="????????????"
                      value={x?.awContents || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                      style={{flex: "2"}}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <br />
          <div>
            <div className="title">
              <h3>?????? ??????</h3>
              <button
                onClick={() =>
                  setActList([
                    ...actList,
                    {
                      actName: "",
                      actContents: "",
                      actStartDate: "",
                      actEndDate: "",
                    },
                  ])
                }
              >
                +
              </button>
            </div>

            <ul>
              {actList.map((x, i) => (
                <li key={`etc-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(actList, "activity", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{width: "100%"}}>
                    <input
                      type="text"
                      name="actName"
                      placeholder="?????????"
                      value={x?.actName || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                    />
                    <input
                      type="text"
                      name="actStartDate"
                      placeholder="?????????"
                      value={x?.actStartDate || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="actEndDate"
                      placeholder="?????????"
                      value={x?.actEndDate || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="actContents"
                      placeholder="????????????"
                      value={x?.actContents || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                      style={{flex: "2"}}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>SNS</h3>
              <button
                onClick={() => {
                  setSnsList([...snsList, {snsName: "", snsLink: ""}]);
                }}
              >
                +
              </button>
            </div>
            <ul>
              {snsList.map((x, i) => (
                <li key={`sns-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(snsList, "sns", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="snsName"
                      placeholder="??????"
                      value={x?.snsName || ""}
                      onChange={(e) => onArrChange(snsList, setSnsList, i, e)}
                    />
                    <input
                      type="text"
                      name="snsLink"
                      placeholder="??????/??????"
                      value={x?.snsLink || ""}
                      onChange={(e) => onArrChange(snsList, setSnsList, i, e)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>????????????</h3>
              <button
                onClick={() => {
                  setSkillList([...skillList, {skName: "", skLevel: ""}]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {skillList.map((x, i) => (
                <li key={`stack-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(skillList, "skill", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="skName"
                      placeholder="?????? ??????"
                      value={x?.skName || ""}
                      onChange={(e) =>
                        onArrChange(skillList, setSkillList, i, e)
                      }
                      list="stackoption"
                    />

                    <datalist id="stackoption">
                      {skillStack.map((e) => (
                        <option value={e} key={`skill-stack-${e}`}>
                          {e}
                        </option>
                      ))}
                    </datalist>
                    <select
                      name="skLevel"
                      defaultValue={x?.skLevel || ""}
                      onChange={(e) =>
                        onArrChange(skillList, setSkillList, i, e)
                      }
                    >
                      <option value="" disabled>
                        ??????
                      </option>
                      <option value="1">???</option>
                      <option value="2">???</option>
                      <option value="3">???</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>?????? / ?????? / ??????</h3>
              <button
                onClick={() => {
                  setPaperList([
                    ...paperList,
                    {
                      ppName: "",
                      ppNumber: "",
                      ppPublisher: "",
                      ppWriter: "",
                      ppDate: "",
                      ppLink: "",
                      ppContents: "",
                    },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {paperList.map((x, i) => (
                <li key={`patent-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => onRemove(paperList, "paper", i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="ppName"
                      placeholder="??????"
                      value={x?.ppName || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppNumber"
                      placeholder="????????????/????????????"
                      value={x?.ppNumber || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppWriter"
                      placeholder="??????/?????????"
                      value={x?.ppWriter || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppPublisher"
                      placeholder="?????????/????????????"
                      value={x?.ppPublisher || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppDate"
                      placeholder="??????/?????????"
                      value={x?.ppDate || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="ppLink"
                      placeholder="??????"
                      value={x?.ppLink || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                      style={{flex: "2"}}
                    />
                    <div className="patent-intro">
                      <textarea
                        name="ppContents"
                        placeholder="??????"
                        value={x?.ppContents || ""}
                        onChange={(e) =>
                          onArrChange(paperList, setPaperList, i, e)
                        }
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RoundContainer>

      {/* ??????????????? ?????? ?????? ?????? */}
      {showFirstModal && (
        <BtnModal
          title={"????????? ????????? ????????? ?????????????????????????"}
          setShow={setShowFirstModal}
          btns={[
            {
              name: "???",
              onClick: () => {
                setShowFirstModal(false);
                setShowSecondModal(true);
              },
            },
            {name: "?????????", onClick: () => setShowFirstModal(false)},
          ]}
        />
      )}

      {/* ??????????????? ?????? ?????? */}
      {showSecondModal && (
        <Modal backBlack={true}>
          <PortfolioChoiceModal
            initPersonal={initPersonal}
            onNo={() => setShowSecondModal(false)}
          />
        </Modal>
      )}

      {alertModal?.show && (
        <BtnModal
          title={alertModal?.title}
          msg={alertModal?.msg}
          btns={[
            {
              name: "??????",
              onClick: () => {
                setAlertModal({show: false});
              },
            },
          ]}
        />
      )}
    </div>
  );
}
