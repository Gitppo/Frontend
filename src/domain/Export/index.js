import "./style.css";
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";

import RadioBtn from "../../components/Btn/RadioBtn";
import BtnModal from "../../components/Modal/BtnModal";
import ShareModal from "../../components/Modal/ShareModal";
import Portfolio1 from "../../components/Portfolio/Portfolio1";
import Portfolio2 from "../../components/Portfolio/Portfolio2";
import BeforeAfterBtn from "../../components/Btn/BeforeAfterBtn";
import ExportUserGuide from "../../components/Modal/ExportUserGuide";

import {
  completePortfolio,
  getPortfolioDetail,
  userHasPortfoilo,
} from "../../hooks/portfolio";
import {loginBack} from "../../hooks/login";
import {isValidUser, useUserContext} from "../../hooks/useUserContext";
import RoundContainer from "../../components/RoundContainer/index";

import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Export({match}) {
  const history = useHistory();
  const location = useLocation();

  const {user} = useUserContext();

  const [pf, setPf] = useState({});
  const [styleIndex, setStyleIndex] = useState(0);

  const [showConsole, setShowConsle] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showGuide, setShowGuide] = useState(
    !(localStorage.getItem("show-export-user-guide") === "false")
  );

  const [alertMsg, setAlertMsg] = useState({});
  const [alertShow, setAlertShow] = useState(false);

  const onPrev = () => {
    history.push(`/new/3/${match.params.pfID}`, {...location.state});
  };
  const onSave = async () => {
    await completePortfolio({
      pfId: pf?.id,
      pfShare: pf?.pfShare ?? false,
      pfTemplate: styleIndex ?? 0,
    })
      .then(() => {
        setAlertMsg({title: "저장을 완료하였습니다"});
        setAlertShow(true);

        history.replace(location.pathname, {
          ...location.state,
          data: {
            ...(location.state?.data || {}),
            pfShare: pf?.pfShare,
            pfTemplate: styleIndex,
          },
        });
      })
      .catch((e) => {
        console.error(e);
        setAlertMsg({title: "저장에 실패하였습니다"});
        setAlertShow(true);
      });
  };
  const onShare = async () => {
    await onSave();
    setAlertShow(false);
    setShowShareModal(true);
  };

  useEffect(() => {
    // url check
    if (!match.params?.pfID) {
      history.replace("/error");
      return;
    }

    // invalid user
    if (!isValidUser(user)) {
      loginBack(location.pathname);
      return;
    }

    // authority check
    if (!userHasPortfoilo(user.id, match.params.pfID)) {
      history.replace("/error/unauthorized");
      return;
    }

    // data check
    if (!location.state?.data?.repo || !location?.state?.data?.personal) {
      getPortfolioDetail(match.params.pfID)
        .then((r) => {
          history.replace(location.pathname, {
            data: {
              ...r,
              repo: r?.repo || [],
              personal: r?.personal || {},
            },
          });
        })
        .catch((e) => {
          console.error(e);
          history.replace("/error/load-fail");
        });
      return;
    }

    let {data} = location.state;
    data.repo =
      data?.repo?.map((e) => {
        // language sum
        let total = 0;
        let langArr = [];
        for (let i in e?.rpLanguages) {
          total += e?.rpLanguages[i];
          langArr.push({
            lang: i,
            val: e?.rpLanguages[i],
          });
        }

        // 비율 계산
        for (let i = 0; i < langArr.length; i++) {
          langArr[i].perc = ((langArr[i].val / total) * 100).toFixed(1);
        }
        // 비율을 내림차순으로 정렬
        langArr.sort((a, b) => b.perc - a.perc);
        return {...e, lang: langArr};
      }) || [];

    setPf(data);
  }, [history, location, match.params, user]);

  return (
    <div className="pfcon">
      <BeforeAfterBtn saveShow={false} nextShow={false} onPrev={onPrev} />

      <h2 className="title">{pf?.pfName}</h2>

      <div className="pfcon-body">
        <div
          className={`pf-pv-sect ${!showConsole && "pf-pv-sect-fold"}`}
          id="#export-portfolio-preview"
        >
          {/* 미리보기 창 */}
          {styleIndex === 0 ? (
            <Portfolio1 pInfo={pf} />
          ) : styleIndex === 1 ? (
            <Portfolio2 pInfo={pf} />
          ) : (
            <></>
          )}
        </div>

        {/* 템플릿 콘솔 창 */}
        <div className={`pf-con-sect ${!showConsole && "pf-con-sect-fold"}`}>
          <div className="show-btn" onClick={() => setShowConsle(!showConsole)}>
            <FontAwesomeIcon icon={faAngleRight} className="arrow" />
          </div>

          <RoundContainer blueHeader={true}>
            <div>
              <div className="title-section">포트폴리오 설정</div>
              <ul className="pfcon-tp-choice-wp">
                <li onClick={() => setPf({...pf, pfShare: !pf?.pfShare})}>
                  <RadioBtn value={pf?.pfShare} />
                  <span>링크 공개</span>
                </li>

                <li>
                  <RadioBtn />
                  <span>스타 사용</span>
                </li>
              </ul>
            </div>
            <br />

            <div>
              <div className="title-section">템플릿 선택</div>
              <ul className="pfcon-tp-choice-wp">
                <li onClick={() => setStyleIndex(0)}>
                  <RadioBtn value={styleIndex === 0} />
                  <span>심플 다크 블루</span>
                </li>
                <li onClick={() => setStyleIndex(1)}>
                  <RadioBtn value={styleIndex === 1} />
                  <span>핑크 포인트</span>
                </li>
              </ul>
            </div>

            <div className="export-btn-wrapper">
              <button className="round-red-btn" onClick={onSave}>
                저장하기
              </button>
              <button className="round-red-btn" onClick={onShare}>
                공유하기
              </button>
            </div>
          </RoundContainer>
        </div>
      </div>

      {alertShow && (
        <BtnModal
          title={alertMsg?.title}
          msg={alertMsg?.msg}
          setShow={setAlertShow}
          btns={[{name: "닫기", onClick: () => setAlertShow(false)}]}
        />
      )}
      {showGuide && <ExportUserGuide setShow={setShowGuide} />}
      {showShareModal && (
        <ShareModal
          setShow={setShowShareModal}
          link={`${window.location.origin}/share?id=${pf.pfUuid}`}
          title={pf?.pfName}
          isShared={pf?.pfShare || false}
        />
      )}
    </div>
  );
}
