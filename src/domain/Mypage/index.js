import "./style.css";
import {useHistory} from "react-router-dom";
import RoundContainer from "../../components/RoundContainer";
import Pin from "../../assets/pin-red.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {getCookie} from "../../hooks/useCookies";

function Mypage() {
  axios.defaults.withCredentials = false;

  const history = useHistory();
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "2021 조깃포 LG 포트폴리오",
      state: 0,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
    {
      id: 2,
      title: "2021 조깃포 삼성 포트폴리오",
      state: 0,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
    {
      id: 3,
      title: "2021 조깃포 현대 포트폴리오",
      state: 1,
      creation: "2021.04.04",
      revision: {
        date: "2021.05.05",
        time: "19:00",
      },
    },
  ]);

  const token = "35CEAEAF2CB5C61C9248869DA4A774F0";

  const [data, setData] = useState("");
  const getPortfolio = async () => {
    await axios
      .get("http://3.37.186.122:8080/api/term", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(data);
        console.log("통신 결과: ", res);
      })
      .catch((err) => console.log("에러 발생: ", err));
  };

  useEffect(() => {
    getPortfolio();
  }, []);

  function deletePortfolio(id) {
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].id === id) {
        portfolio.splice(i, 1);
        break;
      }
    }
    setPortfolio([...portfolio]);
  }

  const createPofol = () => {
    history.push("/git-repo");
  };

  useEffect(() => {
    console.log("GIT REPO");
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/repository`, {
        withCredentials: true,
        headers: {
          JSESSIONID: `${getCookie("JSESSIONID")}`,
        },
      })
      .then((r) => {
        console.log(r);
      });
  }, []);

  return (
    <div>
      <div className={"mypage-upper-box"}>
        <div className={"mypage-upper-box-left"}>
          <h3 className={"mypage-new-title"}>새로운 포트폴리오 생성</h3>
          <button className={"round-button"} onClick={createPofol}>
            바로가기
          </button>
        </div>

        <div className={"mypage-upper-box-right"}>
          <div className={"mypage-manage"}>
            <span>임시 저장 중인 포트폴리오</span>
            <span className={"beautiful-title"}>
              {portfolio?.filter((e) => e.state === 1).length}
            </span>
          </div>
          <div className={"mypage-manage"}>
            <span>최종 완성 포트폴리오</span>
            <span className={"beautiful-title"}>
              {portfolio?.filter((e) => e.state === 0).length}
            </span>
          </div>
        </div>
      </div>

      <RoundContainer>
        <h1 className={"beautiful-title"}>
          기존 포트폴리오 ({portfolio?.length})
        </h1>

        <ul className={"mypage-wrapper-box"}>
          {portfolio?.map((box, index) => (
            <li className={"mypage-wrapper"} key={index}>
              <img className={"pin-image"} src={Pin} alt={""} />
              <h4 className={"mypage-wrapper-box-title"}>{box.title}</h4>
              <div className={"mypage-wrapper-box-date"}>
                생성 {box.creation}
              </div>
              <div className={"mypage-wrapper-box-date"}>
                수정 {box.revision.date} {box.revision.time}
              </div>
              <div className={"mypage-wrapper-box-button"}>
                <button
                  className={"mypage-wrapper-box-button-left round-button"}
                >
                  수정
                </button>
                <button
                  className={"round-button"}
                  onClick={() => deletePortfolio(box.id)}
                >
                  삭제
                </button>
              </div>
            </li>
          ))}

          {portfolio?.length === 0 && (
            <h3 style={{textAlign: "center", color: "var(--dark-red)"}}>
              기존 포트폴리오가 없습니다.
            </h3>
          )}
        </ul>
      </RoundContainer>
    </div>
  );
}

export default Mypage;
