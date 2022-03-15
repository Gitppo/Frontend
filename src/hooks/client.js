import axios from "axios";

let progress = 0; // 0 ~ 100, 요청 진행률
let timerId = null; // timer id
let showProgress = true;

const setProgress = (val) => {
  progress = val;
  window.onprogress(val);
};

const timer = () => {
  if (progress < 98) {
    const diff = 100 - progress;
    const inc = diff / (10 + progress * (1 + progress / 100)); // 증가값
    setProgress(progress + inc);
  }
  timerId = setTimeout(timer, 50); // 50 ms 단위로 timer 재귀호출
};

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  timeout: 1 * 60 * 1000,
});

const progressClient = (show = true) => {
  showProgress = show;

  return client;
};

client.interceptors.request.use(
  (config) => {
    if (showProgress) {
      setProgress(0);
      timer();
    }
    return config;
  },
  (error) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    setProgress(100);

    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    setProgress(100);

    if (response.status !== 200) {
      throw Error(
        `NetErr : API response is not 200. : ${response?.statusText}`
      );
    }
    return response.data;
  },
  (error) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    setProgress(100);

    return Promise.reject(error);
  }
);

export default progressClient;
