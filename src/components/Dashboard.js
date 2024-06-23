import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, replace this with an actual API call
        const mockData = [
          { year: 2010, emissions: 4.8 },
          { year: 2011, emissions: 4.9 },
          { year: 2012, emissions: 4.9 },
          { year: 2013, emissions: 5.0 },
          { year: 2014, emissions: 4.9 },
          { year: 2015, emissions: 4.8 },
          { year: 2016, emissions: 4.8 },
          { year: 2017, emissions: 4.8 },
          { year: 2018, emissions: 4.9 },
        ];
        setData(mockData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div aria-live="polite">Loading data...</div>;
  if (error) return <div aria-live="assertive" role="alert">{error}</div>;

  const latestEmission = data.length > 0 ? data[data.length - 1].emissions : 0;
  const emissionChange = data.length > 1 
    ? ((data[data.length - 1].emissions - data[0].emissions) / data[0].emissions * 100).toFixed(2)
    : 0;

  const chartData = {
    labels: data.map(d => d.year),
    datasets: [
      {
        label: 'CO2 Emissions (metric tons per capita)',
        data: data.map(d => d.emissions),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        text: 'Global CO2 Emissions Over Time',
        font: {
          size: 18
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Emissions (metric tons per capita)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return (
    <div className="dashboard" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Global CO2 Emissions Visualizer</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '15px', width: '200px' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Latest Emission</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#0066cc' }} aria-label={`Latest emission: ${latestEmission} tons per capita`}>{latestEmission} tons per capita</p>
        </div>
        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '15px', width: '200px' }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>Change Since 2010</h3>
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#0066cc' }} aria-label={`Change since 2010: ${emissionChange}%`}>{emissionChange}%</p>
        </div>
      </div>
      
      <div aria-label="Line chart showing global CO2 emissions from 2010 to 2018">
        <Line data={chartData} options={options} />
      </div>
      
      <div style={{ marginTop: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <h3>About this Visualization</h3>
        <p>This chart shows the global CO2 emissions per capita from 2010 to 2018. The data is measured in metric tons of CO2 emitted per person. Understanding these trends is crucial for addressing climate change and developing effective environmental policies.</p>
      </div>
    </div>
  );
};

export default Dashboard;