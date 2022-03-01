import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import "./style.css";
import {useUserContext} from "../../hooks/useUserContext";

const blueHeader = [
  "/",
  "/agree",
  "/mypage",
  "/loading",
  "/error/404-not-found",
];

function Header() {
  const location = useLocation(),
    [path, setPath] = useState(),
    [isHome, setIsHome] = useState(true),
    {user} = useUserContext();

  useEffect(() => {
    setPath(location.pathname);
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  return (
    <header
      className={
        blueHeader.includes(path)
          ? "header-background-color1"
          : "header-background-color2"
      }
    >
      <div>
        <div className={"button-container"}>
          <Link to={"/"}>
            <span style={{opacity: isHome ? 1 : 0.3}}>홈</span>
          </Link>
          <Link to={"/my-page"}>
            <span style={{opacity: isHome ? 0.3 : 1}}>마이페이지</span>
          </Link>
        </div>
        <div>{user?.githubUserName ? `${user?.githubUserName}님` : ""}</div>
      </div>
    </header>
  );
}

export default Header;
