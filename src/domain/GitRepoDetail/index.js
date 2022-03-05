import "./style.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Select from "react-select";

import BeforeAfterBtn from "../../components/BeforeAfterBtn";

import Star from "../../assets/star.png";
import BlueEye from "../../assets/eye-blue.png";
import Fold from "../../assets/arrow-no-head.png";
import GrayEye from "../../assets/eye-gray.png";

import {getOptions} from "../../hooks/options";

function GitRepoDetail() {
  const location = useLocation();
  const history = useHistory();

  // mock-data
  const [repos, setRepos] = useState([
    {
      name: "hyu-likelion/NESI",
      created_at: "2017.12.12",
      updated_at: "2022.03.05",
      stargazers_count: 0,
      languages: {
        "addtionalProp1": 0,
        "addtionalProp2": 0,
        "addtionalProp3": 0,
      },
      description: "바닐라 자바스크립트 구현 프로젝트 리액트로 바꿔보기",
      readme: "string",
      html_url: "000.000.000",
    }
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
    start: "",
    end: "",
    role: "",
    url: "",
    explain: "",
  });

  const inputsonChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log("input");
  };

  // readme useState
  /*
  const [isClick, setIsClick] = useState(false);

  const readmeonChange = () => {
    setIsClick((isClick) => !isClick);
    console.log("click");
  };
  */

  // select useState
  const [selects, setSelects] = useState([]);

  const selectsonChange = (e) => {
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
        borderRadius: "0.5em",
        padding: "0.2em",
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
        borderRadius: "0.5em",
        padding: "0.15em",
        //margin: "0 0 0 0.1%",
      };
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: "#FFFFFF",
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ":hover": {
        color: "#FFFFFF",
        cursor: "pointer",
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
        if (!r) throw Error("Failed to load getOptions.");
        r?.map((e) => {
          return {
            value: e.name,
            label: e.name,
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
                  {box?.languages[0]}
                </div>
              </div>
            </div>

            <div style={box?.fold ? {display: "none"} : {}}>
              <div className="grd-inner-box-title">
                <div className="grd-inner-box-text">
                  {box?.description ?? "Description이 없습니다."}
                </div>
              </div>
              <div className="grd-inner-box-readme">
                README.md
                <img
                  className={"grd-inner-box-image"}
                  src={box?.show ? GrayEye : BlueEye}
                  alt={""}
                  onClick={() => {
                    repos[index].show = !(box?.show ?? false);
                    setRepos([...repos]);
                  }}
                />
              </div>
              <div className="grd-inner-box-detail">상세 설명</div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">기간</div>
                <input
                  onChange={inputsonChange}
                  value={box?.start}
                  name="start"
                  className="grd-inner-box-date"
                  placeholder="시작일"
                />
                <div className="wave-mark">~</div>
                <input
                  onChange={inputsonChange}
                  value={box?.end}
                  name="end"
                  className="grd-inner-box-date"
                  placeholder="마감일"
                />
              </div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">역할</div>
                <input
                  onChange={inputsonChange}
                  value={box?.role}
                  name="role"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="프론트엔드 개발 / 디자인"
                />
              </div>
              <div className="grd-inner-box-title-container-skill">
                <div className="container-title">기술스택</div>
                <Select
                  isMulti
                  styles={styles}
                  name="selects"
                  className="grd-inner-box-skill"
                  classNamePrefix="select"
                  style={{border: "none"}}
                  defaultValue={skillOptions[0]}
                  options={skillOptions}
                  onChange={selectsonChange}
                />
              </div>
              <div className="grd-inner-box-title-container">
                <div className="container-title">URL</div>
                <input
                  onChange={inputsonChange}
                  value={box?.url}
                  name="url"
                  className="grd-inner-box-plus-info-title-info-box"
                  placeholder="000.000.000"
                />
              </div>
              <div className="grd-inner-box-title-container-info">
                <div className="container-title">설명</div>
                <textarea
                  onChange={inputsonChange}
                  value={box?.explain}
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
