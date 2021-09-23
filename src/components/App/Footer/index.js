import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import "./style.css";

function Footer() {
  const history = useHistory();
  const [bgColor, setBgColor] = useState("#002D84");
  useEffect(() => {
    if (history.location.pathname === "/") setBgColor("white");
    else setBgColor("#002D84");
  }, [history]);

  return (
    <footer style={{backgroundColor: bgColor}}>
      <div className={"container"}>
        <div>
          <span>@2021 Project Gitppo Corp.</span>
          <span>
            기업 광고 문의 & 오류 신고 전용 메일{" "}
            <a href={"mailto:gitppo@gmail.com"} className={"link"}>
              gitppo@gmail.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
