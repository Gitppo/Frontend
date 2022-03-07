import "./style.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

import axios from "axios";

import RoundContainer from "../../../components/RoundContainer";
import BeforeAfterBtn from "../../../components/Btn/BeforeAfterBtn";

import Modal from "../../../components/Modal";
import BtnModal from "../../../components/Modal/BtnModal";
import PortfolioChoiceModal from "../../../components/Modal/PortfolioChoiceModal";

import HippoImg from "../../../assets/profile.png";

import { getOptions } from "../../../hooks/options";


export default function InfoInput() {
  const location = useLocation();
  const history = useHistory();

  const [showModal, setShowModal] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [imgBase64, setImgBase64] = useState("");

  const handleChangeFile = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const [infoList, setInfoList] = useState([
    { biName: "", biMail: "", biBirth: "", biPhone: "" },
  ]);
  const [careerList, setCareerList] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [certList, setCertList] = useState([]);
  const [awardList, setAwardList] = useState([]);
  const [etcList, setEtcList] = useState([]);
  const [introList, setIntroList] = useState([{ shortIntro: "", longIntro: "" }]);
  const [snsList, setSnsList] = useState([]);
  const [stackList, setStackList] = useState([]);
  const [patentList, setPatentList] = useState([]);

  const [skillList, setSkillList] = useState([]);

  const handleInputChange = (List, setList, i, e) => {
    const { name, value } = e?.target;
    const list = [...List];
    list[i][name] = value;
    setList(list);
    console.log(list);
  };

  const handleInputChange2 = (List, setList, e) => {
    const { name, value } = e?.target;
    List[0][name] = value;
    setList(List);
    console.log(List);
  }

  const handleRemoveClick = (List, setList, i) => {
    const list = [...List];
    list.splice(i, 1);
    setList(list);
  };

  const tmpSave = () => { };

  const onPrev = () => {
    history.push("/new/2", {
      ...location.state,
    });
  };
  const onNext = () => {
    tmpSave();
    history.push("/export", {
      ...location.state,
    });
  };

  return (
    <div className="info-input">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={tmpSave}
      />

      <RoundContainer blueHeader={true}>
        {/* mainInfo: 기본 인적사항, 사진 */}
        <div className="main-info">
          {/* generalInfo: 기본 인적사항 */}
          <div>
            <h1 className="beautiful-title">기본 인적사항</h1>
            <br />
            <form className="info-input-form">
              <input
                type="text"
                name="biName"
                placeholder="이름"
                value={infoList.biName}
                onChange={(e) =>
                  handleInputChange2(infoList, setInfoList, e)
                }
                required
              />
              <input
                type="email"
                name="biMail"
                placeholder="이메일"
                value={infoList.biMail}
                onChange={(e) =>
                  handleInputChange2(infoList, setInfoList, e)
                }
                required
              />
              <input
                type="text"
                name="biBirth"
                placeholder="생년월일 (ex.19951004)"
                value={infoList.biBirth}
                onChange={(e) =>
                  handleInputChange2(infoList, setInfoList, e)
                }
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                required
              />
              <input
                type="text"
                name="biPhone"
                placeholder="전화번호"
                maxLength="11"
                value={infoList.biPhone}
                onChange={(e) =>
                  handleInputChange2(infoList, setInfoList, e)
                }
                required
              />
            </form>
          </div>

          {/* 사진 */}
          <div>
            <h1 className="beautiful-title">사진</h1>
            <br />

            <div className="img-container">
              <div className="img-preview">
                <img src={imgBase64 || HippoImg} alt={""} />
              </div>

              <div className="img-btns">
                <label
                  for="img-file"
                  className="round-button"
                  style={{ textAlign: "center" }}
                >
                  파일 선택
                </label>
                <button
                  className="round-button"
                  onClick={() => setImgBase64("")}
                >
                  기본 이미지로
                </button>

                <input
                  id="img-file"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeFile}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className="ii-etc">
          <h1 className="beautiful-title">그 외의 정보</h1>
          <br />

          <div>
            <div className="title">
              <h3>자기소개</h3>
            </div>
            {/* // TODO : List -> 단일 요소  */}
            <div className="info-intro">
              <input
                id="introShort"
                type="text"
                name="shortIntro"
                placeholder="한줄소개"
                value={introList.shortIntro}
                onChange={(e) => {
                  handleInputChange2(introList, setIntroList, e);
                }}
              />
              <textarea
                id="introLong"
                placeholder="자기소개"
                name="longIntro"
                value={introList.longIntro}
                onChange={(e) => {
                  handleInputChange2(introList, setIntroList, e);
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
                      carPosition: "",
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
                      onClick={() =>
                        handleRemoveClick(careerList, setCareerList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="company"
                      placeholder="회사명"
                      value={x?.carName}
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="depart"
                      placeholder="부서명"
                      value={x?.carDepartmentName}
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="start"
                      placeholder="입사일"
                      value={x?.carStartDate}
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="end"
                      placeholder="퇴사일"
                      value={x?.carEndDate}
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="position"
                      value={x?.carPosition}
                      placeholder="직위"
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="job"
                      value={x?.carJob}
                      placeholder="직무"
                      onChange={(e) =>
                        handleInputChange(careerList, setCareerList, i, e)
                      }
                      style={{ flex: "2" }}
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
                  setSchoolList([
                    ...schoolList,
                    { eduType: "", eduStartDate: "", eduEndDate: "", eduGrade: "" },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {schoolList.map((x, i) => (
                <li key={`school-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() =>
                        handleRemoveClick(schoolList, setSchoolList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <select
                      name="schoolType"
                      value={x?.eduType}
                      onChange={(e) =>
                        handleInputChange(schoolList, setSchoolList, i, e)
                      }
                    >
                      <option value="">학교</option>
                      <option value="high">고등학교</option>
                      <option value="univ">대학교</option>
                      <option value="grad">대학원</option>
                      <option value="etc">기타</option>
                    </select>
                    <select
                      name="schoolStat"
                      value={x?.eduGrade}
                      onChange={(e) =>
                        handleInputChange(schoolList, setSchoolList, i, e)
                      }
                    >
                      <option value="">상태</option>
                      <option value="attend">재학</option>
                      <option value="graduate">졸업</option>
                    </select>
                    <input
                      type="text"
                      name="start"
                      placeholder="입학일"
                      value={x?.eduStartDate}
                      onChange={(e) =>
                        handleInputChange(schoolList, setSchoolList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    {x?.eduGrade !== "attend" && (
                      <input
                        type="text"
                        name="end"
                        placeholder="졸업일"
                        value={x?.eduEndDate}
                        onChange={(e) =>
                          handleInputChange(schoolList, setSchoolList, i, e)
                        }
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
                  setCertList([
                    ...certList,
                    { licName: "", licLevel: "", licOrganization: "", licDate: "" },
                  ]);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {certList.map((x, i) => (
                <li key={`cer-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() =>
                        handleRemoveClick(certList, setCertList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="cert"
                      placeholder="자격/어학 종류"
                      value={x?.licName}
                      onChange={(e) =>
                        handleInputChange(certList, setCertList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="level"
                      placeholder="등급/레벨/점수"
                      value={x?.licLevel}
                      onChange={(e) =>
                        handleInputChange(certList, setCertList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="auth"
                      placeholder="발급기관"
                      value={x?.licOrganization}
                      onChange={(e) =>
                        handleInputChange(certList, setCertList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="issueDate"
                      placeholder="취득일"
                      value={x?.licDate}
                      onChange={(e) =>
                        handleInputChange(certList, setCertList, i, e)
                      }
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
                    { awContents: "", awName: "", awOrganization: "", awDate: "" },
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
                      onClick={() =>
                        handleRemoveClick(awardList, setAwardList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="award"
                      placeholder="대회명"
                      value={x?.awName}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="auth"
                      placeholder="주최"
                      value={x?.awOrganization}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="issueDate"
                      placeholder="수상일"
                      value={x?.awDate}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="place"
                      placeholder="수상내용"
                      value={x?.awContents}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                      style={{ flex: "2" }}
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
                  setEtcList([
                    ...etcList,
                    { actName: "", actContents: "", actStartDate: "", actEndDate: "" },
                  ])
                }
              >
                +
              </button>
            </div>

            <ul>
              {etcList.map((x, i) => (
                <li key={`etc-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() => handleRemoveClick(etcList, setEtcList, i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="etc"
                      placeholder="활동명"
                      value={x?.actName}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="start"
                      placeholder="시작일"
                      value={x?.actStartDate}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="end"
                      placeholder="종료일"
                      value={x?.actEndDate}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="about"
                      placeholder="설명"
                      value={x?.actContents}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                      style={{ flex: "2" }}
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
                  setSnsList([...snsList, { snsName: "", snsLink: "" }]);
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
                      onClick={() => handleRemoveClick(snsList, setSnsList, i)}
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="sns"
                      placeholder="종류"
                      value={x?.snsName}
                      onChange={(e) =>
                        handleInputChange(snsList, setSnsList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="link"
                      placeholder="계정주소"
                      value={x?.snsLink}
                      onChange={(e) =>
                        handleInputChange(snsList, setSnsList, i, e)
                      }
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
                  setStackList([...stackList, { skName: "", skLevel: "" }]);
                  console.log(getOptions())
                  // const skills = getOptions()
                  // console.log(skills)
                  // skills.map((skill) => {
                  //   console.log(skill)
                  // })
                }}
              >
                +
              </button>
            </div>

            <ul>
              {stackList.map((x, i) => (
                <li key={`stack-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() =>
                        handleRemoveClick(stackList, setStackList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="stack"
                      placeholder="기술 종류"
                      value={x?.skName}
                      onChange={(e) =>
                        handleInputChange(stackList, setStackList, i, e)
                      }
                      list="stackoption"
                    />

                    <datalist id="stackoption">
                      {/* <option value={importSkill()} /> */}
                    </datalist>
                    <select
                      name="level"
                      value={x?.skLevel}
                      onChange={(e) =>
                        handleInputChange(stackList, setStackList, i, e)
                      }
                    >
                      <option value="">레벨</option>
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
                  setPatentList([
                    ...patentList,
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
              {patentList.map((x, i) => (
                <li key={`patent-list-${i}`} className="clist-item">
                  <div>
                    <button
                      className="del-btn"
                      onClick={() =>
                        handleRemoveClick(patentList, setPatentList, i)
                      }
                    >
                      -
                    </button>
                  </div>

                  <div className="right">
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={x?.ppName}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="number"
                      placeholder="고유번호/출원번호"
                      value={x?.ppNumber}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="author"
                      placeholder="저자/출판인"
                      value={x?.ppWriter}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="출판사/출원국가"
                      value={x?.ppPublisher}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="date"
                      placeholder="발행/출원일"
                      value={x?.ppDate}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "month")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    <input
                      type="text"
                      name="link"
                      placeholder="링크"
                      value={x?.ppLink}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      style={{ flex: "2" }}
                    />
                    <div className="patent-intro">
                      <textarea
                        name="des"
                        placeholder="설명"
                        value={x?.ppContents}
                        onChange={(e) =>
                          handleInputChange(patentList, setPatentList, i, e)
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
      {
        showModal && (
          <Modal backBlack={true}>
            <BtnModal
              title={"기존에 입력한 정보를 가져오시겠습니까?"}
              onBtn1={() => {
                setShowModal(false);
                setShowModal2(true);
                axios
                  .get(`${process.env.REACT_APP_BACKEND}/api/portfolio`)
                  .then((Response) => {
                    console.log(Response.data);
                  })
                  .catch((Error) => {
                    console.log(Error);
                  });
              }}
              onBtn2={() => setShowModal(false)}
            />
          </Modal>
        )
      }

      {/* 포트폴리오 선택 모달 */}
      {
        showModal2 && (
          <Modal backBlack={true}>
            <PortfolioChoiceModal onNo={() => setShowModal2(false)} />
          </Modal>
        )
      }
    </div >
  );
}
