import "./style.css";

import {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import qs from "qs";
import {getSharedPortfoilo} from "../../hooks/portfolio";
import Portfolio1 from "../../components/Portfolio/Portfolio1";
import Portfolio2 from "../../components/Portfolio/Portfolio2";

export default function Share() {
  const history = useHistory();
  const location = useLocation();

  const [pf, setPf] = useState({});
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    const {id} = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    getSharedPortfoilo(id)
      .then((r) => {
        r.repo =
          r?.repo?.map((e) => {
            // language sum
            let total = 0;
            let langArr = [];
            for (let i in e?.rpLanguages) {
              total += e?.rpLanguages[i];
              langArr.push({
                lang: i,
                val: e?.rpLanguages[i],
              });
            }

            // 비율 계산
            for (let i = 0; i < langArr.length; i++) {
              langArr[i].perc = ((langArr[i].val / total) * 100).toFixed(1);
            }
            // 비율을 내림차순으로 정렬
            langArr.sort((a, b) => b.perc - a.perc);
            return {...e, lang: langArr};
          }) || [];

        setPf(r);
        setStyleIndex(r?.pfTemplate || 0);
      })
      .catch((e) => {
        console.error(e);
        history.push("/error");
      });
  }, [history, location.search]);

  return (
    <div className="share">
      {/* 미리보기 창 */}
      {styleIndex === 0 ? (
        <Portfolio1 pInfo={pf} />
      ) : styleIndex === 1 ? (
        <Portfolio2 pInfo={pf} />
      ) : (
        <></>
      )}
    </div>
  );
}
