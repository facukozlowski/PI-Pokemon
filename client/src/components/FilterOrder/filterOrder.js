import React from "react";
import "./filterOrder.style.css";

const FilterOrder = ({ handlerOrderChange }) => {
  return (
    <div className="filter-order">
      <label>Order by:</label>
      <select
        defaultValue={"default"}
        onChange={(event) => handlerOrderChange(event.target.value)}
      >
        <option key={0} value={"default"}>
          Attack
        </option>
        <option key={1} value={1}>
          A-Z
        </option>
        <option key={2} value={2}>
          Z-A
        </option>
      </select>
    </div>
  );
};

export default FilterOrder;
