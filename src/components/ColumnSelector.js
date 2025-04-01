import React from 'react';

const ColumnSelector = ({ onSelectColumn }) => {
  const handleSelectionChange = (e) => {
    onSelectColumn(e.target.value);
  };

  return (
    <div>
      <label>Select Column: </label>
      <select onChange={handleSelectionChange}>
        <option value="Assignment Weightage Marks">Assignment Weightage Marks</option>
        <option value="MID Weightage Marks">MID Weightage Marks</option>
        <option value="Overall Marks">Overall Marks</option>
      </select>
    </div>
  );
};

export default ColumnSelector;