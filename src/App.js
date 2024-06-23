import React from 'react';
import Dashboard from './components/Dashboard';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(_, errorInfo) {
    console.log('Error:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Check the console for more information.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
