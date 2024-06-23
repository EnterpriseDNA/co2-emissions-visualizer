import React, { useState, useEffect } from 'react';
import { 
  AppBar, Toolbar, Typography, Container, Grid, Paper, 
  ThemeProvider, createTheme, CssBaseline, Switch, 
  FormControlLabel, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Label, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


// ... rest of the component code remains the same

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState('Global');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    // Simulated data fetch
    const mockData = {
      Global: [
        { year: 2010, emissions: 4.8, renewable: 20, population: 6900 },
        { year: 2011, emissions: 4.9, renewable: 21, population: 6980 },
        { year: 2012, emissions: 4.9, renewable: 22, population: 7060 },
        { year: 2013, emissions: 5.0, renewable: 23, population: 7140 },
        { year: 2014, emissions: 4.9, renewable: 24, population: 7220 },
        { year: 2015, emissions: 4.8, renewable: 25, population: 7300 },
        { year: 2016, emissions: 4.8, renewable: 26, population: 7380 },
        { year: 2017, emissions: 4.8, renewable: 27, population: 7460 },
        { year: 2018, emissions: 4.9, renewable: 28, population: 7540 },
      ],
      USA: [
        { year: 2010, emissions: 17.4, renewable: 10, population: 309 },
        { year: 2011, emissions: 17.0, renewable: 11, population: 311 },
        { year: 2012, emissions: 16.3, renewable: 12, population: 314 },
        { year: 2013, emissions: 16.3, renewable: 13, population: 316 },
        { year: 2014, emissions: 16.5, renewable: 14, population: 318 },
        { year: 2015, emissions: 16.0, renewable: 15, population: 321 },
        { year: 2016, emissions: 15.8, renewable: 16, population: 323 },
        { year: 2017, emissions: 15.8, renewable: 17, population: 325 },
        { year: 2018, emissions: 16.1, renewable: 18, population: 327 },
      ],
      China: [
        { year: 2010, emissions: 6.6, renewable: 15, population: 1340 },
        { year: 2011, emissions: 7.2, renewable: 16, population: 1348 },
        { year: 2012, emissions: 7.4, renewable: 17, population: 1356 },
        { year: 2013, emissions: 7.5, renewable: 18, population: 1364 },
        { year: 2014, emissions: 7.5, renewable: 19, population: 1371 },
        { year: 2015, emissions: 7.4, renewable: 20, population: 1379 },
        { year: 2016, emissions: 7.4, renewable: 21, population: 1386 },
        { year: 2017, emissions: 7.7, renewable: 22, population: 1393 },
        { year: 2018, emissions: 7.9, renewable: 23, population: 1399 },
      ],
    };
    setData(mockData);
  }, []);

  const selectedData = data[selectedCountry] || [];
  const latestData = selectedData[selectedData.length - 1] || {};
  const pieData = [
    { name: 'Emissions', value: latestData.emissions },
    { name: 'Renewable', value: latestData.renewable },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CO2 Emissions Dashboard
          </Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label="Dark Mode"
          />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                CO2 Emissions Over Time
              </Typography>
              <ResponsiveContainer>
                <LineChart
                  data={selectedData}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <XAxis dataKey="year" stroke={theme.palette.text.secondary} />
                  <YAxis stroke={theme.palette.text.secondary}>
                    <Label
                      angle={270}
                      position="left"
                      style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                      }}
                    >
                      Emissions (tons per capita)
                    </Label>
                  </YAxis>
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke={theme.palette.primary.main}
                    dot={false}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Latest Data
              </Typography>
              <Typography component="p" variant="h4">
                {latestData.emissions} tons per capita
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Year: {latestData.year}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="country-select-label">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  value={selectedCountry}
                  label="Country"
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {Object.keys(data).map((country) => (
                    <MenuItem key={country} value={country}>{country}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Renewable Energy vs Emissions
              </Typography>
              <ResponsiveContainer>
                <BarChart
                  data={selectedData}
                  margin={{
                    top: 16,
                    right: 16,
                    bottom: 0,
                    left: 24,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="emissions" fill="#8884d8" name="Emissions" />
                  <Bar yAxisId="right" dataKey="renewable" fill="#82ca9d" name="Renewable Energy %" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 300,
              }}
            >
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Latest Emissions vs Renewable Energy
              </Typography>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
<Grid item xs={12} md={6}>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Country Comparison
    </Typography>
    <ResponsiveContainer>
      <RadarChart data={[
        { subject: 'Emissions', Global: data.Global[data.Global.length-1].emissions, USA: data.USA[data.USA.length-1].emissions, China: data.China[data.China.length-1].emissions },
        { subject: 'Renewable', Global: data.Global[data.Global.length-1].renewable, USA: data.USA[data.USA.length-1].renewable, China: data.China[data.China.length-1].renewable },
        { subject: 'Population', Global: data.Global[data.Global.length-1].population/1000, USA: data.USA[data.USA.length-1].population, China: data.China[data.China.length-1].population/1000 },
      ]}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
        <Radar name="Global" dataKey="Global" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="USA" dataKey="USA" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
        <Radar name="China" dataKey="China" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  </Paper>
</Grid>
<Grid item xs={12} md={6}>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Emissions vs Renewable Energy
    </Typography>
    <ResponsiveContainer>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="emissions" name="Emissions" unit="tons" />
        <YAxis type="number" dataKey="renewable" name="Renewable Energy" unit="%" />
        <ZAxis type="number" dataKey="population" name="Population" unit="M" range={[50, 400]} />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name={selectedCountry} data={selectedData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  </Paper>
</Grid>
<Grid item xs={12}>
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Detailed Data
    </Typography>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Year</TableCell>
            <TableCell>Emissions (tons per capita)</TableCell>
            <TableCell>Renewable Energy (%)</TableCell>
            <TableCell>Population (M)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedData.map((row) => (
            <TableRow key={row.year}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.emissions}</TableCell>
              <TableCell>{row.renewable}</TableCell>
              <TableCell>{(row.population / 1000000).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
</Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;