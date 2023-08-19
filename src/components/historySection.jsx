import { useEffect, useState } from "react";

const HistorySection = () => {
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    const oldHistoryArray = JSON.parse(localStorage.getItem("calcHis"));
    console.log("adsf", oldHistoryArray);
    if (oldHistoryArray) {
      setHistoryArray(oldHistoryArray);
    }
  }, []);

  const onClearLocalStorage = () => {
    localStorage.removeItem("calcHis");
    setHistoryArray([]);
  };

  return (
    <div className="relative">
      <div className="overflowAuto">
        {historyArray.map((item, index) => (
          <div key={`his-${index}`} className="historyItemCont">
            <div className="historyTextArea">{item.aTextAreaValue}</div>
            <div className="historyInput">{item.aInputValue}</div>
          </div>
        ))}
      </div>
      <button className="clrBtn" onClick={onClearLocalStorage}>
        <i className="fas fa-trash"></i>
        <span className="marginLeft10">Clear</span>
      </button>
    </div>
  );
};

export default HistorySection;
