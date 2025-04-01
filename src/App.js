import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ColumnSelector from './components/ColumnSelector';
import ResultTable from './components/ResultTable';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');
  const [results, setResults] = useState([]);

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

    const subjects = [
      'Discrete Mathematics',
      'Data Wrangling and Visualization',
      'Data Base Management Systems',
      'Fundamentals of Artificial Intelligence',
      'Design and Analysis of Algorithms',
      'Discrete Mathematics',
      'Data Wrangling and Visualization Lab',
      'Database Management Systems Lab',
    ];

    const results = subjects.map(subject => ({
      subject,
      above80: 0,
      between60and80: 0,
      between40and60: 0,
      below40: 0,
    }));

    console.log('Initial results:', results);

    for (let i = 1; i < data.length; i++) {
      const subject = data[i][1].trim(); // Strip whitespace from subject
      const marks = Math.ceil(data[i][columnIndex]);
      console.log(`Processing subject: ${subject}, marks: ${marks}`);

      const result = results.find(result => result.subject === subject);
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
        console.log(`Subject not found in results array: ${subject}`);
      }
    }

    console.log('Final results:', results);
    setResults(results);
  };

  return (
    <div className="App">
      <h1>Grade Calculator</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      <ColumnSelector onSelectColumn={handleColumnSelect} />
      <ResultTable results={results} />
    </div>
  );
};

export default App;