import React from 'react';

const DataTable = ({ data }) => (
  <div className="data-table">
    <table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Emissions (tons per capita)</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ year, emissions }) => (
          <tr key={year}>
            <td>{year}</td>
            <td>{emissions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;