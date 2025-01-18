import React from "react";

export function ViewSelect() {
  return (
    <form
      id="view"
      className="hidden"
      style={{
        margin: "10px 0",
      }}
    >
      <label htmlFor="listView" className="radio-btn">
        <input
          type="radio"
          id="listView"
          name="view"
          value="List"
          checked={true}
        />
        <span>
          <i className="fas fa-th"></i>
          <span id="listText">List</span>
        </span>
      </label>
      <label htmlFor="compareView" className="radio-btn">
        <input type="radio" id="compareView" name="view" value="Compare" />
        <span>
          <i className="fas fa-bars fa-rotate-90"></i>{" "}
          <span id="compareText">Compare</span>
        </span>
      </label>
    </form>
  );
}
