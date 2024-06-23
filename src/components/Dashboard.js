import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('Global');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // In a real app, we'd fetch this data from an API
    const mockData = {
      Global: [
        { year: 2010, emissions: 4.8 },
        { year: 2011, emissions: 4.9 },
        { year: 2012, emissions: 4.9 },
        { year: 2013, emissions: 5.0 },
        { year: 2014, emissions: 4.9 },
        { year: 2015, emissions: 4.8 },
        { year: 2016, emissions: 4.8 },
        { year: 2017, emissions: 4.8 },
        { year: 2018, emissions: 4.9 },
      ],
      USA: [
        { year: 2010, emissions: 17.4 },
        { year: 2011, emissions: 17.0 },
        { year: 2012, emissions: 16.3 },
        { year: 2013, emissions: 16.3 },
        { year: 2014, emissions: 16.5 },
        { year: 2015, emissions: 16.0 },
        { year: 2016, emissions: 15.8 },
        { year: 2017, emissions: 15.8 },
        { year: 2018, emissions: 16.1 },
      ],
      China: [
        { year: 2010, emissions: 6.6 },
        { year: 2011, emissions: 7.2 },
        { year: 2012, emissions: 7.4 },
        { year: 2013, emissions: 7.5 },
        { year: 2014, emissions: 7.5 },
        { year: 2015, emissions: 7.4 },
        { year: 2016, emissions: 7.4 },
        { year: 2017, emissions: 7.7 },
        { year: 2018, emissions: 7.9 },
      ],
    };
    setData(mockData);
  }, []);

  const selectedData = data[selectedCountry] || [];

  const latestEmission = selectedData.length > 0 ? selectedData[selectedData.length - 1].emissions : 0;
  const emissionChange = selectedData.length > 1 
    ? ((selectedData[selectedData.length - 1].emissions - selectedData[0].emissions) / selectedData[0].emissions * 100).toFixed(2)
    : 0;

  const chartData = {
    labels: selectedData.map(d => d.year),
    datasets: [
      {
        label: 'CO2 Emissions (metric tons per capita)',
        data: selectedData.map(d => d.emissions),
        borderColor: darkMode ? 'rgb(75, 192, 192)' : 'rgb(75, 192, 192)',
        backgroundColor: darkMode ? 'rgba(75, 192, 192, 0.5)' : 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
        pointRadius: 5,
        pointHoverRadius: 7,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedCountry} CO2 Emissions Over Time`,
        font: {
          size: 18
        },
        color: darkMode ? '#ffffff' : '#333333'
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Emissions (metric tons per capita)',
          color: darkMode ? '#ffffff' : '#333333'
        },
        ticks: {
          color: darkMode ? '#ffffff' : '#333333'
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          color: darkMode ? '#ffffff' : '#333333'
        },
        ticks: {
          color: darkMode ? '#ffffff' : '#333333'
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`} style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>CO2 Emissions Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={{
          padding: '5px 10px',
          backgroundColor: darkMode ? '#fff' : '#333',
          color: darkMode ? '#333' : '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="country-select" style={{ marginRight: '10px' }}>Select a country: </label>
        <select 
          id="country-select" 
          value={selectedCountry} 
          onChange={(e) => setSelectedCountry(e.target.value)}
          style={{
            padding: '5px',
            backgroundColor: darkMode ? '#555' : '#f0f0f0',
            color: darkMode ? '#fff' : '#333',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          {Object.keys(data).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ 
          backgroundColor: darkMode ? '#444' : '#f0f0f0', 
          borderRadius: '8px', 
          padding: '15px', 
          width: '200px' 
        }}>
          <h3 style={{ marginTop: 0 }}>Latest Emission</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: darkMode ? '#4da6ff' : '#0066cc' }}>
            {latestEmission} tons per capita
          </p>
        </div>
        <div style={{ 
          backgroundColor: darkMode ? '#444' : '#f0f0f0', 
          borderRadius: '8px', 
          padding: '15px', 
          width: '200px' 
        }}>
          <h3 style={{ marginTop: 0 }}>Change Since 2010</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: darkMode ? '#4da6ff' : '#0066cc' }}>
            {emissionChange}%
          </p>
        </div>
      </div>
      
      <Line data={chartData} options={options} />
      
      <div style={{ 
        marginTop: '20px', 
        backgroundColor: darkMode ? '#444' : '#f9f9f9', 
        padding: '15px', 
        borderRadius: '8px' 
      }}>
        <h3>Data Table</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            color: darkMode ? '#fff' : '#333'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  border: `1px solid ${darkMode ? '#555' : '#ddd'}`, 
                  padding: '8px', 
                  backgroundColor: darkMode ? '#555' : '#f2f2f2'
                }}>Year</th>
                <th style={{ 
                  border: `1px solid ${darkMode ? '#555' : '#ddd'}`, 
                  padding: '8px', 
                  backgroundColor: darkMode ? '#555' : '#f2f2f2'
                }}>Emissions (tons per capita)</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.map(({ year, emissions }) => (
                <tr key={year}>
                  <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '8px' }}>{year}</td>
                  <td style={{ border: `1px solid ${darkMode ? '#555' : '#ddd'}`, padding: '8px' }}>{emissions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        backgroundColor: darkMode ? '#444' : '#f9f9f9', 
        padding: '15px', 
        borderRadius: '8px' 
      }}>
        <h3>About this Visualization</h3>
        <p>This dashboard shows CO2 emissions per capita from 2010 to 2018 for selected countries. The data is measured in metric tons of CO2 emitted per person. Understanding these trends is crucial for addressing climate change and developing effective environmental policies.</p>
      </div>
    </div>
  );
};

export default Dashboard;