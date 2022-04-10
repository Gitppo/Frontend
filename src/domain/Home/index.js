import "./style.css";
import {useCallback, useEffect, useState} from "react";

import {loginBack} from "../../hooks/login";
import {isValidUser, useUserContext} from "../../hooks/useUserContext";

const btnMainColor = "#002d84";
const remToPx = (rem) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

function Home() {
  const {user} = useUserContext();

  const [rem4, rem8, rem12] = [remToPx(4), remToPx(8), remToPx(12)];
  const [btnStyle, setBtnStyle] = useState({
    marginTop: `${rem4}px`,
    background: btnMainColor,
  });

  const isValid = useCallback(() => {
    return isValidUser(user);
  }, [user]);

  const onHomeScroll = useCallback(() => {
    const scrolled = window.scrollY;

    if (scrolled >= rem12) {
      setBtnStyle({...btnStyle, background: "white", color: btnMainColor});
    } else {
      setBtnStyle({...btnStyle, background: btnMainColor, color: "white"});
    }

    if (scrolled < rem8) {
      setBtnStyle({
        ...btnStyle,
        marginTop: `${rem4 - scrolled}px`,
      });
    }
  }, [btnStyle, rem4, rem8, rem12]);

  useEffect(() => {
    window.addEventListener("scroll", onHomeScroll);
    return () => {
      window.removeEventListener("scroll", onHomeScroll);
    };
  }, [onHomeScroll]);

  return (
    <div className={"home"} id="home">
      <div
        onClick={() => loginBack()}
        style={isValid() ? {visibility: "hidden"} : btnStyle}
        className={"home-login-button round-btn"}
      >
        깃 헙 로그인
      </div>

      <div className={"home-intro-wrapper"}>
        <div className={"left"}>
          <h1 className={"home-intro-title"}>깃포가 뭔가요?</h1>
          <ul className="intro-item-wrapper">
            <li>
              <h4>Gitppo = Git + portfolio</h4>
              <div>
                깃포는 깃헙(Github) 연동을 통해 포트폴리오를 자동으로
                완성시켜주는 서비스예요
                <br />
                깃포와 함께하면 미적 감각과 시간이 없어도, 예쁘고 눈에 띄는
                포트폴리오를 만들 수 있어요
              </div>
            </li>
            <li>
              <h4>왜 깃포를 써야 하나요?</h4>
              <div>
                1! 깃헙 계정으로 로그인하고,
                <br />
                2! 추가 정보만 입력하면,
                <br />
                3! 자동으로 눈에 띄는 예쁜 포트폴리오가 완성!
              </div>
            </li>
            <li>
              <h4>아, 맞아!</h4>
              <div>
                저희의 귀여운 토이 프로젝트
                <br />
                깃포에 대한 피드백은 언제든 환영입니다 😉
                <br />
                사이트 곳곳에 숨겨진 깃포를 운영하는 🦛🦛의 소개도 찾아보세요!
              </div>
            </li>
          </ul>
        </div>

        <div className={"right"}>
          <h1 className={"home-intro-title"}>어떻게 써요?</h1>
          <ul className="grid-box">
            <li>
              <h3 className="item-title">STEP 1</h3>
              <div>
                Github 아이디로 로그인!
                <br />
                아쉽지만 github가 없다면 이용할 수 없어요 🥲
              </div>
            </li>
            <li>
              <h3 className="item-title">STEP 2</h3>
              <div>
                포트폴리오 추가 버튼을 ❗️CLICK❗️ 이미 존재하는 포트폴리오를
                수정할 경우 리스트에서 선택하고 내용 입력!
              </div>
            </li>
            <li>
              <h3 className="item-title">STEP 3</h3>
              <div>
                이제 개인 정보를 입력할 차례! 학력, 경력 등 넣으면 좋은 정보를
                입력해주세요
                <br />
                이전 포트폴리오에서 데이터를 가져올 수도 있어요 😉
              </div>
            </li>
            <li>
              <h3 className="item-title">STEP 4</h3>
              <div>
                마지막으로 포트폴리오의 템플릿을 선택하면 완료 🙆‍♂️ 링크를
                공유할지도 선택할 수 있어요
                <br />
                🦛 생성한 포트폴리오를 자소서에 추가하거나 서로 공유해보세요 🦛
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={"large-text-back"}>깃-포</div>
    </div>
  );
}

export default Home;
