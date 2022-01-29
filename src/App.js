import "./App.css";

import {BrowserRouter, Route, Switch} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AskBtn from "./components/AskBtn";

import YesNoPopup from "./components/Modal/YesNoPopup";
import ChoicePopup from "./components/Modal/ChoicePopup";

import Home from "./domain/Home";
import Agreement from "./domain/Agree";
import GitRepo from "./domain/GitRepo";
import GitRepoDetail from "./domain/GitRepoDetail";
import Loading from "./domain/Loading";
import Mypage from "./domain/Mypage";
import InfoInput from "./domain/InfoInput";
import Error from "./domain/Error";
import PortfolioConsole from "./domain/PortfolioConsole/index";

function App() {
  return (
    <BrowserRouter>
      {/* 헤더 */}
      <Header />

      {/* 통일 양식 적용 */}
      <div className={"container"}>
        <AskBtn />
        <Switch>
          {/* TOOD : URL 정리 */}
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/agree"} component={Agreement} />
          <Route exact path={"/my-page"} component={Mypage} />

          <Route exact path={"/loading"} component={Loading} />

          <Route exact path={"/git-repo"} component={GitRepo} />
          <Route exact path={"/git-repo-detail"} component={GitRepoDetail} />
          <Route exact path={"/git-info"} component={InfoInput} />

          <Route exact path={"/git-console"} component={PortfolioConsole} />

          <Route exact path={"/YesNoPopup"} component={YesNoPopup} />
          <Route exact path={"/ChoicePopup"} component={ChoicePopup} />

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
