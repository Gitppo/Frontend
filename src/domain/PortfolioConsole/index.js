import "./style.css";
import {useState} from "react";
import PortfolioBlueGray from "../../components/Portfolio/PortfolioBlueGray/index";
import PortfolioBluePink from "../../components/Portfolio/PortfolioBluePink/index";
import RadioBtn from "../../components/RadioBtn/index";

export default function PortfolioConsole() {
  const pInfo = {
    title: "2021 조깃포 삼성 포트폴리오",
  };

  const [pStyleIndex, setPStyleIndex] = useState(0);

  return (
    <div className="portfolio-console">
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
            <PortfolioBlueGray pInfo={pInfo} />
          ) : pStyleIndex === 1 ? (
            <PortfolioBluePink pInfo={pInfo} />
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
