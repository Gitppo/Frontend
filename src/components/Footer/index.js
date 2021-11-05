import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import "./style.css";

function Footer() {
  const location = useLocation();
  const [bgColor, setBgColor] = useState("#002D84");
  useEffect(() => {
    if (location.pathname === "/") setBgColor("white");
    else setBgColor("#002D84");
  }, [location.pathname]);

  return (
    <footer style={{backgroundColor: bgColor}}>
      <div>
        <span>@2021 Project Gitppo Corp.</span>
        <span>
          기업 광고 문의 & 오류 신고 전용 메일{" "}
          <a className={"link"} href={"mailto:gitppo@gmail.com"} >
            gitppo@gmail.com
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
