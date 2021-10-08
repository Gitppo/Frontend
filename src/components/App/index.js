import {BrowserRouter, Route} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../../domain/Home";
import Agreement from "../../domain/Agreement";
import GitRepo from "../../domain/GitRepo";
import Loading from "../../domain/Loading";
import Mypage from "../../domain/Mypage";
import InfoInput from "../../domain/InfoInput";
import Popup1 from "../../domain/Popup/Popup1";
import Popup2 from "../../domain/Popup/Popup2";

import "./style.css";

function App() {
  return (
    <BrowserRouter>
      {/* 헤더 */}
      <Header />

      {/* 통일 양식 적용 아님 */}
      <div>
        <Route exact path={"/"} component={Home} />
      </div>

      {/* 통일 양식 적용 */}
      <div className={"container"}>
        <Route exact path={"/agree"} component={Agreement} />
        <Route exact path={"/mypage"} component={Mypage} />

        <Route exact path={"/loading"} component={Loading} />

        <Route exact path={"/gitrepo"} component={GitRepo} />
        <Route exact path={"/infoinput"} component={InfoInput} />
        <Route exact path={"/popup1"} component={Popup1} />
        <Route exact path={"/popup2"} component={Popup2} />
      </div>

      {/* 푸터 */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
