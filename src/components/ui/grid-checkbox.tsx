import React, { useState } from 'react';

interface GridCheckboxProps {
  rows: number;
  columns: number;
  labels: string[];
  onGridChange: (grid: string[]) => void;
}

const GridCheckbox = (props: GridCheckboxProps) => {
  const { rows, columns, labels } = props;
  // Initialize the grid state with all false values
  const [grid, setGrid] = useState(
    Array.from({ length: rows }, () => Array(columns).fill(false))
  );

  // Toggle the value of a square in the grid
  const handleSquareClick = (row, col) => {
    setGrid((prevGrid) => {
      const newGridValues = prevGrid.map((gridRow, rowIndex) =>
        gridRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? !cell : cell
        )
      );
      props.onGridChange(labels.filter((_, i) => newGridValues.flat()[i]));
      return newGridValues;
    });
  };

  return (
    <div style={{ display: 'inline-block' }}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              className={`flex m-1 rounded-lg border-2 ${cell ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              style={{
                width: '6rem',
                height: '4rem',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {labels[rowIndex * columns + colIndex]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridCheckbox;
