// import { useEffect } from 'react';
// import qs from 'qs';
// import Loader from './Loader';

// export default function LoginCallBack({ history, location }) {
//   const authUri = `${process.env.REACT_APP_BACKEND}/oauth2/authorization/github`;

//   useEffect(() => {
//     const getToken = async () => {
//       const { code } = qs.parse(location.search, {
//         ignoreQueryPrefix: true,
//       });

//       try {
//         const response = await fetch(`${authUri}?code=${code}`);
//         const data = await response.json();

//         localStorage.setItem('token', data.jwt);
//         localStorage.setItem('ProfileURL', data.avatar_url);

//         history.push('/');
//       } catch (error) {}
//     };

//     getToken();
//   }, [location, history, authUri]);

//   return <Loader />;
// };

import axios from "axios";
import {setCookie} from "./useCookies";

export const loginGithub = async () => {
  // axios
  //   .post(
  //     `${process.env.REACT_APP_BACKEND}/oauth2/authorization/github`,
  //     {},
  //     {
  //       origin: process.env.REACT_APP_BACKEND,
  //     }
  //   )
  //   .then((r) => console.log(r))
  //   .then((data) => {
  //     const {accessToken} = data;
  //     // accessToken 설정
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  //     // accessToken 만료하기 1분 전에 로그인 연장
  //     // setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000);
  //   });

  axios.defaults.headers.common["Authorization"] =
    "Bearer 0FA6549A677CD80C345AB5831261BCE6";
  setCookie("JSESSIONID", "0FA6549A677CD80C345AB5831261BCE6");
  // JSESSIONID: E5742A5164139981840E51A772EDF319
};

// const JWT_EXPIRY_TIME = 24 * 3600 * 1000; // 만료 시간 (24시간 밀리 초로 표현)
