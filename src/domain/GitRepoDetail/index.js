import "./style.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Select from "react-select";

import BeforeAfterBtn from "../../components/BeforeAfterBtn";

import Star from "../../assets/star.png";
import Eye from "../../assets/eye.png";
import Fold from "../../assets/arrow-no-head.png";

import {getOptions} from "../../hooks/options";

function GitRepoDetail() {
  const location = useLocation();
  const history = useHistory();

  // mock-data
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

  // inputs useState
  const [inputs, setInputs] = useState({
    title: "",
    start: "",
    end: "",
    role: "",
    domain: "",
    explain: "",
  });

  const {title, start, end, role, domain, explain} = inputs;

  const inputsonChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log("input");
  };

  // readme useState
  const [isClick, setIsClick] = useState(false);

  const readmeonChange = () => {
    setIsClick((isClick) => !isClick);
    console.log("click");
  };

  // select useState
  const [selects, setSelects] = useState([]);

  const selectonChange = (e) => {
    const value = e.value;
    setSelects(value);
    console.log("select");
  };

  // react-select style
  const styles = {
    control: (styles) => {
      return {
        ...styles,
        border: 0,
        boxShadow: "none",
        backgroundColor: "#EEF1F7",
      };
    },
    option: (styles, {isDisabled, isFocused, isSelected}) => {
      const color = "#EEF1F7";
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? color
          : isFocused
          ? color
          : undefined,
        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? color
              : color
            : undefined,
        },
      };
    },
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

  const tmpSave = () => {
    console.log("TTT");
  };
  const onPrev = () => {
    history.push("/git-repo", {
      ...location.state,
    });
  };
  const onNext = () => {
    tmpSave();
    history.push("/git-info", {
      ...location.state,
    });
  };

  useEffect(() => {
    if (!location?.state?.hasOwnProperty("gitrepos")) {
      history.replace("/error/load-fail");
      return;
    }
    setRepos(location.state.gitrepos.filter((e) => e.checked));

    getOptions()
      .then((r) => {
        // [{id: 1, name: "python"}, {id: 2, name: "java"}]
        // TODO : 문구 넣기
        if (!r) throw Error("문구 넣으세요.");
        r?.map((e) => {
          return {
            name: e.name,
            value: e.name,
          };
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [history, location.state]);

  return (
    <div className="grd">
      <BeforeAfterBtn
        saveShow={true}
        onPrev={onPrev}
        onNext={onNext}
        onSave={tmpSave}
      />

      <div className="grd-wrapper">
        <div className="grd-top-container">
          <div className="grd-top-container-title">레포지토리</div>
          <button
            className="round-button"
            onClick={() => {
              setRepos(
                location.state.gitrepos
                  .filter((e) => e.checked)
                  .map((e) => ({...e, fold: false}))
              );
            }}
          >
            초기화
          </button>
        </div>

        {repos.map((box, index) => (
          <li className="grd-inner-box" key={index}>
            <div
              className="grd-inner-box-info-container"
              onClick={() => {
                // fold: true - 접힘 / false - 열림
                repos[index].fold = !(box?.fold ?? false);
                setRepos([...repos]);
              }}
            >
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
                  {box?.description ?? "Description이 없습니다."}
                </div>

                {/*<input
                  onChange={inputsonChange}
                  value={index.title}
                  name="title"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="바닐라자바스크립트 구현 프로젝트 리액트로 바꿔보기"
                />*/}
              </div>
              <div className="grd-inner-box-readme">
                README.md
                <img
                  className="grd-inner-box-image"
                  src={Eye}
                  alt={""}
                  onClick={() => readmeonChange()}
                />
              </div>
              <div className="grd-inner-box-detail">상세 설명</div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">기간</div>
                <input
                  onChange={inputsonChange}
                  value={index.start}
                  name="start"
                  className="grd-inner-box-date"
                  placeholder="시작일"
                />
                <div className="wave-mark">~</div>
                <input
                  onChange={inputsonChange}
                  value={index.end}
                  name="end"
                  className="grd-inner-box-date"
                  placeholder="마감일"
                />
              </div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">역할</div>
                <input
                  onChange={inputsonChange}
                  value={index.role}
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
                  className="grd-inner-box-skill"
                  classNamePrefix="select"
                  style={{border: "none"}}
                  onChange={selectonChange}
                  defaultValue={skillOptions[0]}
                  options={getOptions}
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
                  onChange={inputsonChange}
                  value={index.domain}
                  name="domain"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="000.000.000"
                />
              </div>
              <div className="grd-inner-box-title-container-info">
                <div className="container-title">설명</div>
                <textarea
                  onChange={inputsonChange}
                  value={index.explain}
                  name="explain"
                  className="grd-inner-box-info-text"
                  placeholder="설명"
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
                repos[index].fold = !(box?.fold ?? false);
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
