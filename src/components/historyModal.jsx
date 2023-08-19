import React from "react";
import HistorySection from "./historySection";

const HistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="tab-cont">
          <i class="fas fa-history"></i>History
          <div onClick={onClose}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <HistorySection />
      </div>
    </div>
  );
};

export default HistoryModal;
