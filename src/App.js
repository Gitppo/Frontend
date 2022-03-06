import "./App.css";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserContextProvider from "./hooks/useUserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AskBtn from "./components/Btn/AskBtn";

import Home from "./domain/Home";
import Agreement from "./domain/Agree";
import Mypage from "./domain/Mypage";
import Error from "./domain/Error";
import PortfolioConsole from "./domain/PortfolioConsole/index";
import Callback from "./domain/Callback";
import New from "./domain/New/index";
import ProgressModal from "./components/Modal/ProgressModal";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          {/* 헤더 */}
          <Header />

          {/* 통일 양식 적용 */}
          <div className={"container"}>
            <AskBtn />

            <Switch>
              {/* TOOD : URL 정리 */}
              <Route exact path={"/"} component={Home} />
              <Route path={"/callback/:toURL?"} component={Callback} />

              <Route exact path={"/agree"} component={Agreement} />
              <Route exact path={"/my-page"} component={Mypage} />

              <Route path={"/new"} component={New} />

              <Route exact path={"/export"} component={PortfolioConsole} />

              <Route path={"/error"} component={Error} />
              <Route path={"*"} component={Error} />
            </Switch>
          </div>

          {/* 푸터 */}
          <Footer />
        </BrowserRouter>
      </UserContextProvider>

      <ProgressModal />
    </>
  );
}

export default App;
