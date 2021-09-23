import {Link} from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header>
      <div className={"container"}>
        <div>
          <div className={"button-container"}>
            <Link to={"/"}>홈</Link>
            <Link to={"/mypage"}>마이페이지</Link>
          </div>
          <div>로그인 정보</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
