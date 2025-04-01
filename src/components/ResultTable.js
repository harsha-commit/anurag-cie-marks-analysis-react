import React from 'react';

const ResultTable = ({ results }) => {
  // Filter out rows where all values are zero
  const filteredResults = results.filter(
    result => result.above80 !== 0 || result.between60and80 !== 0 || result.between40and60 !== 0 || result.below40 !== 0
  );

  return (
    <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Name of the Subject</th>
          <th>Above 80% 16-20 Marks</th>
          <th>60% to 80% 12-15 Marks</th>
          <th>40% to 60% 8-11 Marks</th>
          <th>Less than 40% 0-7 Marks</th>
        </tr>
      </thead>
      <tbody>
        {filteredResults.map((result, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{result.subject}</td>
            <td>{result.above80}</td>
            <td>{result.between60and80}</td>
            <td>{result.between40and60}</td>
            <td>{result.below40}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;