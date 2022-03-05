import {send} from "@emailjs/browser";

export const sendEmailJS = (user, email, msg) => {
  // 이메일 전송
  return send(
    process.env.REACT_APP_EMAIL_SERVICE_ID,
    process.env.REACT_APP_EMAIL_TEMPLATE_ID,
    {
      user_id: user.id || "비회원",
      user_name: user.githubUserName || "익명",
      user_email: email,
      message: msg,
    },
    process.env.REACT_APP_EMAIL_USER_ID
  )
    .then(
      (result) => {
        if (result.text !== "OK") {
          throw Error(`NetErr : Failed to Send Message : ${result.text}`);
        }
      },
      (error) => {
        throw Error(error.text);
      }
    )
    .catch((e) => {
      throw e;
    });
};
