import "./style.css";
import React, { useState } from "react";

function InfoInput() {
  const [imgBase64, setImgBase64] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const handleChangeFile = (event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
      }
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
      setImgFile(event.target.files[0]);
    }
  }

  const [infoList] = useState([{ name: "", mail: "", birth: "", tel: "" }])
  const [careerList, setCareerList] = useState([{ company: "", depart: "", start: "", end: "", position: "", job: "" }])
  const [schoolList, setSchoolList] = useState([{ schoolType: "", start: "", end: "", schoolStat: "" }])
  const [certList, setCertList] = useState([{ cert: "", level: "", auth: "", issueDate: "" }])
  const [awardList, setAwardList] = useState([{ award: "", place: "", auth: "", issueDate: "" }])
  const [etcList, setEtcList] = useState([{ etc: "", about: "", start: "", end: "" }])
  const [introList] = useState([{ introShort: "", introLong: "" }])
  const [snsList, setSnsList] = useState([{ sns: "", link: "" }])
  const [stackList, setStackList] = useState([{ stack: "", level: "" }])


  const handleInputChange = (List, i, e) => {
    const { name, value } = e.target;
    const list = [...List];
    list[i][name] = value;
    setCareerList(list)
  };

  const handleRemoveClick = (List, i) => {
    const list = [...List];
    list.splice(i, 1);
    setCareerList(list);
  }

  const handleAddClick = (List) => {
    setCareerList([...List, List])
  }

  return (
    < div className="container" >
      {/* mainInfo: 기본 인적사항, 사진 */}
      < div className="mainInfo" >
        {/* generalInfo: 기본 인적사항 */}
        < div className="generalInfo" >
          <h2>기본 인적사항</h2><br />
          {infoList.map((x, i) => {
            return (
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="이름 *"
                  value={x.name}
                  onChange={e => handleInputChange(infoList, i, e)}
                  required
                />
                <input
                  type="email"
                  name="mail"
                  placeholder="메일 *"
                  value={x.mail}
                  onChange={e => handleInputChange(infoList, i, e)}
                  required
                /><br />
                <input
                  type="text"
                  name="birth"
                  placeholder="생년월일 (ex.19951004) *"
                  value={x.birth}
                  onChange={e => handleInputChange(infoList, i, e)}
                  required
                />
                <input
                  type="text"
                  name="tel"
                  placeholder="전화번호 *"
                  maxLength="11"
                  value={x.tel}
                  onChange={e => handleInputChange(infoList, i, e)}
                  required
                />
              </form>
            )
          })}
        </div >
        <div className="img">
          <div className="imgBlock">
            <img id="thumbnail" src={imgBase64.toString()} onError="this.style.display='none'" alt='' />
          </div>
          <div>
            <input type="file" name="imgFile" id="imgFile" onChange={handleChangeFile} />
          </div>
        </div>
      </div>
      <div className="etc">
        <h2>그 외의 정보</h2>
        <br />
        <div id="infoList">
          경력사항
          <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(careerList, e) }} />
          {careerList.map((x, i) => {
            return (
              <div id="careerList">
                <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(careerList, i, e) }} />
                <input
                  type="text"
                  name="company"
                  placeholder="회사명"
                  value={x.company}
                  size="15"
                  onChange={e => handleInputChange(careerList, i, e)}
                />
                <input
                  type="text"
                  name="depart"
                  placeholder="부서명"
                  value={x.depart}
                  size="10"
                  onChange={e => handleInputChange(careerList, i, e)}
                />
                <input
                  type="date"
                  name="start"
                  value={x.start}
                  onChange={e => handleInputChange(careerList, i, e)}
                />~
                <input
                  type="date"
                  name="end"
                  value={x.end}
                  onChange={e => handleInputChange(careerList, i, e)}
                />
                <input
                  type="text"
                  name="position"
                  value={x.position}
                  size="10"
                  placeholder="직위"
                  onChange={e => handleInputChange(careerList, i, e)}
                />
                <input
                  type="text"
                  name="job"
                  value={x.job}
                  size="10"
                  placeholder="직무"
                  onChange={e => handleInputChange(careerList, i, e)}
                />
              </div>
            )
          })}
        </div>
        <br />
          학력사항
          <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(schoolList, e) }} />
        {schoolList.map((x, i) => {
          return (
            <div id="schoolList">
              <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(schoolList, i, e) }} />
              <select name="schoolType" onChange={e => handleInputChange(schoolList, i, e)} >
                <option value="high">고등학교</option>
                <option value="univ">대학교</option>
                <option value="grad">대학원</option>
                <option value="etc">기타</option>
              </select>
              <input
                type="date"
                name="start"
                value={x.start}
                onChange={e => handleInputChange(schoolList, i, e)}
              />~
              <input
                type="date"
                name="end"
                value={x.end}
                onChange={e => handleInputChange(schoolList, i, e)}
              />
              <select name="schoolStat" onChange={e => handleInputChange(schoolList, i, e)}>
                <option value="attend">재학</option>
                <option value="graduate">졸업</option>
              </select>
            </div>
          )
        })}
        <br />
          자격/어학사항
          <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(certList, e) }} />
        {certList.map((x, i) => {
          return (
            <div id="certList">
              <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(certList, i, e) }} />
              <input
                type="text"
                name="cert"
                placeholder="자격/어학 종류"
                value={x.cert}
                onChange={e => handleInputChange(certList, i, e)}
              />
              <input
                type="text"
                name="level"
                placeholder="등급/레벨/점수"
                value={x.level}
                onChange={e => handleInputChange(certList, i, e)}
              />
              <input
                type="text"
                name="auth"
                placeholder="발급기관"
                value={x.auth}
                onChange={e => handleInputChange(certList, i, e)}
              />
              <input
                type="date"
                name="issueDate"
                value={x.issueDate}
                onChange={e => handleInputChange(certList, i, e)}
              />
            </div>
          )
        })}
        <br />
          수상경력
            <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(awardList, e) }} />
        {awardList.map((x, i) => {
          return (
            <div id="awardList">
              <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(awardList, i, e) }} />
              <input
                type="text"
                name="award"
                placeholder="대회명"
                value={x.award}
                onChange={e => handleInputChange(awardList, i, e)}
              />
              <input
                type="text"
                name="place"
                placeholder="수상 내용"
                value={x.place}
                onChange={e => handleInputChange(awardList, i, e)}
              />
              <input
                type="text"
                name="auth"
                placeholder="기관"
                value={x.auth}
                onChange={e => handleInputChange(awardList, i, e)}
              />
              <input
                type="date"
                name="issueDate"
                value={x.issueDate}
                onChange={e => handleInputChange(awardList, i, e)}
              />
            </div>
          )
        })}
        <br />
          기타
          <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(etcList, e) }} />
        {etcList.map((x, i) => {
          return (
            <div id="etcList">
              <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(etcList, i, e) }} />
              <input
                type="text"
                name="etc"
                placeholder="활동명"
                value={x.etc}
                onChange={e => handleInputChange(etcList, i, e)}
              />
              <input
                type="text"
                name="about"
                placeholder="설명"
                value={x.about}
                onChange={e => handleInputChange(etcList, i, e)}
              />
              <input
                type="date"
                name="start"
                value={x.start}
                onChange={e => handleInputChange(etcList, i, e)}
              />
              <input
                type="date"
                name="end"
                value={x.end}
                onChange={e => handleInputChange(etcList, i, e)}
              />
            </div>
          )
        })}
        <br />
        <div id="intro">
          자기소개
          {introList.map((x, i) => {
          return (
            < div id="introList" >
              <textarea
                id="introShort"
                placeholder="한줄소개"
                value={x.introShort}
                onChange={e => { handleInputChange(introList, i, e) }}
              />
              <textarea
                id="introLong"
                placeholder="자기소개"
                value={x.introLong}
                onChange={e => { handleInputChange(introList, i, e) }}
              />
            </div>
          )
        })}
        </div>
        <br />
          SNS
      <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(snsList, e) }} />
        {snsList.map((x, i) => {
          return (
            <div id="snsList">
              <input className="button" type="button" value="-" onClick={(e) => handleRemoveClick(snsList, i, e)} />
              <input
                type="text"
                name="sns"
                placeholder="종류"
                value={x.sns}
                onChange={e => handleInputChange(snsList, i, e)}
              />
              <input
                type="text"
                name="link"
                placeholder="계정주소"
                value={x.link}
                onChange={e => handleInputChange(snsList, i, e)}
              />
            </div>
          )
        })}
        <br />
            기술스택
      <input className="button" type="button" value="+" onClick={(e) => { handleAddClick(stackList, e) }} />
        {stackList.map((x, i) => {
          return (
            <div id="stackList">
              <input className="button" type="button" value="-" onClick={(e) => { handleRemoveClick(stackList, i, e) }} />
              <input
                type="text"
                name="stack"
                placeholder="기술 종류"
                value={x.stack}
                onChange={e => handleInputChange(stackList, i, e)}
              />
              <select name="level" onChange={e => handleInputChange(stackList, i, e)}>
                <option value="">레벨</option>
                <option value="1">상</option>
                <option value="2">중</option>
                <option value="3">하</option>
              </select>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default InfoInput;
