import "./style.css";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {loadTerm, saveTermToAgree} from "../../hooks/loadTerm";

import RoundContainer from "../../components/RoundContainer";
import RadioBtn from "../../components/RadioBtn";

import flagIcon from "../../assets/flag.png";

function Agreement() {
  const history = useHistory();

  const [errMsg, setErrMsg] = useState("");
  const [contract, setContract] = useState([
    {
      contents: [
        {
          title: "깃포 이용약관",
          contents: "깃포 이용약관을 로딩 중입니다.",
        },
      ],
      id: 0,
      required: true,
      termTitle: "깃포 이용약관",
    },
  ]);

  const onAgree = () => {
    let agree = true;
    for (let e of contract) {
      if (e?.required && !e?.agree) {
        agree = false;
        break;
      }
    }

    if (!agree) {
      setErrMsg("필수 항목에 동의하지 않으셨습니다.");
    } else {
      // 동의 시 등록
      saveTermToAgree(contract)
        .then((r) => {
          history.push("/my-page");
        })
        .catch((e) => {
          console.error(e);

          // TODO : 동의 오류 시 알림
        });
    }
  };

  useEffect(() => {
    loadTerm()
      .then((r) => {
        if (r) setContract(r);
        else {
          throw Error("DataErr : Data is not compatible.");
        }
      })
      .catch((e) => {
        console.error(e);
        history.push("/error/load-fail");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={"agree"}>
      <div className={"agree-title"}>
        <img id={"agree-title-flag"} src={flagIcon} alt={""} />
        <h2 className={"beautiful-title"}>이용 약관 동의</h2>
      </div>

      <RoundContainer className={"agree-container"}>
        <div className={"agree-contract-title"}>
          <h2 className={"beautiful-title"}>
            <div>이용약관, 개인정보 수집 및 이용, 프로모션 알림,</div>
            <div>메일 및 푸시 알림 수신(선택)에 모두 동의합니다.</div>
          </h2>
          <RadioBtn
            onChanged={(e) => {
              for (let i in contract) {
                contract[i].agree = e;
              }
              setContract([...contract]);
            }}
          />
        </div>

        {/* 구분선 */}
        <hr />

        {/* 동의 1 */}
        <div className={"agree-contract-title"}>
          <h4>만 14세 이상입니다.</h4>
          <RadioBtn />
        </div>

        {/* 동의 2 */}
        {contract?.map((e, i) => (
          <div key={`agree-${i}`}>
            <div className={"agree-contract-title"}>
              <h4 style={e?.required ? {textIndent: "-0.8em"} : {}}>
                {e?.required && "* "}
                {e?.termTitle}
              </h4>
              <RadioBtn
                value={e?.agree}
                onChanged={(e) => {
                  contract[i].agree = e;
                  setContract([...contract]);
                }}
              />
            </div>
            <h4>테스트</h4>

            <div className={"agree-contract-content"}>
              {e?.contents?.map((e2, i2) => (
                <div key={`agree-${i}-${i2}`}>
                  <h4>{e2?.title}</h4>
                  <div>{e2?.contents}</div>
                  <br />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="agree-err-msg">
          <div>* 표시는 필수 항목입니다.</div>
          {errMsg?.length > 0 && (
            <div style={{color: "var(--dark-red)"}}>{errMsg}</div>
          )}
        </div>

        <div className={"agree-button-container"}>
          <button className={"round-button"} onClick={onAgree}>
            동의
          </button>
        </div>
      </RoundContainer>
    </div>
  );
}
export default Agreement;
