import "./style.css";
import {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

import Modal from "../../components/Modal";
import BtnModal from "../../components/Modal/BtnModal";
import RadioBtn from "../../components/Btn/RadioBtn";
import RoundContainer from "../../components/RoundContainer";

import flagIcon from "../../assets/flag.png";

import {loadTerm, saveTermToAgree} from "../../hooks/term";
import {isValidUser, useUserContext} from "../../hooks/useUserContext";
import {loginBack} from "../../hooks/login";

function Agreement() {
  const history = useHistory();
  const location = useLocation();
  const {user} = useUserContext();

  const [showAlert, setShowAlert] = useState(false);
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
    if (!isValidUser(user)) {
      setShowAlert(true);
      return;
    }

    let agree = true;
    let parsed = [];
    for (let e of contract) {
      parsed.push({
        termID: e.id,
        termAgreementIsAgree: e?.agree ? true : false,
        userID: user?.id,
      });

      if (e?.required && !e?.agree) {
        agree = false;
        break;
      }
    }

    if (!agree) {
      setErrMsg("필수 항목에 동의하지 않으셨습니다.");
    } else {
      // 동의 시 등록
      saveTermToAgree(user.id, parsed)
        .then((r) => {
          if (r) history.push("/my-page");
          else
            throw Error(
              "DataErr : Failed to save agreements. (Response is not true)"
            );
        })
        .catch((e) => {
          console.error(e);
          setErrMsg("동의 내역 저장에 실패하였습니다. 다시 시도해주세요.");
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
        // history.push("/error/load-fail");
      });
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
        {/* <div className={"agree-contract-title"}>
          <h4>만 14세 이상입니다.</h4>
          <RadioBtn />
        </div> */}

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
          <button className={"round-btn"} onClick={onAgree}>
            동의
          </button>
        </div>
      </RoundContainer>

      {showAlert && (
        <Modal backBlack={true}>
          <BtnModal
            title={"로그인이 필요합니다"}
            btn1={"확인"}
            oneBtn={true}
            onBtn1={() => {
              setShowAlert(false);
              loginBack(location.pathname);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
export default Agreement;
