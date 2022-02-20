import {useState} from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";
import {loginGithub} from "../../hooks/loginGithub";
import "./style.css";

const btnMainColor = "#002d84";
const remToPx = (rem) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

function Home() {
  const history = useHistory();

  const [rem4, rem6, rem8] = [remToPx(4), remToPx(6), remToPx(8)];
  const [btnStyle, setBtnStyle] = useState({
    marginTop: `${rem6}px`,
    background: btnMainColor,
  });

  const onHomeScroll = (e) => {
    const scrolled = e.target.scrollTop;
    if (scrolled >= rem8)
      setBtnStyle({...btnStyle, background: "white", color: btnMainColor});
    else if (scrolled < rem8)
      setBtnStyle({...btnStyle, background: btnMainColor, color: "white"});
    if (scrolled < rem4)
      setBtnStyle({...btnStyle, marginTop: `${rem6 - scrolled}px`});
  };

  const login = async () => {
    await loginGithub();
    history.push("/my-page");
  };

  return (
    <div className={"home"} onScroll={onHomeScroll}>
      <button
        className={"home-login-button round-button"}
        style={btnStyle}
        onClick={login}
      >
        깃 헙 로그인
      </button>

      <div className={"home-intro-wrapper"}>
        <div className={"home-intro-card"} id={"left"}>
          <h1 className={"home-intro-title"}>깃포가 뭔가요?</h1>
          <div>깃포는 어쩌구저쩌구 어쩌구 저쩌구 입니다.</div>
        </div>
        <div className={"home-intro-card"} id={"right"}>
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
