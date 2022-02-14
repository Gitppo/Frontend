import "./style.css";


import React, {useEffect, useState} from "react";
import Modal from "../../components/Modal/modal";
import {useHistory} from "react-router-dom";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";

function InfoInput() {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    openModal();
  }, []);

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
    { name: "", mail: "", birth: "", tel: "" },
  ]);
  const [careerList, setCareerList] = useState([
    { company: "", depart: "", start: "", end: "", position: "", job: "" },
  ]);
  const [schoolList, setSchoolList] = useState([
    { schoolType: "", start: "", end: "", schoolStat: "" },
  ]);
  const [certList, setCertList] = useState([
    { cert: "", level: "", auth: "", issueDate: "" },
  ]);
  const [awardList, setAwardList] = useState([
    { award: "", place: "", auth: "", issueDate: "" },
  ]);
  const [etcList, setEtcList] = useState([
    { etc: "", about: "", start: "", end: "" },
  ]);
  const [introList, setIntroList] = useState([{ introShort: "", introLong: "" }]);
  const [snsList, setSnsList] = useState([{ sns: "", link: "" }]);
  const [stackList, setStackList] = useState([{ stack: "", level: "" }]);
  const [patentList, setPatentList] = useState([{ name: "", number: "", company: "", author: "", date: "", link: "", des: "" }]);

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
  }

  const prevPage = () => {
    history.push("/git-repo-detail");
  };
  const nextPage = () => {
    history.push("/git-console");
  };
  const tmpSave = () => { };

  return (
    <div className="document">
      <Modal open={modalOpen} close={closeModal}>
        <h3 style={{textAlign: "center", color: "var(--dark-blue1)"}}>
          기존에 입력한 정보를 가져오시겠습니까?
        </h3>
      </Modal>

      <div className="container">
        <BeforeAfterBtn
          saveShow={true}
          onPrev={prevPage}
          onNext={nextPage}
          onSave={tmpSave}
        />
            
        {/* mainInfo: 기본 인적사항, 사진 */}
        <div className="mainInfo">
          {/* generalInfo: 기본 인적사항 */}
          <div className="generalInfo">
            <h2>기본 인적사항</h2>
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
          <div className="img">
            <div className="imgBlock">
              <img id="thumbnail" src={imgBase64 || ""} alt={""} />
            </div>
            <div className="imgBtns">
              <button id="imgUpload" onClick={handleUpload}>
                수정
              </button>
              <button id="imgDefault">
                기본 이미지
              </button>
              <input
                type="file"
                id="imgFile"
                name="imgFile"
                onChange={handleChangeFile}
              />
            </div>
          </div>
        </div>
        <div className="etc">
          <h2>그 외의 정보</h2>
          <br />
          <div id="infoList">
            경력사항
            <input
              className="btn"
              type="button"
              value="+"
              onClick={(e) => {
                handleAddClick(careerList, setCareerList, e);
              }}
            />
            {careerList.map((x, i) => (
              <div id="careerList">
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
              </div>
            ))}
          </div>
          <br />
          학력사항
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(schoolList, setSchoolList, e);
            }}
          />
          {schoolList.map((x, i) => {
            return (
              <div id="schoolList">
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
              </div>
            );
          })}
          <br />
          자격/어학사항
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(certList, setCertList, e);
            }}
          />
          {certList.map((x, i) => {
            return (
              <div id="certList">
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
              </div>
            );
          })}
          <br />
          수상경력
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(awardList, setAwardList, e);
            }}
          />
          {awardList.map((x, i) => {
            return (
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
            );
          })}
          <br />
          기타
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(etcList, setEtcList, e);
            }}
          />
          {etcList.map((x, i) => {
            return (
              <div id="etcList">
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
                  onChange={(e) => handleInputChange(etcList, setEtcList, i, e)}
                />
                <input
                  type="text"
                  name="about"
                  placeholder="설명"
                  value={x?.about}
                  onChange={(e) => handleInputChange(etcList, setEtcList, i, e)}
                />
                <input
                  type="date"
                  name="start"
                  value={x?.start}
                  onChange={(e) => handleInputChange(etcList, setEtcList, i, e)}
                />
                <input
                  type="date"
                  name="end"
                  value={x?.end}
                  onChange={(e) => handleInputChange(etcList, setEtcList, i, e)}
                />
              </div>
            );
          })}
          <br />
          <div id="intro">
            자기소개
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
          SNS
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(snsList, setSnsList, e);
            }}
          />
          {snsList.map((x, i) => {
            return (
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
                  onChange={(e) => handleInputChange(snsList, setSnsList, i, e)}
                />
                <input
                  type="text"
                  name="link"
                  placeholder="계정주소"
                  value={x?.link}
                  onChange={(e) => handleInputChange(snsList, setSnsList, i, e)}
                />
              </div>
            );
          })}
          <br />
          기술스택
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(stackList, setStackList, e);
            }}
          />
          {stackList.map((x, i) => {
            return (
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
            );
          })}

          <br />
          출판 / 논문 / 특허
          <input
            className="btn"
            type="button"
            value="+"
            onClick={(e) => {
              handleAddClick(patentList, setPatentList, e);
            }}
          />
          {patentList.map((x, i) => {
            return (
              <div id="patentList">
                <input
                  className="btn"
                  type="button"
                  value="-"
                  onClick={(e) => handleRemoveClick(patentList, setPatentList, i)}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="이름"
                  value={x?.name}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <input
                  type="text"
                  name="number"
                  placeholder="고유번호/출원번호"
                  value={x?.number}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <input
                  type="text"
                  name="company"
                  placeholder="출판사/출원국가"
                  value={x?.company}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <input
                  type="text"
                  name="author"
                  placeholder="저자/출판인"
                  value={x?.author}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <input
                  type="month"
                  name="date"
                  placeholder="발행/출원 연월"
                  value={x?.date}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <textarea
                  id="link"
                  name="link"
                  placeholder="링크"
                  value={x?.link}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
                <textarea
                  id="des"
                  name="des"
                  placeholder="설명"
                  value={x?.des}
                  onChange={(e) => handleInputChange(patentList, setPatentList, i, e)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
}

export default InfoInput;
