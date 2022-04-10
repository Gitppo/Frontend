import "./style.css";

import {useCallback, useEffect, useState} from "react";
import {Link, useLocation, useHistory} from "react-router-dom";

import {isValidUser, useUserContext} from "../../hooks/useUserContext";
import {loginBack} from "../../hooks/login";

const blueHeader = [
  "/",
  "/agree",
  "/mypage",
  "/loading",
  "/error/404-not-found",
];

function Header() {
  const history = useHistory();
  const location = useLocation();

  const {user, setUser} = useUserContext();

  const [curMenu, setCurMenu] = useState(1);
  const [headerColor, setHeaderColor] = useState("#0046d0");
  const [showUserInfo, setShowUserInfo] = useState(false);

  const isValid = useCallback(() => isValidUser(user), [user]);
  const logout = () => {
    setUser({id: -1, githubUserName: null});
    history.replace("/", {});
  };

  useEffect(() => {
    const color = blueHeader.includes(location.pathname)
      ? "#0046d0"
      : "#0f2c7f";

    document.head.getElementsByTagName("meta")["theme-color"].content = color;
    setHeaderColor(color);

    if (location.pathname.indexOf("/error") === 0) {
      setCurMenu(0);
    } else if (location.pathname === "/") {
      setCurMenu(1);
    } else if (location.pathname === "/share") {
      setCurMenu(3);
    } else {
      setCurMenu(2);
    }
  }, [location.pathname]);

  return (
    <header style={{backgroundColor: headerColor}}>
      <div>
        {/* 메뉴 */}
        <div className="left">
          <span style={{opacity: curMenu === 1 ? 1 : 0.3}}>
            <Link to={"/"}>깃포</Link>
          </span>

          {isValid() ? (
            <>
              <span style={{opacity: curMenu === 2 ? 1 : 0.3}}>
                <Link to={"/my-page"}>마이페이지</Link>
              </span>
              {/* <span style={{opacity: 0.3, cursor: "pointer"}} onClick={logout}>
                로그아웃
              </span> */}
            </>
          ) : (
            <span
              style={{opacity: curMenu === 2 ? 1 : 0.3}}
              onClick={() => loginBack()}
            >
              마이페이지
            </span>
          )}
        </div>

        {/* 사용자 정보 */}
        {isValid() && (
          <div className="user" title={user?.githubUserName}>
            <span
              style={{cursor: "pointer"}}
              onClick={() => setShowUserInfo(!showUserInfo)}
            >
              {user?.name}님
            </span>

            <ul
              className="header-user-info"
              style={
                showUserInfo
                  ? {opacity: "1", transform: "scale(1)"}
                  : {opacity: "0", transform: "scale(0)"}
              }
            >
              <li>
                <span className="title">닉네임</span>
                <span>{user?.name}</span>
              </li>

              <li>
                <span className="title">깃허브</span>
                <span>
                  <a
                    href={`https://github.com/${user?.githubUserName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user?.githubUserName}
                  </a>
                </span>
              </li>

              <li>
                <span className="title">마지막 접속</span>
                <span>{user?.loginDate}</span>
              </li>

              <li className="last">
                <Link to="/my-page">
                  <span>마이페이지</span>
                </Link>
                <span style={{margin: "0 0.5em"}}>|</span>
                <span style={{cursor: "pointer"}} onClick={logout}>
                  로그아웃
                </span>
                <span style={{margin: "0 0.5em"}}>|</span>
                <span
                  style={{cursor: "pointer"}}
                  onClick={() => setShowUserInfo(false)}
                >
                  닫기
                </span>
              </li>

              {/* <li>
                <span>마지막 접속 {user?.loginDate}</span>
                <span>로그아웃</span>
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
