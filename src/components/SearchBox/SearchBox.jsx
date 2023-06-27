import "./SearchBox.css";

export default function SearchBox(handleSearchChange) {
  return (
    <div className="search-box_container">
      <input
        type="search"
        placeholder="Filter podcasts..."
        onChange={handleSearchChange}
        className="search-box"
      />
    </div>
  );
}
