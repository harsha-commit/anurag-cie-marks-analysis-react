import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ColumnSelector from './components/ColumnSelector';
import ResultTable from './components/ResultTable';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [results, setResults] = useState({});

  console.log(selectedColumn);

  const handleFileUpload = (worksheet) => {
    console.log('File uploaded:', worksheet);
    setData(worksheet);
  };

  const handleColumnSelect = (column) => {
    console.log('Column selected:', column);
    setSelectedColumn(column);
    processResults(column, data);
  };

  const processResults = (column, data) => {
    if (data.length === 0 || !column) return;

    const columnIndex = data[0].indexOf(column);
    if (columnIndex === -1) {
      console.error(`Column "${column}" not found in the data`);
      return;
    }

    const sections = {};

    for (let i = 1; i < data.length; i++) {
      const section = data[i][0].trim(); // Use the 1st column (index 0) for section and strip whitespace
      const subject = data[i][1].trim(); // Use the 2nd column (index 1) for subject and strip whitespace
      const marks = Math.ceil(data[i][columnIndex]);
      console.log(`Processing section: ${section}, subject: ${subject}, marks: ${marks}`);

      if (!sections[section]) {
        sections[section] = [];
      }

      const result = sections[section].find(result => result.subject === subject);
      if (result) {
        if (column === "MID Weightage Marks") {
          if (marks >= 24) result.above80++;
          else if (marks >= 18) result.between60and80++;
          else if (marks >= 12) result.between40and60++;
          else result.below40++;
        } else if (column === "Assignment Weightage Marks") {
          if (marks >= 16) result.above80++;
          else if (marks >= 12) result.between60and80++;
          else if (marks >= 8) result.between40and60++;
          else result.below40++;
        } else if (column === "Overall Marks") {
          if (marks >= 40) result.above80++;
          else if (marks >= 30) result.between60and80++;
          else if (marks >= 20) result.between40and60++;
          else result.below40++;
        }
      } else {
        sections[section].push({
          subject,
          above80: column === "MID Weightage Marks" ? (marks >= 24 ? 1 : 0) : column === "Assignment Weightage Marks" ? (marks >= 16 ? 1 : 0) : (marks >= 40 ? 1 : 0),
          between60and80: column === "MID Weightage Marks" ? (marks >= 18 && marks < 24 ? 1 : 0) : column === "Assignment Weightage Marks" ? (marks >= 12 && marks < 16 ? 1 : 0) : (marks >= 30 && marks < 40 ? 1 : 0),
          between40and60: column === "MID Weightage Marks" ? (marks >= 12 && marks < 18 ? 1 : 0) : column === "Assignment Weightage Marks" ? (marks >= 8 && marks < 12 ? 1 : 0) : (marks >= 20 && marks < 30 ? 1 : 0),
          below40: column === "MID Weightage Marks" ? (marks < 12 ? 1 : 0) : column === "Assignment Weightage Marks" ? (marks < 8 ? 1 : 0) : (marks < 20 ? 1 : 0)
        });
      }
    }

    console.log('Final results:', sections);
    setResults(sections);
  };

  return (
    <div className="App">
      <h1>Grade Calculator</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <ColumnSelector onSelectColumn={handleColumnSelect} />
      {Object.keys(results).map(section => (
        <div key={section}>
          <h2>Section: {section}</h2>
          <ResultTable results={results[section]} />
        </div>
      ))}
    </div>
  );
};

export default App;