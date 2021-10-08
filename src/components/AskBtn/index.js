import "./style.css";

function AskBtn() {
  return (
    <button id={"ask-button"}>
      <span>문의하기</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.76 104.2">
        <path
          className="cls-1"
          d="M336.31,274c-33.43-5.34-56.31,36.11-47.12,64.26,2.57,7.42,7.7,13.58,14.29,18.29.4,5.72-.83,14.87-11.14,20.6,0,0,23.24,4.52,30.75-11.74,20.11,5.07,43.23.75,53.61-15.52C376.7,349.86,409.14,285.6,336.31,274Z"
          transform="translate(-287.14 -273.5)"
        />
      </svg>
    </button>
  );
}

export default AskBtn;
