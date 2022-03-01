import "./style.css";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";

// import Modal from "../../components/Modal/modal";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import RoundContainer from "../../components/RoundContainer";
import Modal from "../../components/Modal";
import YNModal from "../../components/Modal/YNModal/index";
import PortfolioChoiceModal from "../../components/Modal/PortfolioChoiceModal/index";

function InfoInput() {
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);
  const [showModal2, setShowModal2] = useState(false);

  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);
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
      setImgFile(event.target.files[0]);
    }
  };

  const [infoList, setInfoList] = useState([
    {name: "", mail: "", birth: "", tel: ""},
  ]);
  const [careerList, setCareerList] = useState([
    {company: "", depart: "", start: "", end: "", position: "", job: ""},
  ]);
  const [schoolList, setSchoolList] = useState([
    {schoolType: "", start: "", end: "", schoolStat: ""},
  ]);
  const [certList, setCertList] = useState([
    {cert: "", level: "", auth: "", issueDate: ""},
  ]);
  const [awardList, setAwardList] = useState([
    {award: "", place: "", auth: "", issueDate: ""},
  ]);
  const [etcList, setEtcList] = useState([
    {etc: "", about: "", start: "", end: ""},
  ]);
  const [introList, setIntroList] = useState([{introShort: "", introLong: ""}]);
  const [snsList, setSnsList] = useState([{sns: "", link: ""}]);
  const [stackList, setStackList] = useState([{stack: "", level: ""}]);
  const [patentList, setPatentList] = useState([
    {
      name: "",
      number: "",
      company: "",
      author: "",
      date: "",
      link: "",
      des: "",
    },
  ]);

  const handleInputChange = (List, setList, i, e) => {
    const {name, value} = e.target;
    const list = [...List];
    list[i][name] = value;
    setList(list);
  };

  const handleRemoveClick = (List, setList, i) => {
    const list = [...List];
    list.splice(i, 1);
    setList(list);
  };

  const handleAddClick = (List, setList) => {
    setList([...List, {}]);
  };

  const handleUpload = () => {
    const inputImg = document.getElementById("imgFile");
    inputImg.click();
  };

  const tmpSave = () => {};

  return (
    <div className="info-input">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={() => history.push("/git-repo-detail")}
        onNext={() => history.push("/git-console")}
        onSave={tmpSave}
      />

      <RoundContainer blueHeader={true}>
        {/* mainInfo: 기본 인적사항, 사진 */}
        <div className="main-info">
          {/* generalInfo: 기본 인적사항 */}
          <div>
            <h1 className="beautiful-title">기본 인적사항</h1>
            <br />
            {infoList.map((x, i) => {
              return (
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="이름 *"
                    value={x?.name}
                    onChange={(e) =>
                      handleInputChange(infoList, setInfoList, i, e)
                    }
                    required
                  />
                  <input
                    type="email"
                    name="mail"
                    placeholder="메일 *"
                    value={x?.mail}
                    onChange={(e) =>
                      handleInputChange(infoList, setInfoList, i, e)
                    }
                    required
                  />
                  <br />
                  <input
                    type="text"
                    name="birth"
                    placeholder="생년월일 (ex.19951004) *"
                    value={x?.birth}
                    onChange={(e) =>
                      handleInputChange(infoList, setInfoList, i, e)
                    }
                    required
                  />
                  <input
                    type="text"
                    name="tel"
                    placeholder="전화번호 *"
                    maxLength="11"
                    value={x?.tel}
                    onChange={(e) =>
                      handleInputChange(infoList, setInfoList, i, e)
                    }
                    required
                  />
                </form>
              );
            })}
          </div>

          {/* 사진 */}
          <div>
            <h1 className="beautiful-title">사진</h1>
            <br />

            <div className="img-container">
              <div className="img-preview">
                <img src={imgBase64 || ""} alt={""} />
              </div>

              <div className="img-btns">
                <button className="round-button" onClick={handleUpload}>
                  수정
                </button>
                <button className="round-button">기본 이미지로</button>
                <input type="file" name="imgFile" onChange={handleChangeFile} />
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
              <h3>경력사항</h3>
              <button
                onClick={(e) => {
                  handleAddClick(careerList, setCareerList, e);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {careerList.map((x, i) => (
                <li key={`career-list-${i}`}>
                  <input
                    className="btn"
                    type="button"
                    value="-"
                    onClick={(e) => {
                      handleRemoveClick(careerList, setCareerList, i);
                    }}
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="회사명"
                    value={x?.company}
                    size="15"
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                  <input
                    type="text"
                    name="depart"
                    placeholder="부서명"
                    value={x?.depart}
                    size="10"
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                  <input
                    type="date"
                    name="start"
                    value={x?.start}
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                  ~
                  <input
                    type="date"
                    name="end"
                    value={x?.end}
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                  <input
                    type="text"
                    name="position"
                    value={x?.position}
                    size="10"
                    placeholder="직위"
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                  <input
                    type="text"
                    name="job"
                    value={x?.job}
                    size="10"
                    placeholder="직무"
                    onChange={(e) =>
                      handleInputChange(careerList, setCareerList, i, e)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div>
            <div className="title">
              <h3>학력사항</h3>
              <button
                onClick={(e) => handleAddClick(schoolList, setSchoolList, e)}
              >
                +
              </button>
            </div>

            <ul>
              {schoolList.map((x, i) => (
                <li key={`school-list-${i}`}>
                  <input
                    className="btn"
                    type="button"
                    value="-"
                    onClick={(e) => {
                      handleRemoveClick(schoolList, setSchoolList, i);
                    }}
                  />
                  <select
                    name="schoolType"
                    value={x?.schoolType}
                    onChange={(e) =>
                      handleInputChange(schoolList, setSchoolList, i, e)
                    }
                  >
                    <option value="high">고등학교</option>
                    <option value="univ">대학교</option>
                    <option value="grad">대학원</option>
                    <option value="etc">기타</option>
                  </select>
                  <input
                    type="date"
                    name="start"
                    value={x?.start}
                    onChange={(e) =>
                      handleInputChange(schoolList, setSchoolList, i, e)
                    }
                  />
                  ~
                  <input
                    type="date"
                    name="end"
                    value={x?.end}
                    onChange={(e) => handleInputChange(schoolList, i, e)}
                  />
                  <select
                    name="schoolStat"
                    value={x?.schoolStat}
                    onChange={(e) =>
                      handleInputChange(schoolList, setSchoolList, i, e)
                    }
                  >
                    <option value="attend">재학</option>
                    <option value="graduate">졸업</option>
                  </select>
                </li>
              ))}
            </ul>
          </div>
          <br />
          <div>
            <div className="title">
              <h3>자격/어학사항</h3>
              <button onClick={(e) => handleAddClick(certList, setCertList, e)}>
                +
              </button>
            </div>

            <ul>
              {certList.map((x, i) => (
                <li key={`cer-list-${i}`}>
                  <input
                    className="btn"
                    type="button"
                    value="-"
                    onClick={(e) => {
                      handleRemoveClick(certList, setCertList, i);
                    }}
                  />
                  <input
                    type="text"
                    name="cert"
                    placeholder="자격/어학 종류"
                    value={x?.cert}
                    onChange={(e) =>
                      handleInputChange(certList, setCertList, i, e)
                    }
                  />
                  <input
                    type="text"
                    name="level"
                    placeholder="등급/레벨/점수"
                    value={x?.level}
                    onChange={(e) =>
                      handleInputChange(certList, setCertList, i, e)
                    }
                  />
                  <input
                    type="text"
                    name="auth"
                    placeholder="발급기관"
                    value={x?.auth}
                    onChange={(e) =>
                      handleInputChange(certList, setCertList, i, e)
                    }
                  />
                  <input
                    type="date"
                    name="issueDate"
                    value={x?.issueDate}
                    onChange={(e) =>
                      handleInputChange(certList, setCertList, i, e)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
          <br />

          <div>
            <div className="title">
              <h3>수상</h3>
              <button
                onClick={(e) => {
                  handleAddClick(awardList, setAwardList, e);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {awardList.map((x, i) => (
                <li key={`award-list-${i}`}>
                  <div id="awardList">
                    <input
                      className="btn"
                      type="button"
                      value="-"
                      onClick={(e) => {
                        handleRemoveClick(awardList, setAwardList, i);
                      }}
                    />
                    <input
                      type="text"
                      name="award"
                      placeholder="대회명"
                      value={x?.award}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="place"
                      placeholder="수상 내용"
                      value={x?.place}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="auth"
                      placeholder="기관"
                      value={x?.auth}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
                      }
                    />
                    <input
                      type="date"
                      name="issueDate"
                      value={x?.issueDate}
                      onChange={(e) =>
                        handleInputChange(awardList, setAwardList, i, e)
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
              <h3>기타</h3>
              <button onClick={(e) => handleAddClick(etcList, setEtcList, e)}>
                +
              </button>
            </div>

            <ul>
              {etcList.map((x, i) => (
                <li key={`etc-list-${i}`}>
                  <div>
                    <input
                      className="btn"
                      type="button"
                      value="-"
                      onClick={(e) => {
                        handleRemoveClick(etcList, setEtcList, i);
                      }}
                    />
                    <input
                      type="text"
                      name="etc"
                      placeholder="활동명"
                      value={x?.etc}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="about"
                      placeholder="설명"
                      value={x?.about}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                    />
                    <input
                      type="date"
                      name="start"
                      value={x?.start}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
                      }
                    />
                    <input
                      type="date"
                      name="end"
                      value={x?.end}
                      onChange={(e) =>
                        handleInputChange(etcList, setEtcList, i, e)
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
              <h3>자기소개</h3>
            </div>
            {introList.map((x, i) => {
              return (
                <div id="introList">
                  <textarea
                    id="introShort"
                    placeholder="한줄소개"
                    value={x?.introShort}
                    onChange={(e) => {
                      handleInputChange(introList, setIntroList, i, e);
                    }}
                  />
                  <textarea
                    id="introLong"
                    placeholder="자기소개"
                    value={x?.introLong}
                    onChange={(e) => {
                      handleInputChange(introList, setIntroList, i, e);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <br />
          <div>
            <div className="title">
              <h3>SNS</h3>
              <button
                onClick={(e) => {
                  handleAddClick(snsList, setSnsList, e);
                }}
              >
                +
              </button>
            </div>
            <ul>
              {snsList.map((x, i) => (
                <li key={`sns-list-${i}`}>
                  <div id="snsList">
                    <input
                      className="btn"
                      type="button"
                      value="-"
                      onClick={(e) => handleRemoveClick(snsList, setSnsList, i)}
                    />
                    <input
                      type="text"
                      name="sns"
                      placeholder="종류"
                      value={x?.sns}
                      onChange={(e) =>
                        handleInputChange(snsList, setSnsList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="link"
                      placeholder="계정주소"
                      value={x?.link}
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
                onClick={(e) => {
                  handleAddClick(stackList, setStackList, e);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {stackList.map((x, i) => (
                <li key={`stack-list-${i}`}>
                  <div id="stackList">
                    <input
                      className="btn"
                      type="button"
                      value="-"
                      onClick={(e) => {
                        handleRemoveClick(stackList, setStackList, i);
                      }}
                    />
                    <input
                      type="text"
                      name="stack"
                      placeholder="기술 종류"
                      value={x?.stack}
                      onChange={(e) =>
                        handleInputChange(stackList, setStackList, i, e)
                      }
                      list="stackoption"
                    />
                    <datalist id="stackoption">
                      <option value="asdf" />
                    </datalist>
                    <select
                      name="level"
                      value={x?.level}
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
                onClick={(e) => {
                  handleAddClick(patentList, setPatentList, e);
                }}
              >
                +
              </button>
            </div>

            <ul>
              {patentList.map((x, i) => (
                <li key={`patent-list-${i}`}>
                  <div id="patentList">
                    <input
                      className="btn"
                      type="button"
                      value="-"
                      onClick={(e) =>
                        handleRemoveClick(patentList, setPatentList, i)
                      }
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={x?.name}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="number"
                      placeholder="고유번호/출원번호"
                      value={x?.number}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="company"
                      placeholder="출판사/출원국가"
                      value={x?.company}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="text"
                      name="author"
                      placeholder="저자/출판인"
                      value={x?.author}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <input
                      type="month"
                      name="date"
                      placeholder="발행/출원 연월"
                      value={x?.date}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <textarea
                      id="link"
                      name="link"
                      placeholder="링크"
                      value={x?.link}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                    <textarea
                      id="des"
                      name="des"
                      placeholder="설명"
                      value={x?.des}
                      onChange={(e) =>
                        handleInputChange(patentList, setPatentList, i, e)
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RoundContainer>

      {/* 포트폴리오 선택 여부 묻기 */}
      {showModal && (
        <Modal backBlack={true}>
          <YNModal
            title={"기존에 입력한 정보를 가져오시겠습니까?"}
            onYes={() => {
              setShowModal(false);
              setShowModal2(true);
            }}
            onNo={() => setShowModal(false)}
          />
        </Modal>
      )}

      {/* 포트폴리오 선택 모달 */}
      {showModal2 && (
        <Modal backBlack={true}>
          <PortfolioChoiceModal onNo={() => setShowModal2(false)} />
        </Modal>
      )}
    </div>
  );
}

export default InfoInput;
