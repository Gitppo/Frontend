import "./style.css";

import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "../../domain/Home";
import Agreement from "../../domain/Agree";
import GitRepo from "../../domain/GitRepo";
import Loading from "../../domain/Loading";
import Mypage from "../../domain/Mypage";
import InfoInput from "../../domain/InfoInput";
import Popup1 from "../Popup1";
import Popup2 from "../Popup2";
import Error from "../../domain/Error";
import AskBtn from "../AskBtn";

function App() {
  return (
    <BrowserRouter>
      {/* 헤더 */}
      <Header />

      {/* 통일 양식 적용 */}
      <div className={"container"}>
        <AskBtn />
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/agree"} component={Agreement} />
          <Route exact path={"/mypage"} component={Mypage} />

          <Route exact path={"/loading"} component={Loading} />

          <Route exact path={"/gitrepo"} component={GitRepo} />
          <Route exact path={"/infoinput"} component={InfoInput} />

          <Route exact path={"/popup1"} component={Popup1} />
          <Route exact path={"/popup2"} component={Popup2} />

          <Route path={"/error"} component={Error} />
          <Route path={"*"} component={Error} />
        </Switch>
      </div>

      {/* 푸터 */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
