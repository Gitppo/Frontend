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
          <div>깃포는 어쩌구저쩌구 어쩌구 저쩌구 입니다.</div>
        </div>
        <div className={"right"}>
          <h1 className={"home-intro-title"}>어떻게 써요?</h1>
          <div>
            <div>Step 1 깃포는 어쩌구저쩌구 어쩌구 저쩌구 입니다.</div>
            <div>Step 2 깃포는 어쩌구저쩌구 어쩌구 저쩌구 입니다.</div>
          </div>
        </div>
      </div>
      <div className={"large-text-back"}>깃-포</div>
    </div>
  );
}

export default Home;
