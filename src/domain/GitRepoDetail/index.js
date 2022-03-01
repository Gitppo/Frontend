import "./style.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Select from "react-select";
import BeforeAfterBtn from "../../components/BeforeAfterBtn";
import Star from "../../assets/star.png";
import Pen from "../../assets/pen.png";
import Eye from "../../assets/eye.png";
import Fold from "../../assets/arrow-no-head.png";
import {useLocation} from "react-router";

function GitRepoDetail() {
  const location = useLocation();
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
        ["JavaScript", "56.8% "],
        ["Java", "43.2% "],
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
  ]);

  const skillOptions = [
    {value: "JavaScript", label: "JavaScript"},
    {value: "Java", label: "Java"},
    {value: "Python", label: "Python"},
    {value: "C++", label: "C++"},
    {value: "C", label: "C"},
    {value: "C#", label: "C#"},
    {value: "HTML", label: "HTML"},
    {value: "CSS", label: "CSS"},
    {value: "Ruby", label: "Ruby"},
    {value: "PHP", label: "PHP"},
    {value: "Scala", label: "Scala"},
    {value: "Spring", label: "Spring"},
    {value: "Django", label: "Django"},
    {value: "Kotlin", label: "Kotlin"},
    {value: "Node.js", label: "Node.js"},
  ];

  const [inputs, setInputs] = useState({
    start: "",
    end: "",
    role: "",
    skill: "",
    domain: "",
    explain: "",
  });

  const {start, end, role, skill, domain, explain} = inputs;

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(value);
  };

  const styles = {
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: "#0F2C7F",
        color: "#C6C6C6",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#FFFFFF",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: "".color,
      ":hover": {
        backgroundColor: "#9E413C",
        color: "#FFFFFF",
      },
    }),
  };

  function deletePortfolio(id) {
    for (let i = 0; i < repos.length; i++) {
      if (repos[i].id === id) {
        repos.splice(i, 1);
        break;
      }
    }
    setRepos([...repos]);
  }

  const tmpSave = () => {};

  useEffect(() => {
    if (!location.state || !location.state.hasOwnProperty("gitrepos")) {
      history.replace("/error/load-fail");
      return;
    }

    setRepos(location.state.gitrepos);
  }, [history, location.state]);

  return (
    <div className="grd">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={() => history.push("/my-page")}
        onNext={() => history.push("/git-info")}
        onSave={tmpSave}
      />

      <div className="grd-wrapper">
        <div className="grd-top-container">
          <div className="grd-top-container-title">레포지토리</div>
          {/* // TODO : 초기화 */}
          <button className="round-button">초기화</button>
        </div>

        {repos.map((box, index) => (
          <li className="grd-inner-box" key={index}>
            <div className="grd-inner-box-info-container">
              <div className="grd-inner-box-top-container">
                <h3 className="grd-inner-box-repo-title">{box?.name}</h3>
                <img className="grd-inner-box-image" src={Star} alt={""} />
                <div className="grd-inner-box-star-num">
                  {box?.stargazers_count}
                </div>
                <button
                  className="round-button"
                  onClick={() => deletePortfolio(box?.id)}
                >
                  삭제
                </button>
              </div>
              <div className="grd-inner-box-bottom-container">
                <div className="grd-inner-box-bottom-title">생성일</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.created_at}
                </div>
                <div className="grd-inner-box-bottom-title">최근 업데이트</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.updated_at}
                </div>
                <div className="grd-inner-box-bottom-title">사용언어</div>
                <div className="grd-inner-box-bottom-detail">
                  {box?.language}
                </div>
              </div>
            </div>

            <div style={box?.fold ? {display: "none"} : {}}>
              <div className="grd-inner-box-title">
                <div className="grd-inner-box-text">
                  {/* // TODO : useState!!! */}
                  {box?.description ?? "Description이 없습니다."}
                </div>
                <img
                  className="grd-inner-box-image"
                  src={Pen}
                  alt={""}
                  // onClick={}
                />
              </div>
              <div className="grd-inner-box-readme">
                <div className="grd-inner-box-text">
                  {/* // TODO : useState!!! */}
                  README.md
                </div>
                <img
                  className="grd-inner-box-image"
                  src={Eye}
                  alt={""}
                  // onClick={}
                />
                <img
                  className="grd-inner-box-image"
                  src={Pen}
                  alt={""}
                  // onClick={}
                />
              </div>
              <div className="grd-inner-box-detail">상세 설명</div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">기간</div>
                <input
                  onChange={onChange}
                  value={start}
                  name="start"
                  className="grd-inner-box-date"
                  placeholder="시작일"
                />
                <div className="wave-mark">~</div>
                <input
                  onChange={onChange}
                  value={end}
                  name="end"
                  className="grd-inner-box-date"
                  placeholder="마감일"
                />
              </div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">역할</div>
                <input
                  onChange={onChange}
                  value={role}
                  name="role"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="프론트엔드개발 / 디자인"
                />
              </div>
              <div className="grd-inner-box-title-container-skill">
                <div className="container-title">기술스택</div>
                <Select
                  isMulti
                  styles={styles}
                  name="skill"
                  options={skillOptions}
                  className="grd-inner-box-skill"
                  classNamePrefix="select"
                  defaultValue={skillOptions[0]}
                  style={{border: "none"}}
                  // onChange={onChange}
                />

                {/* <div>
                  <div
                    className="grd-inner-box-plus-info-title-info-box"
                    style={{width: "100%"}}
                  >
                    <span
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "0.2em 0.5em",
                        marginRight: "0.2em",
                      }}
                    >
                      JavaScript
                    </span>
                    <span
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "0.2em 0.5em",
                        marginRight: "0.2em",
                      }}
                    >
                      Java
                    </span>
                    <span>
                      <input
                        type="text"
                        list="skill-stack-list"
                        style={{
                          border: "none",
                          outline: "none",
                          background: "none",
                        }}
                      />
                    </span>
                  </div>
                  <datalist id={"skill-stack-list"}>
                    {skillOptions?.map((e, i) => (
                      <option value={e?.label} />
                    ))}
                  </datalist>
                </div> */}
              </div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">도메인</div>
                <input
                  onChange={onChange}
                  value={domain}
                  name="domain"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="000.000.000"
                />
              </div>
              <div className="grd-inner-box-title-container-info">
                <div className="container-title">설명</div>
                <textarea
                  onChange={onChange}
                  value={explain}
                  name="explain"
                  className="grd-inner-box-info-text"
                  placeholder="✧٩(ˊωˋ*)و✧"
                />
              </div>
              <div className="save-button-container">
                <button className="round-button">저장</button>
              </div>
            </div>
            <img
              className={`grd-inner-box-fold-image${box?.fold ? "-down" : ""}`}
              src={Fold}
              alt={""}
              onClick={() => {
                // fold: true - 접힘 / false - 열림
                repos[index].fold = !(repos[index]?.fold ?? false);
                setRepos([...repos]);
              }}
            />
          </li>
        ))}
      </div>
    </div>
  );
}

export default GitRepoDetail;
