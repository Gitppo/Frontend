import React, { useState } from "react";
import "./style.css";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import Star from "../../assets/star.png";
// import Pen from "../../assets/pen.png";
// import Eye from "../../assets/eye.png";
// import Fold from "../../assets/fold.png";

const data = {
  repoTitle: "hyu-likelion/NESI",
  starNum: "50",
  creation: "2018.12.12",
  revision: "2021.12.12",
  language: "JavaScript",
  languagePercent: "56.8%"
}

function GitRepoDetail() {
  const [inputs, setInputs] = useState({
    start: '',
    end: '',
    role: '',
    skill: '',
    domain: '',
    explain: ''
  });

  const { start, end, role, skill, domain, explain } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  return (
    <div className="gitrepodetail">
      <BeforeAfterBtn />

      <div className="gitrepodetail-wrapper">
        <div className="gitrepodetail-top-container">
          <div className="gitrepodetail-top-container-title">레포지토리</div>
          <div className="gitrepodetail-top-container-groupname">그룹명</div>
          <div className="round-button">병합</div>
          <div className="round-button">삭제</div>
        </div>
        <div className="gitrepodetail-inner-box">
          <div className="gitrepodetail-inner-box-info-container">
            <div className="gitrepodetail-inner-box-top-container">
              <div className="gitrepodetail-inner-box-repo-title">
                {data.repoTitle}
              </div>
              <img
                className="gitrepodetail-inner-box-image"
                src={Star}
                alt={""}
              />
              <div className="gitrepodetail-inner-box-star-num">{data.starNum}</div>
              <div className="round-button">삭제</div>
            </div>
            <div className="gitrepodetail-inner-box-bottom-container">
              <div className="gitrepodetail-inner-box-bottom-title">생성일</div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {data.creation}
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">최근 업데이트</div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {data.revision}
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">사용언어</div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {data.language} {data.languagePercent}
              </div>
            </div>
          </div>
          <div className="gitrepodetail-inner-box-title-container">
            <div className="gitrepodetail-inner-box-title-container-text">
              바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
            </div>
            {/* <img className="gitrepodetail-inner-box-image" src={Pen} alt={""} /> */}
          </div>
          <div className="gitrepodetail-inner-box-readme-container">
            <div className="gitrepodetail-inner-box-title-container-text">
              README.md
            </div>
            {/* <img className="gitrepodetail-inner-box-image" src={Eye} alt={""} />
            <img className="gitrepodetail-inner-box-image" src={Pen} alt={""} /> */}
          </div>
          <div className="gitrepodetail-inner-box-plus-info-title">
            상세 설명
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            <div className="container-title">기간</div>
            <input
              onChange={onChange}
              value={start}
              name="start"
              className="gitrepodetail-inner-box-plus-info-title-date"
              placeholder="시작일"
            />
            <div className="wave-mark">~</div>
            <input
              onChange={onChange}
              value={end}
              name="end"
              className="gitrepodetail-inner-box-plus-info-title-date"
              placeholder="마감일"
            />
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            <div className="container-title">역할</div>
            <input
              onChange={onChange}
              value={role}
              name="role"
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="프론트엔드개발 / 디자인"
            />
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            <div className="container-title">기술스택</div>
            <input
              onChange={onChange}
              value={skill}
              name="skill"
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="기술스택칸은 안 넓어도 괜찮지 않을까아ㅏㅏ"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-info">
            <div className="container-title">도메인</div>
            <input
              onChange={onChange}
              value={domain}
              name="domain"
              className="gitrepodetail-inner-box-plus-info-title-info-box"
              placeholder="000.000.000"
            ></input>
          </div>
          <div className="gitrepodetail-inner-box-title-container-end-info">
            <div className="container-title">설명</div>
            <input
              onChange={onChange}
              value={explain}
              name="explain"
              className="gitrepodetail-inner-box-plus-info-title-plus-info-box"
              placeholder="✧٩(ˊωˋ*)و✧"
            ></input>
          </div>
          <div className="save-button-container">
            <div className="round-button">저장</div>
            {/* <img
              className="gitrepodetail-inner-box-fold-image"
              src={Fold}
              alt={""}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GitRepoDetail;