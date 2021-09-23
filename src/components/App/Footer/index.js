import "./style.css";

function Footer() {
  return (
    <footer>
      <div className={"container"}>
        <div>
          <span>@2021 Project Gitppo Corp.</span>
          <span>기업 광고 문의 & 오류 신고 전용 메일 <a href={"mailto:gitppo@gmail.com"} className={"link"}>gitppo@gmail.com</a></span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
