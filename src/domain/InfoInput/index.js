import "./style.css";
import React from "react";

function UploadImg() {
  document.getElementById("profileImg").src = "b.png";
}

function addItem() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("careerList").innerHTML;
  document.getElementById("careerField").appendChild(div);
}
function addItem2() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("schoolList").innerHTML;
  document.getElementById("schoolField").appendChild(div);
}
function addItem3() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("certList").innerHTML;
  document.getElementById("certField").appendChild(div);
}
function addItem4() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("awardList").innerHTML;
  document.getElementById("awardField").appendChild(div);
}
function addItem5() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("etcList").innerHTML;
  document.getElementById("etcField").appendChild(div);
}
function addItem6() {
  var div = document.createElement("div");
  div.innerHTML = document.getElementById("snsList").innerHTML;
  document.getElementById("snsField").appendChild(div);
}
function removeItem(obj) {
  document.getElementById("careerField").removeChild(obj.parentNode);
}

function InfoInput() {
  return (
    <div className="infoInput">
      {/* mainInfo: 기본 인적사항, 사진 */}
      <div className="mainInfo">
        {/* generalInfo: 기본 인적사항 */}
        <div className="generalInfo">
          <h2>기본 인적사항</h2>
          <br />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <button type={"submit"}>제출</button>
            <input
              type="text"
              name="name"
              placeholder="이름 *"
              required
            ></input>
            <input
              type="email"
              name="mail"
              placeholder="메일 *"
              required
            ></input>
            <br />
            <input
              type="text"
              name="birth"
              placeholder="생년월일 (ex.19951004) *"
              required
            ></input>
            <input
              type="tel"
              name="phone"
              placeholder="전화번호 (-포함) *"
              pattern="(010)-\d{3,4}-\d{4}"
              required
            ></input>
          </form>
        </div>
        {/* img: 사진 */}
        <div className="img">
          <h2>사진</h2>
          <input
            type="file"
            id="img"
            accept="image/jpeg, image/png, image/jpg"
            onClick={UploadImg}
          ></input>
          <img id="profileImg" src="a.png" alt={""}></img>
        </div>
      </div>
      <div className="etc">
        <h2>그 외의 정보</h2>
        <div id="infoList">
          경력사항
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem}
          ></input>
          <div id="careerList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <input
              type="text"
              name="company"
              placeholder="회사명"
              size="15"
            ></input>
            <input
              type="text"
              name="depart"
              placeholder="부서명"
              size="10"
            ></input>
            <input type="month" name="start" required></input>~
            <input type="month" name="end"></input>
            <input
              type="text"
              name="position"
              placeholder="직위"
              size="10"
            ></input>
            <input type="text" name="job" placeholder="직무" size="10"></input>
          </div>
          <div id="careerField"></div>
          <br />
          학력사항
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem2}
          ></input>
          <div id="schoolList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <select name="schoolType">
              <option value="high">고등학교</option>
              <option value="univ">대학교</option>
              <option value="grad">대학원</option>
              <option value="etc">기타</option>
            </select>
            <input type="month" name="start"></input>~
            <input type="month" name="end"></input>
            <select name="schoolStat">
              <option value="attend">재학</option>
              <option value="graduate">졸업</option>
            </select>
          </div>
          <div id="schoolField"></div>
          <br />
          자격/어학사항
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem3}
          ></input>
          <div id="certList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <input type="text" name="cert" placeholder="자격/어학 종류"></input>
            <input
              type="text"
              name="level"
              placeholder="등급/레벨/점수"
            ></input>
            <input type="text" name="auth" placeholder="발급기관"></input>
            <input type="date" name="issueDate"></input>
          </div>
          <div id="certField"></div>
          <br />
          수상경력
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem4}
          ></input>
          <div id="awardList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <input type="text" name="award" placeholder="대회명"></input>
            <input type="text" name="place" placeholder="수상 내용"></input>
            <input type="text" name="auth" placeholder="기관"></input>
            <input type="date" name="issueDate"></input>
          </div>
          <div id="awardField"></div>
          <br />
          기타
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem5}
          ></input>
          <div id="etcList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <input type="text" name="etc" placeholder="활동명"></input>
            <input type="text" name="about" placeholder="설명"></input>
            <input type="date" name="start"></input>~
            <input type="date" name="end"></input>
          </div>
          <div id="etcField"></div>
          <br />
          <div id="intro">
            자기소개
            <div id="introList">
              <input type="text" name="intro" placeholder="한줄 소개"></input>
              <textarea
                name="introLong"
                cols="30"
                rows="10"
                placeholder="자기소개"
              ></textarea>
            </div>
          </div>
          <br />
          SNS
          <input
            className="button"
            type="button"
            value="+"
            onClick={addItem6}
          ></input>
          <div id="snsList">
            <input
              className="button"
              type="button"
              value="-"
              onClick={removeItem}
            ></input>
            <input type="text" name="sns" placeholder="종류"></input>
            <input type="text" name="link" placeholder="계정주소"></input>
          </div>
          <div id="snsField"></div>
        </div>
      </div>
    </div>
  );
}

export default InfoInput;
