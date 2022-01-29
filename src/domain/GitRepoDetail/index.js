import "./style.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";

import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import Star from "../../assets/star.png";
import Pen from "../../assets/pen.png";
import Eye from "../../assets/eye.png";
import Fold from "../../assets/arrow-no-head.png";

function GitRepoDetail() {
  const history = useHistory();

  const [repos, setRepos] = useState([
    {
      id: 1,
      title: "2021 조깃포 LG 포트폴리오",
      state: 0,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
      language: [
        ["JavaScript", "56.8%"],
        ["Java", "43.2%"],
      ],
      path: "hyu-likelion/NESI",
      starNum: "50",
      start: "",
      end: "",
      role: "",
      skill: "",
      domain: "",
      explain: "",
    },
    {
      id: 2,
      title: "2021 조깃포 삼성 포트폴리오",
      state: 0,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
    {
      id: 3,
      title: "2021 조깃포 현대 포트폴리오",
      state: 1,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
  ]);

  const {start, end, role, skill, domain, explain} = {};

  const onChange = (e) => {
    // const {value, name} = e.target;
    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });
    // console.log(e.target.value);
  };

  function openCloseToc() {
    if (document.getElementById("toc-content").style.display === "block") {
      document.getElementById("toc-content").style.display = "none";
    } else {
      document.getElementById("toc-toggle").style.src = "../../image/open.png";
      document.getElementById("toc-content").style.display = "block";
    }
  }

  const prevPage = () => {
    history.push("/git-repo");
  };
  const nextPage = () => {
    history.push("/git-info");
  };
  const tmpSave = () => {};

  return (
    <div className="gitrepodetail">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={prevPage}
        onNext={nextPage}
        onSave={tmpSave}
      />

      <div className="gitrepodetail-wrapper">
        <div className="gitrepodetail-top-container">
          <div className="gitrepodetail-top-container-title">레포지토리</div>
          <div className="gitrepodetail-top-container-groupname">그룹명</div>

          <button className="round-button">병합</button>
          <button className="round-button">삭제</button>
        </div>

        <div className="gitrepodetail-inner-box">
          <div className="gitrepodetail-inner-box-info-container">
            <div className="gitrepodetail-inner-box-top-container">
              <h3 className="gitrepodetail-inner-box-repo-title">
                {/* {data.repoTitle} */}
              </h3>
              <img
                className="gitrepodetail-inner-box-image"
                src={Star}
                alt={""}
              />
              <div className="gitrepodetail-inner-box-star-num">
                {/* {data.starNum} */}
              </div>
              <div className="round-button">삭제</div>
            </div>
            <div className="gitrepodetail-inner-box-bottom-container">
              <div className="gitrepodetail-inner-box-bottom-title">생성일</div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {/* {data.creation} */}
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">
                최근 업데이트
              </div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {/* {data.revision} */}
              </div>
              <div className="gitrepodetail-inner-box-bottom-title">
                사용언어
              </div>
              <div className="gitrepodetail-inner-box-bottom-detail">
                {/* {data.language} {data.languagePercent} */}
              </div>
            </div>
          </div>

          <div id="toc-content">
            <div className="gitrepodetail-inner-box-title-container">
              <div className="gitrepodetail-inner-box-title-container-text">
                바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기
              </div>
              <img
                className="gitrepodetail-inner-box-image"
                src={Pen}
                alt={""}
              />
            </div>
            <div className="gitrepodetail-inner-box-readme-container">
              <div className="gitrepodetail-inner-box-title-container-text">
                README.md
              </div>
              <img
                className="gitrepodetail-inner-box-image"
                src={Eye}
                alt={""}
              />
              <img
                className="gitrepodetail-inner-box-image"
                src={Pen}
                alt={""}
              />
            </div>
            <div className="gitrepodetail-inner-box-plus-info-title">
              상세 설명
            </div>
            <div className="gitrepodetail-inner-box-title-container-info">
              <div className="container-title">기간</div>
              <input
                onChange={(e) => {
                  // repos[index]?.start = e.target.value;
                  // setRepos([...repos]);
                }}
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
            <div className="gitrepodetail-inner-box-title-container-info-skill">
              <div className="container-title">기술스택</div>
              <input
                onChange={onChange}
                value={skill}
                name="skill"
                className="gitrepodetail-inner-box-plus-info-title-info-box-skill"
                placeholder="기술스택칸은 안 넓어도 괜찮지 않을까아ㅏㅏ"
              />
            </div>
            <div className="gitrepodetail-inner-box-title-container-info">
              <div className="container-title">도메인</div>
              <input
                onChange={onChange}
                value={domain}
                name="domain"
                className="gitrepodetail-inner-box-plus-info-title-info-box"
                placeholder="000.000.000"
              />
            </div>
            <div className="gitrepodetail-inner-box-title-container-end-info">
              <div className="container-title">설명</div>
              <input
                onChange={onChange}
                value={explain}
                name="explain"
                className="gitrepodetail-inner-box-plus-info-title-plus-info-box"
                placeholder="✧٩(ˊωˋ*)و✧"
              />
            </div>
            <div className="save-button-container">
              <button className="round-button">저장</button>
            </div>
          </div>
          <img
            id="toc-toggle"
            // className={`gitrepodetail-inner-box-fold-image${toggle && "-down"}`}
            src={Fold}
            alt={""}
            onClick={openCloseToc}
          />
        </div>
      </div>
    </div>
  );
}

export default GitRepoDetail;
