import React from "react";
import "./arrow.style.css";
//----------Icons----------
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";

const Arrow = ({ handlerPageclick }) => {
  return (
    <div className="paged-pokemon">
      <div className="arrow-btn">
        <button className="arrow-left" name="prev" onClick={handlerPageclick}>
          <VscChevronLeft className="icon-left" />
        </button>
        <button className="arrow-rigth" name="next" onClick={handlerPageclick}>
          <VscChevronRight className="icon-right" />
        </button>
      </div>
    </div>
  );
};

export default Arrow;
