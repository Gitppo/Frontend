import "./App.css";

import {BrowserRouter, Route, Switch} from "react-router-dom";
import UserContextProvider from "./hooks/useUserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import AskBtn from "./components/Btn/AskBtn";
import ProgressModal from "./components/Modal/ProgressModal";

import Home from "./domain/Home";
import Agreement from "./domain/Agree";
import Mypage from "./domain/Mypage";
import New from "./domain/New/index";
import Export from "./domain/Export";
import Share from "./domain/Share";
import Callback from "./domain/Callback";
import Error from "./domain/Error";

function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {/* 헤더 */}
          <Header />

          {/* 통일 양식 적용 */}
          <div className={"container"}>
            <AskBtn />

            <Switch>
              <Route exact path={"/"} component={Home} />
              <Route path={"/callback/:toURL?"} component={Callback} />

              <Route exact path={"/agree"} component={Agreement} />
              <Route exact path={"/my-page"} component={Mypage} />

              <Route path={"/new"} component={New} />
              <Route exact path={"/export/:pfID?"} component={Export} />

              <Route path={"/share"} component={Share} />

              <Route path={"/error"} component={Error} />
              <Route component={Error} />
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
