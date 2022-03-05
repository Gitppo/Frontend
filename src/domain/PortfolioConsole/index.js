import "./style.css";
import {useState} from "react";
import {useHistory} from "react-router-dom";

import RadioBtn from "../../components/Btn/RadioBtn";
import BeforeAfterBtn from "../../components/Btn/BeforeAfterBtn";

import Portfolio1 from "../../components/Portfolio/Portfolio1";
import Portfolio2 from "../../components/Portfolio/Portfolio2";
import {useLocation} from "react-router-dom";

export default function PortfolioConsole() {
  const location = useLocation();
  const history = useHistory();

  const pInfo = {
    title: "2021 조깃포 삼성 포트폴리오",
  };

  const [pStyleIndex, setPStyleIndex] = useState(0);

  const onPrev = () => {
    history.push("/new/3", {...location.state});
  };

  return (
    <div className="portfolio-console">
      <BeforeAfterBtn saveShow={false} nextShow={false} onPrev={onPrev} />

      <div className="title-wrapper">
        <h2 className="title">{pInfo?.title}</h2>
        <div className="title-btn-wrapper">
          <button className="round-button">추출하기</button>
          <button className="round-button">공유하기</button>
        </div>
      </div>

      {/* 제목 아래 부분 */}
      <div className="portfolio-console-body">
        {/* 미리보기 창 */}
        <div className="preview-section">
          {pStyleIndex === 0 ? (
            <Portfolio1 pInfo={pInfo} />
          ) : pStyleIndex === 1 ? (
            <Portfolio2 pInfo={pInfo} />
          ) : (
            <></>
          )}
        </div>

        {/* 템플릿 콘솔 창 */}
        <div className="console-section">
          <div className="title-section">템플릿 선택</div>
          <ul className="template-choice-wrapper">
            <li className="template-choice">
              <RadioBtn />
              심플 다크 블루
            </li>
            <li className="template-choice">
              <RadioBtn />
              핑크 포인트
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
