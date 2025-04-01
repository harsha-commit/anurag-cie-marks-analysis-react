import React from 'react';

const ResultTable = ({ results }) => {
  // Filter out rows where all values are zero
  const filteredResults = results.filter(
    result => result.above80 || result.between60and80 || result.between40and60 || result.below40
  );

  return (
    <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Name of the Subject</th>
          <th>Above 80%</th>
          <th>60% to 80%</th>
          <th>40% to 60%</th>
          <th>Less than 40%</th>
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