const SearchBar = ({ searchQuery, onSearchChange, placeholder }) => (
  <input
    type="text"
    className="form-control"
    placeholder={placeholder}
    value={searchQuery}
    onChange={onSearchChange}
  />
);

export default SearchBar;
