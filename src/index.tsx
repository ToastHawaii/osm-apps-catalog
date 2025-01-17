import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
 <div id="content">
    <header className="page-header">
      <label style={{float: "right",margin: "10px"}}><input type="checkbox" id="free"/>
        <span id="freeDisplay">Free</span></label><select id="category"
              style={{width: "228px", float: "right", margin: "4px"}}></select>
      <h1 style={{clear: "both", margin: "0"}}>
        <i id="loading" className="fas fa-spinner fa-pulse"></i> <a href="/" style={{color:"#333"}}>OSM
          Apps Catalog</a>
        <a id="about" className="info" href="/docs/" title="About"><i
             className="fas fa-info-circle"></i></a>
      </h1>
      <p className="description" style={{margin: "5px 10px 10px"}}></p>
      <input type="search" id="search" className="filter hidden" placeholder="Search" autoComplete="on"
             list="search-suggestions" />
      <datalist id="search-suggestions"></datalist>&#32;
      <button id="more-filters" className="filter hidden">Filters</button>
      <span className="advanced-filter" style={{display: "none"}}>
        <select id="topic" className="filter hidden" multiple></select>
        <select id="platform" className="filter hidden" multiple></select>
        <select id="language" className="filter hidden" multiple></select>
        <select id="coverage" className="filter hidden" multiple></select>
      </span>
      <hr style={{border: "1px solid #ccc"}}/>
      <form id="view" className="hidden" style={{margin: "10px 0"}}>
        <label htmlFor="listView" className="radio-btn"><input type="radio" id="listView" name="view"
                 value="List" checked={true}/><span><i className="fas fa-th"></i>
            <span id="listText">List</span></span></label><label htmlFor="compareView"
               className="radio-btn"><input type="radio" id="compareView" name="view"
                 value="Compare"/><span><i className="fas fa-bars fa-rotate-90"></i> <span
                  id="compareText">Compare</span></span></label>
      </form>
    </header>
    <main>
      <div id="list"></div>
      <div id="compare" className="table"></div>
    </main>
  </div>
  </React.StrictMode>
);
