import React from "react";
const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchInput;
