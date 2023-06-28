/* eslint-disable react/prop-types */
import "./SearchBox.css";

export default function SearchBox({ handleSearchChange, number }) {
  return (
    <div className="search-box_container">
      <p className="number">{number}</p>
      <input
        type="search"
        placeholder="Filter podcasts..."
        onChange={handleSearchChange}
        className="search-box"
      />
    </div>
  );
}
