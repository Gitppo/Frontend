import "./style.css";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useUserContext} from "../../hooks/useUserContext";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";

const blueHeader = [
  "/",
  "/agree",
  "/mypage",
  "/loading",
  "/error/404-not-found",
];

function Header() {
  const location = useLocation();
  const history = useHistory();

  const {user, setUser} = useUserContext();

  const [path, setPath] = useState();
  const [isHome, setIsHome] = useState(true);

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
        <div>
          <Link to={"/"}>
            <span style={{opacity: isHome ? 1 : 0.3}}>홈</span>
          </Link>
          {user?.githubUserName ? (
            <>
              <Link to={"/my-page"}>
                <span style={{opacity: isHome ? 0.3 : 1}}>마이페이지</span>
              </Link>
              <span style={{opacity: 0.3, cursor: "pointer"}} onClick={logout}>
                로그아웃
              </span>
            </>
          ) : (
            <>
              <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${window.location.origin}/callback`}
              >
                <span style={{opacity: isHome ? 0.3 : 1}}>마이페이지</span>
              </a>
            </>
          )}
        </div>

        {user?.githubUserName ? (
          <div>
            <span>{user?.githubUserName}님</span>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}

export default Header;
