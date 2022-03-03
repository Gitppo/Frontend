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

  const [path, setPath] = useState();
  const [isHome, setIsHome] = useState(true);

  const isValid = useCallback(() => isValidUser(user), [user]);
  const logout = () => {
    setUser({id: -1, githubUserName: null});
    history.push("/");
  };

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
        {/* 메뉴 */}
        <div className="left">
          <span style={{opacity: isHome ? 1 : 0.3}}>
            <Link to={"/"}>홈</Link>
          </span>

          {isValid() ? (
            <>
              <span style={{opacity: isHome ? 0.3 : 1}}>
                <Link to={"/my-page"}>마이페이지</Link>
              </span>
              <span style={{opacity: 0.3, cursor: "pointer"}} onClick={logout}>
                로그아웃
              </span>
            </>
          ) : (
            <span
              style={{opacity: isHome ? 0.3 : 1}}
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
