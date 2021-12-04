import {useLocation} from "react-router";

function Error404() {
  const location = useLocation();
  if (location.pathname !== "/error/git-load-fail")
    return (
      <>
        <div className={"large-text-front"}>
          <div>404</div>
          <div>NOT FOUND</div>
        </div>
      </>
    );
  else return <></>;
}

export default Error404;
