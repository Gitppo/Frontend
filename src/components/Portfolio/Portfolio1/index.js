import "./style.css";

export default function Portfolio1({pInfo}) {
  pInfo = {
    title: "Name's Protfolio",
    onelineIntro: "한줄 자기소개",
    freeIntro: "자유형태의 자기소개",
    name: "홍길동",
    tel: "010-1234-1234",
    addr: "서울시 깃포구",
    birth: "00.00.00",
    edu: {
      school: "00대학교 (서울)",
      dept: "/ 00학부",
      state: "2020.02 졸업",
    },
    skills: [
      {name: "React.js", level: 3},
      {name: "React.js", level: 2},
      {name: "React.js", level: 1},
      {name: "React.js", level: 3},
      {name: "React.js", level: 3},
      {name: "React.js", level: 3},
      {name: "React.js", level: 3},
    ],
    careers: [
      {
        company: "Daum",
        dept: "research team",
        start: "2021.01",
        end: "2021.02",
        role: "Marketing, Research",
      },
      {
        company: "Daum",
        dept: "research team",
        start: "2021.01",
        end: "2021.02",
        role: "Marketing, Research",
      },
    ],
    experience: [
      {
        start: "2021.01",
        end: "2021.02",
        name: "활동명",
        info: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
      },
      {start: "2021.01", end: "2021.02", name: "활동명", info: "설명설명설명"},
    ],
    license: [
      {
        name: "종류",
        level: "레벨",
        date: "취득일",
        agency: "취득기관",
      },
      {
        name: "종류",
        level: "레벨",
        date: "취득일",
        agency: "취득기관",
      },
    ],
    publishing: [
      {
        name: "이름(고유번호)",
        publisher: "출판사",
        author: "저자",
        date: "발행일",
        link: "링크",
        info: "설명",
      },
      {
        name: "이름(고유번호)",
        publisher: "출판사",
        author: "저자",
        date: "발행일",
        link: "링크",
        info: "설명",
      },
    ],
    awards: [
      {
        name: "수상내용",
        date: "수상일",
        agency: "취득기관",
      },
      {
        name: "수상내용",
        date: "수상일",
        agency: "취득기관",
      },
    ],
    projects: [
      {
        title: "프로젝트 이름",
        start: "시작일",
        end: "종료일",
        intro: "역할",
        lang: [
          {value: "언어1", per: 0.4},
          {value: "언어2", per: 0.6},
        ],
        info: "프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명",
        github: "깃허브 주소",
        domain: "도메인",
        roles: [
          {name: "역할 이름1", skill: "역할에 따른 기술 스택"},
          {name: "역할 이름2", skill: "역할에 따른 기술 스택"},
        ],
      },
      {
        title: "프로젝트 이름",
        start: "시작일",
        end: "종료일",
        intro: "역할",
        lang: [
          {value: "언어1", per: 0.4},
          {value: "언어2", per: 0.6},
        ],
        info: "프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명 프로젝트 설명",
        github: "깃허브 주소",
        domain: "도메인",
        roles: [
          {name: "역할 이름1", skill: "역할에 따른 기술 스택"},
          {name: "역할 이름2", skill: "역할에 따른 기술 스택"},
        ],
      },
    ],
  };

  return (
    <div
      style={{
        fontSize: "13px",
      }}
    >
      <div
        style={{
          backgroundColor: "#19265A",
          color: "white",
          paddingTop: "10mm",
        }}
      >
        {/* 포트폴리오 제목 */}
        <h1 style={{textAlign: "center", marginBottom: "5mm"}}>
          {pInfo?.title}
        </h1>

        {/* 자기소개 */}
        <div style={{backgroundColor: "#172B7A", padding: "5mm 10mm"}}>
          <div>
            <div style={{fontWeight: "bold"}}>{pInfo?.onelineIntro}</div>
            <div>{pInfo?.freeIntro}</div>
          </div>
        </div>

        {/* About me & skills */}
        <div
          style={{
            backgroundColor: "#19265A",
            padding: "5mm 10mm",
            height: "max-content",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "10mm",
          }}
        >
          <div>
            <h2 style={{textAlign: "center", marginBottom: "3mm"}}>About Me</h2>
            <ul
              style={{
                padding: "5mm",
                height: "calc(100% - 2rem - 3mm)",
                color: "#172B7A",
                backgroundColor: "white",
                borderRadius: "2mm",
              }}
            >
              <li>- 이름 : {pInfo.name}</li>
              <li>- 연락처 : {pInfo.tel}</li>
              <li>- 주소 : {pInfo.addr}</li>
              <li>- 생년월일 : {pInfo.birth}</li>
              <li>
                - 학력 :{" "}
                <div>
                  <div>
                    {pInfo.edu?.school} {pInfo.edu?.dept}
                  </div>
                  <div>{pInfo.edu?.state}</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 style={{textAlign: "center", marginBottom: "3mm"}}>Skills</h2>
            <ul
              style={{
                padding: "5mm",
                height: "calc(100% - 2rem - 3mm)",

                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignContent: "flex-start",
                justifyContent: "flex-start",
                gap: "5mm",

                backgroundColor: "white",
                borderRadius: "2mm",
              }}
            >
              {pInfo.skills?.map((skill, index) => (
                <li
                  key={`skill-${index}`}
                  style={{
                    position: "relative",
                    height: "fit-content",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1C2A75",
                      color: "wthie",
                      width: "fit-content",
                      padding: "2mm 3mm",
                      borderRadius: "2mm",
                    }}
                  >
                    {skill?.name}
                  </div>
                  <div
                    style={{
                      width: "5mm",
                      height: "5mm",
                      lineHeight: "5mm",
                      textAlign: "center",
                      color: "#172B7A",
                      backgroundColor: "white",
                      border: "1px solid #1C2A75",
                      borderRadius: "10mm",
                      position: "absolute",
                      top: "-2mm",
                      right: "-2mm",
                      zIndex: "10",
                    }}
                  >
                    {["하", "중", "상"][skill?.level + 1] || "하"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{backgroundColor: "#F7F7F7", padding: "5mm 10mm"}}>
        {/* Career */}
        <div style={{marginBottom: "5mm"}}>
          <h2
            style={{color: "#172B7A", textAlign: "center", marginBottom: "3mm"}}
          >
            Career
          </h2>
          <ul
            style={{
              padding: "5mm",
              backgroundColor: "white",
              borderRadius: "2mm",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
              color: "#172B7A",
            }}
          >
            {pInfo?.careers?.map((career, index) => (
              <li
                style={{
                  display: "flex",
                  gap: "3mm",
                  alignContent: "center",
                  marginBottom: `${
                    index < pInfo?.careers?.length - 1 ? "2mm" : "0"
                  }`,
                }}
                key={`career-${index}`}
              >
                <b style={{flex: "1"}}>
                  {career?.start}~{career?.end}
                </b>
                <div
                  style={{
                    flex: "3",
                    backgroundColor: "#1C2A75",
                    borderRadius: "2mm",
                    color: "white",
                    padding: "0 2mm",
                  }}
                >
                  {career?.company} / {career?.dept}
                </div>
                <div style={{flex: "2", textAlign: "end"}}>{career?.role}</div>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2mm",
            marginBottom: "5mm",
          }}
        >
          {/* Other Experiences */}
          <div>
            <h2
              style={{
                color: "#172B7A",
                textAlign: "center",
                marginBottom: "3mm",
              }}
            >
              Other Experiences
            </h2>
            <ul
              style={{
                height: "calc(100% - 2rem - 2mm)",
                padding: "5mm",
                backgroundColor: "white",
                borderRadius: "2mm",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                color: "#172B7A",
              }}
            >
              {pInfo?.experience?.map((entry, index) => (
                <li
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "2mm",
                    marginBottom: `${
                      index < pInfo?.experience?.length - 1 ? "2mm" : "0"
                    }`,
                  }}
                  key={`experience-${index}`}
                >
                  <div style={{flex: "1"}}>
                    <div>
                      {entry?.start}~{entry?.end}
                    </div>
                    <b>{entry?.name}</b>
                  </div>

                  <div style={{flex: "2"}}>{entry?.info}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* License / Language */}
          <div>
            <h2
              style={{
                color: "#172B7A",
                textAlign: "center",
                marginBottom: "3mm",
              }}
            >
              License / Langugage
            </h2>
            <ul
              style={{
                height: "calc(100% - 2rem - 2mm)",
                padding: "5mm",
                backgroundColor: "white",
                borderRadius: "2mm",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                color: "#172B7A",
              }}
            >
              {pInfo?.license?.map((entry, index) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2mm",
                    marginBottom: `${
                      index < pInfo?.license?.length - 1 ? "2mm" : "0"
                    }`,
                  }}
                  key={`license-${index}`}
                >
                  <div style={{flex: "2"}}>
                    {entry?.name} / {entry?.level}
                  </div>
                  <div style={{flex: "1"}}>{entry?.date}</div>
                  <div style={{flex: "2"}}>{entry?.agency}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2mm",
            marginBottom: "5mm",
          }}
        >
          {/* Publishing */}
          <div>
            <h2
              style={{
                color: "#172B7A",
                textAlign: "center",
                marginBottom: "3mm",
              }}
            >
              Publishing
            </h2>
            <ul
              style={{
                height: "calc(100% - 2rem - 2mm)",
                padding: "5mm",
                backgroundColor: "white",
                borderRadius: "2mm",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                color: "#172B7A",
              }}
            >
              {pInfo?.publishing?.map((entry, index) => (
                <li
                  style={{
                    marginBottom: `${
                      index < pInfo?.publishing?.length - 1 ? "2mm" : "0"
                    }`,
                  }}
                  key={`publishing-${index}`}
                >
                  <b>{entry?.name}</b>
                  <div>
                    <span>{entry?.author}</span> <span>{entry?.publisher}</span>{" "}
                    <span>{entry?.date}</span>
                  </div>
                  <div>{entry?.link}</div>
                  <div>{entry?.info}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards */}
          <div>
            <h2
              style={{
                color: "#172B7A",
                textAlign: "center",
                marginBottom: "3mm",
              }}
            >
              Awards
            </h2>
            <ul
              style={{
                height: "calc(100% - 2rem - 2mm)",
                padding: "5mm",
                backgroundColor: "white",
                borderRadius: "2mm",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                color: "#172B7A",
              }}
            >
              {pInfo?.awards?.map((entry, index) => (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2mm",
                    marginBottom: `${
                      index < pInfo?.license?.length - 1 ? "2mm" : "0"
                    }`,
                  }}
                  key={`award-${index}`}
                >
                  <div style={{flex: "2"}}>{entry?.name}</div>
                  <div style={{flex: "1"}}>{entry?.date}</div>
                  <div style={{flex: "2"}}>{entry?.agency}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div
        style={{
          backgroundColor: "#172B7A",
          textAlign: "center",
          padding: "5mm 10mm 10mm 10mm",
        }}
      >
        <h2 style={{color: "white", marginBottom: "3mm"}}>Projects</h2>
        <ul
          style={{
            width: "100%",
            margin: "0 auto",
            padding: "5mm",
            borderRadius: "2mm",
            backgroundColor: "white",
            color: "#172B7A",
          }}
        >
          {pInfo?.projects?.map((entry, index) => (
            <li key={`project-${index}`}>
              <h3 style={{marginBottom: "3mm"}}>{entry?.title}</h3>
              <div>
                {entry?.start}~{entry?.end} / {entry?.intro}
              </div>
              <div
                style={{
                  width: "fit-content",
                  margin: "2mm auto",
                  borderRadius: "2mm",
                  overflow: "hidden",
                }}
              >
                {entry?.lang?.map((lang, langIndex) => (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "1mm 2mm",
                      backgroundColor: "black",
                    }}
                    key={`project-lang-${langIndex}`}
                  >
                    {lang?.value}
                  </div>
                ))}
              </div>
              <div style={{marginBottom: "3mm"}}>{entry?.info}</div>

              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "30%"}}>GitHub</h4>
                <div style={{width: "70%"}}>{entry?.github}</div>
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "30%"}}>Domain</h4>
                <div style={{width: "70%"}}>{entry?.domain}</div>
              </div>
              {entry?.roles?.map((role, roleIndex) => (
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    margin: "auto",
                    textAlign: "start",
                  }}
                  key={`project-role-${roleIndex}`}
                >
                  <h4 style={{width: "30%"}}>{role?.name}</h4>
                  <div style={{width: "70%"}}>{role?.skill}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
