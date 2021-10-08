import "./style.css";
import React, { useEffect, useState } from "react";

function UploadImg() {
  document.getElementById("profileImg").src = "b.png"
}

function InfoInput() {
  return (
    < div className="container" >
      {/* mainInfo: 기본 인적사항, 사진 */}
      < div className="mainInfo" >
        {/* generalInfo: 기본 인적사항 */}
        < div className="generalInfo" >
          <h2>기본 인적사항</h2><br></br>
          <form>
            <input type="text" name="name" placeholder="이름 *" required></input>
            <input type="text" name="mail" placeholder="메일 *" required></input><br></br>
            <input type="text" name="birth" placeholder="생년월일 (ex.19951004) *" required></input>
            <input type="tel" name="phone" placeholder="전화번호 (-포함) *" pattern="(010)-\d{3,4}-\d{4}" required></input>
          </form>
        </div >
        {/* img: 사진 */}
        < div className="img" >
          <h2>사진</h2>
          <input type="file" id="img" accept="image/jpeg, image/png, image/jpg" onClick={UploadImg}></input>
          <img id="profileImg" src="a.png"></img>
        </div >
      </div>
      <div className="etc">
        <h2>그 외의 정보</h2>
      </div>
    </div >
  )
}

export default InfoInput;
