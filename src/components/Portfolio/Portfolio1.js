import MarkdownPreview from "@uiw/react-markdown-preview";

const COLORBAR = ["#E9EAF1", "#BBBFD6", "#777FAC", "#212A75"];

export default function Portfolio1({pInfo}) {
  return (
    <div
      style={{
        fontSize: "0.9rem",
        width: "210mm",
        overflow: "hidden",
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
          {pInfo?.pfName}
        </h1>

        {/* 자기소개 */}
        <div style={{backgroundColor: "#172B7A", padding: "5mm 10mm"}}>
          <div>
            <div style={{fontWeight: "bold"}}>
              {pInfo?.personal?.introduction?.shortIntro || ""}
            </div>
            <div>{pInfo?.personal?.introduction?.longIntro || ""}</div>
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
              <li>- 이름 : {pInfo?.personal?.basicInfo?.biName || ""}</li>
              <li>- 연락처 : {pInfo?.personal?.basicInfo?.biPhone || ""}</li>
              <li>- 이메일 : {pInfo?.personal?.basicInfo?.biMail || ""}</li>
              <li>- 생년월일 : {pInfo?.personal?.basicInfo?.biBirth || ""}</li>
              <li>
                - 학력 :{" "}
                <div>
                  {pInfo?.personal?.educations?.map((e, i) => (
                    <div key={`education-${i}`}>
                      <div>
                        {e?.eduName || e?.eduType} {e?.eduMajor}
                      </div>
                      <div>
                        {e?.eduStartDate} ~ {e?.eduEndDate} ({e?.eduGrade})
                      </div>
                    </div>
                  ))}
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
              {pInfo?.personal?.skills?.map((skill, index) => (
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
                    {skill?.skName}
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
                    {["상", "중", "하"][skill?.skLevel - 1] || "하"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{backgroundColor: "#F7F7F7", padding: "5mm 10mm"}}>
        {/* Career */}
        {pInfo?.personal?.careers?.length > 0 && (
          <div style={{marginBottom: "5mm"}}>
            <h2
              style={{
                color: "#172B7A",
                textAlign: "center",
                marginBottom: "3mm",
              }}
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
              {pInfo?.personal?.careers?.map((career, index) => (
                <li
                  style={{
                    display: "flex",
                    gap: "3mm",
                    alignContent: "center",
                    marginBottom: `${
                      index < pInfo?.personal?.careers?.length - 1 ? "2mm" : "0"
                    }`,
                  }}
                  key={`career-${index}`}
                >
                  <b style={{flex: "1"}}>
                    {career?.carStartDate} ~ {career?.carEndDate}
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
                    {career?.carName} / {career?.carDepartmentName}
                  </div>
                  <div style={{flex: "2", textAlign: "end"}}>
                    {career?.carPosition} / {career?.carJob}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              pInfo?.personal?.activities?.length > 0 &&
              pInfo?.personal?.licenses?.length > 0
                ? "1fr 1fr"
                : "1fr",
            gap: "2mm",
            marginBottom:
              pInfo?.personal?.activities?.length > 0 &&
              pInfo?.personal?.licenses?.length > 0
                ? "5mm"
                : "0",
          }}
        >
          {pInfo?.personal?.activities?.length > 0 && (
            //  Other Experiences
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
                {pInfo?.personal?.activities?.map((entry, index) => (
                  <li
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "2mm",
                      marginBottom: `${
                        index < pInfo?.personal?.activities?.length - 1
                          ? "2mm"
                          : "0"
                      }`,
                    }}
                    key={`experience-${index}`}
                  >
                    <div style={{wordBreak: "keep-all"}}>
                      <div>
                        {entry?.actStartDate}~{entry?.actEndDate}
                      </div>
                      <b>{entry?.actName}</b>
                    </div>

                    <div style={{flex: "1"}}>
                      <div>{entry?.actContents}</div>
                      <div>{entry?.link}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* License / Language */}
          {pInfo?.personal?.licenses?.length > 0 && (
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
                {pInfo?.personal?.licenses?.map((entry, index) => (
                  <li
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2mm",
                      marginBottom: `${
                        index < pInfo?.personal?.licenses?.length - 1
                          ? "2mm"
                          : "0"
                      }`,
                    }}
                    key={`license-${index}`}
                  >
                    <div style={{flex: "1"}}>
                      {entry?.licName} / {entry?.licLevel}
                    </div>
                    <div style={{wordBreak: "keep-all"}}>{entry?.licDate}</div>
                    <div style={{flex: "1"}}>{entry?.licOrganization}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              pInfo?.personal?.papers?.length > 0 &&
              pInfo?.personal?.awards?.length > 0
                ? "1fr 1fr"
                : "1fr",
            gap: "2mm",
            marginBottom:
              pInfo?.personal?.papers?.length > 0 &&
              pInfo?.personal?.awards?.length > 0
                ? "5mm"
                : "0",
          }}
        >
          {/* Publishing */}
          {pInfo?.personal?.papers?.length > 0 && (
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
                {pInfo?.personal?.papers?.map((entry, index) => (
                  <li
                    style={{
                      marginBottom: `${
                        index < pInfo?.personal?.papers?.length - 1
                          ? "2mm"
                          : "0"
                      }`,
                    }}
                    key={`publishing-${index}`}
                  >
                    <div>
                      <b>{entry?.ppName}</b>
                      <span>{entry?.ppNumber}</span>
                    </div>
                    <div>
                      <span>{entry?.ppPublisher}</span>{" "}
                      <span>{entry?.ppWriter}</span>{" "}
                      <span>{entry?.ppDate}</span>
                    </div>
                    <div>{entry?.ppLink}</div>
                    <div>{entry?.ppContents}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Awards */}
          {pInfo?.personal?.awards?.length > 0 && (
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
                {pInfo?.personal?.awards?.map((entry, index) => (
                  <li
                    style={{
                      marginBottom: `${
                        index < pInfo?.personal?.awards?.length - 1
                          ? "2mm"
                          : "0"
                      }`,
                    }}
                    key={`award-${index}`}
                  >
                    <div>
                      <b style={{flex: "1"}}>{entry?.awName}</b>{" "}
                      <span style={{wordBreak: "keep-all"}}>
                        {entry?.awDate}
                      </span>
                    </div>
                    <div>
                      <span style={{flex: "1"}}>{entry?.awOrganization}</span>
                      {" / "}
                      <span style={{flex: "1"}}>{entry?.awContents}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
          {pInfo?.repo?.map((entry, index) => (
            <li key={`project-${index}`}>
              <h3 style={{marginBottom: "3mm"}}>{entry?.rpName}</h3>
              <div
                style={{
                  width: "fit-content",
                  margin: "2mm auto",
                  borderRadius: "2mm",
                  overflow: "hidden",
                }}
              >
                {entry?.lang?.slice(0, 4)?.map((lang, langIndex) => (
                  <div
                    style={{
                      display: "inline-block",
                      padding: "1mm 2mm",
                      fontSize: "0.64em",
                      backgroundColor: COLORBAR[langIndex],
                      width: `${parseFloat(lang?.perc || 100) * 0.8}mm`,
                    }}
                    key={`project-lang-${langIndex}`}
                    title={`${lang?.lang} : ${lang?.perc}%`}
                  >
                    {lang?.lang}
                  </div>
                ))}
              </div>
              <div>
                {entry?.lang?.map((lang, langIndex) => (
                  <span key={`project-lang-${langIndex}-str`}>
                    {lang?.lang} {lang?.perc}%
                    {langIndex < entry?.lang?.length - 1 && " / "}
                  </span>
                ))}
              </div>

              <div>{entry?.rpLongContents}</div>

              <div style={{margin: "2mm auto"}}>
                <MarkdownPreview
                  source={entry?.rpReadme}
                  style={{fontSize: "1em"}}
                />
              </div>

              {/* <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "30%"}}>GitHub</h4>
                <div style={{width: "70%"}}>{entry?.github}</div>
              </div> */}
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "40pt"}}>기간</h4>
                <div>
                  {entry?.rpSdate}~{entry?.rpEdate}
                </div>
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "40pt"}}>링크</h4>
                <div>
                  <a
                    href={entry?.rpShortContents}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {entry?.rpShortContents}
                  </a>
                </div>
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  margin: "auto",
                  textAlign: "start",
                }}
              >
                <h4 style={{width: "40pt"}}>역할</h4>
                <div>{entry?.rpRole}</div>
              </div>

              {index < pInfo?.repo?.length - 1 && <br />}
            </li>
          ))}
        </ul>
      </div>

      {/* SNS */}
      <div
        style={{
          backgroundColor: "#19265A",
          padding: "5mm 10mm",
          color: "white",
        }}
      >
        {pInfo?.personal?.snsList?.map((e) => (
          <div key={`sns-${e?.id}`}>
            {e?.snsName} : {e?.snsLink}
          </div>
        ))}
      </div>
    </div>
  );
}
