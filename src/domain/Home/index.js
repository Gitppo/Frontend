import Button from "../../components/Button";
import "./style.css";

function Home() {
  return (
    <div className={"home"}>
      <Button className={"home-login-button"}>깃 헙 로그인</Button>

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
      <div className={"home-background-title"}>깃-포</div>
    </div>
  );
}

export default Home;
