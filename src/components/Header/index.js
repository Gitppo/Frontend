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

  const [headerColor, setHeaderColor] = useState("#0046d0");
  const [curMenu, setCurMenu] = useState(1);

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
            <Link to={"/"}>홈</Link>
          </span>

          {isValid() ? (
            <>
              <span style={{opacity: curMenu === 2 ? 1 : 0.3}}>
                <Link to={"/my-page"}>마이페이지</Link>
              </span>
              <span style={{opacity: 0.3, cursor: "pointer"}} onClick={logout}>
                로그아웃
              </span>
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
        {isValid() && <div className="user">{user?.githubUserName}님</div>}
      </div>
    </header>
  );
}

export default Header;
