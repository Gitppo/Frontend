import {useHistory} from "react-router-dom";

function Error404() {
  // URL 변환
  const history = useHistory();
  if(history.location.pathname !== '/error/404-not-found') {
    history.push('error/404-not-found');
  }
  // 렌더링
  else return (
    <div>
      <div className={"large-text-front"}>
        <div>404</div>
        <div>NOT FOUND</div>
      </div>
    </div>
  );
}

export default Error404;
