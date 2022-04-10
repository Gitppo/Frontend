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

          // history 교체
          let newState = location?.state || {};
          newState.data.personal = r;
          history.replace(location.pathname, newState);

          return true;
        })
        .catch((e) => {
          console.error(e);
          setAlertModal({
            show: true,
            title: "입력 내용을 수정하는데 실패하였습니다",
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

          // history 교체
          let newState = location?.state || {};
          newState.data.personal = r;
          history.replace(location.pathname, newState);

          return true;
        })
        .catch((e) => {
          console.error(e);
          setAlertModal({
            show: true,
            title: "입력 내용을 저장하는데 실패하였습니다.",
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
        {/* mainInfo: 기본 인적사항, 사진 */}
        <div className="main-info">
          {/* generalInfo: 기본 인적사항 */}
          <div className="left">
            <h1 className="beautiful-title">기본 인적사항</h1>
            <br />
            <div className="info-input-form">
              <input
                type="text"
                name="biName"
                placeholder="이름"
                value={basicList.biName || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
              <input
                type="email"
                name="biMail"
                placeholder="이메일"
                value={basicList.biMail || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
              <input
                type="text"
                name="biBirth"
                placeholder="생년월일"
                value={basicList.biBirth || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <input
                type="text"
                name="biPhone"
                placeholder="전화번호"
                value={basicList.biPhone || ""}
                onChange={(e) => onJsonChange(basicList, setBasicList, e)}
              />
            </div>
          </div>

          {/* 사진 */}
          <div className="right">
            <h1 className="beautiful-title">사진</h1>
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
                  파일 선택
                </label>
                <button
                  className="round-red-btn"
                  onClick={() => {
                    basicList.biImage = "";
                    setBasicList({...basicList});
                  }}
                >
                  기본 이미지로
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
          <h1 className="beautiful-title">그 외의 정보</h1>
          <br />

          <div>
            <div className="title">
              <h3>자기소개</h3>
            </div>
            <div className="info-intro">
              <input
                id="introShort"
                type="text"
                name="shortIntro"
                placeholder="한줄소개"
                value={introList.shortIntro || ""}
                onChange={(e) => {
                  onJsonChange(introList, setIntroList, e);
                }}
              />
              <textarea
                id="introLong"
                placeholder="자기소개"
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
              <h3>경력사항</h3>
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
                      placeholder="회사명"
                      value={x?.carName || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carDepartmentName"
                      placeholder="부서명"
                      value={x?.carDepartmentName || ""}
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carStartDate"
                      placeholder="입사일"
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
                      placeholder="퇴사일"
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
                      placeholder="직위"
                      onChange={(e) =>
                        onArrChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="carJob"
                      value={x?.carJob || ""}
                      placeholder="직무"
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
              <h3>학력사항</h3>
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
                        구분
                      </option>
                      <option value="고등학교">고등학교</option>
                      <option value="대학교">대학교</option>
                      <option value="대학원">대학원</option>
                      <option value="기타">기타</option>
                    </select>

                    <select
                      name="eduGrade"
                      defaultValue={x?.eduGrade || ""}
                      onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                    >
                      <option value="" disabled>
                        상태
                      </option>
                      <option value="재학">재학</option>
                      <option value="졸업">졸업</option>
                    </select>
                    <input
                      type="text"
                      name="eduStartDate"
                      placeholder="입학일"
                      value={x?.eduStartDate || ""}
                      onChange={(e) => onArrChange(eduList, setEduList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    {x?.eduGrade !== "재학" && (
                      <input
                        type="text"
                        name="eduEndDate"
                        placeholder="졸업일"
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
              <h3>자격/어학사항</h3>
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
                      placeholder="자격/어학 종류"
                      value={x?.licName || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licLevel"
                      placeholder="등급/레벨/점수"
                      value={x?.licLevel || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licOrganization"
                      placeholder="발급기관"
                      value={x?.licOrganization || ""}
                      onChange={(e) => onArrChange(licList, setLicList, i, e)}
                    />
                    <input
                      type="text"
                      name="licDate"
                      placeholder="취득일"
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
              <h3>수상</h3>
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
                      placeholder="대회명"
                      value={x?.awName || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="awOrganization"
                      placeholder="주최"
                      value={x?.awOrganization || ""}
                      onChange={(e) =>
                        onArrChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="awDate"
                      placeholder="수상일"
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
                      placeholder="수상내용"
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
              <h3>기타 활동</h3>
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
                      placeholder="활동명"
                      value={x?.actName || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                    />
                    <input
                      type="text"
                      name="actStartDate"
                      placeholder="시작일"
                      value={x?.actStartDate || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="actEndDate"
                      placeholder="종료일"
                      value={x?.actEndDate || ""}
                      onChange={(e) => onArrChange(actList, setActList, i, e)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="actContents"
                      placeholder="활동내용"
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
                      placeholder="종류"
                      value={x?.snsName || ""}
                      onChange={(e) => onArrChange(snsList, setSnsList, i, e)}
                    />
                    <input
                      type="text"
                      name="snsLink"
                      placeholder="계정/링크"
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
              <h3>기술스택</h3>
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
                      placeholder="기술 종류"
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
                        레벨
                      </option>
                      <option value="1">상</option>
                      <option value="2">중</option>
                      <option value="3">하</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>출판 / 논문 / 특허</h3>
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
                      placeholder="이름"
                      value={x?.ppName || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppNumber"
                      placeholder="고유번호/출원번호"
                      value={x?.ppNumber || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppWriter"
                      placeholder="저자/출판인"
                      value={x?.ppWriter || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppPublisher"
                      placeholder="출판사/출원국가"
                      value={x?.ppPublisher || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="ppDate"
                      placeholder="발행/출원일"
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
                      placeholder="링크"
                      value={x?.ppLink || ""}
                      onChange={(e) =>
                        onArrChange(paperList, setPaperList, i, e)
                      }
                      style={{flex: "2"}}
                    />
                    <div className="patent-intro">
                      <textarea
                        name="ppContents"
                        placeholder="설명"
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

      {/* 포트폴리오 선택 여부 묻기 */}
      {showFirstModal && (
        <BtnModal
          title={"기존에 입력한 정보를 가져오시겠습니까?"}
          setShow={setShowFirstModal}
          btns={[
            {
              name: "예",
              onClick: () => {
                setShowFirstModal(false);
                setShowSecondModal(true);
              },
            },
            {name: "아니오", onClick: () => setShowFirstModal(false)},
          ]}
        />
      )}

      {/* 포트폴리오 선택 모달 */}
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
              name: "닫기",
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
