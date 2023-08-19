import { useState } from "react";
import HistoryModal from "./historyModal";
import HistorySection from "./historySection";

const Main = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [shouldPressC, setShouldPressC] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistSect, setShowHistSect] = useState(false);

  const openModal = () => {
    if (window.innerWidth < 576) {
      setIsModalOpen(true);
    } else {
      setShowHistSect(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputValueChange = (e) => {
    if (shouldPressC) {
      return;
    }

    const newValue = e.target.value;
    if (/^[0-9]*$/.test(newValue)) {
      setInputValue(newValue);
    }
  };

  const onCClick = () => {
    setInputValue("");
    setTextAreaValue("");
    setShouldPressC(false);
  };

  const handleOperationClick = (operation) => {
    if (!inputValue.length || shouldPressC) {
      return;
    }

    const newOperationString = inputValue + " " + operation + " ";

    setTextAreaValue(
      (oldTextAreaValue) => oldTextAreaValue + newOperationString
    );

    setInputValue("");
  };

  const updateLocalStorage = (aTextAreaValue, aInputValue) => {
    const oldHistoryArray = JSON.parse(localStorage.getItem("calcHis"));

    const newHistoryArray = [];
    if (oldHistoryArray) {
      newHistoryArray.push(...oldHistoryArray);
    }

    newHistoryArray.push({
      aTextAreaValue: aTextAreaValue,
      aInputValue: aInputValue
    });

    localStorage.setItem("calcHis", JSON.stringify(newHistoryArray));
  };

  const processResult = () => {
    if (!inputValue.length || !textAreaValue.length || shouldPressC) {
      return;
    }
    const newOperationString = inputValue + " = ";
    const oldTextAreaValue = textAreaValue;
    const newTextAreaValue = oldTextAreaValue + newOperationString;
    const result = eval(oldTextAreaValue + inputValue);

    updateLocalStorage(newTextAreaValue, result);
    setTextAreaValue(newTextAreaValue);
    setInputValue(result);
    setShouldPressC(true);
  };
  return (
    <div className="flexRow">
      <div className="mainLeftSection">
        <div className="flex-start-center">
          <div className="hamburger" onClick={openModal}>
            <i className="fas fa-bars"></i>
          </div>
          <h1>Standard</h1>
        </div>
        <div className="calculator">
          <textarea
            className="display"
            id="displayTextArea"
            readonly
            disabled
            value={textAreaValue}
          ></textarea>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputValueChange(e)}
            id="displayInput"
            readonly
          />
          <div className="buttons">
            <button
              className={shouldPressC ? "focusBtn" : "button"}
              onClick={onCClick}
            >
              C
            </button>
            <button className="button" onClick={() => setInputValue("")}>
              CE
            </button>
            <button
              className="button"
              onClick={() => setInputValue(inputValue.slice(0, -1))}
            >
              Back
            </button>
            <button
              className="button"
              onClick={() => handleOperationClick("/")}
            >
              /
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 7);
              }}
            >
              7
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 8);
              }}
            >
              8
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 9);
              }}
            >
              9
            </button>

            <button
              className="button"
              onClick={() => handleOperationClick("*")}
            >
              *
            </button>

            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 4);
              }}
            >
              4
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 5);
              }}
            >
              5
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 6);
              }}
            >
              6
            </button>

            <button
              className="button"
              onClick={() => handleOperationClick("-")}
            >
              -
            </button>

            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 1);
              }}
            >
              1
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 2);
              }}
            >
              2
            </button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 3);
              }}
            >
              3
            </button>
            <button
              className="button"
              onClick={() => handleOperationClick("+")}
            >
              +
            </button>
            <button className="button">.</button>
            <button
              className="button"
              onClick={() => {
                !shouldPressC && setInputValue((oldValue) => oldValue + 0);
              }}
            >
              0
            </button>
            <button className="button" onClick={processResult}>
              =
            </button>
          </div>
        </div>
        {isModalOpen && (
          <HistoryModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
      {showHistSect && (
        <div className="mainRightSection">
          <div className="tab-cont">
            <h1>
              <i class="fas fa-history"></i> History
            </h1>
          </div>
          <HistorySection />
        </div>
      )}
    </div>
  );
};

export default Main;
