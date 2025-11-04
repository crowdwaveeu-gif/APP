import React from 'react';
import TransportModeComparativeChart from './TransportModeComparativeChart';

/**
 * Standalone test component for Transport Mode Statistics
 * Use this to test the chart independently
 */
const TransportModeStatsTest = () => {
  const [dataSource, setDataSource] = React.useState<'trips' | 'packages'>('trips');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🧪 Transport Mode Statistics - Test Page</h1>
      <p>This is a standalone test page for the comparative transport mode chart.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setDataSource('trips')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: dataSource === 'trips' ? '#0d6efd' : '#fff',
            color: dataSource === 'trips' ? '#fff' : '#000',
            border: '1px solid #0d6efd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🗺️ Trips
        </button>
        <button
          onClick={() => setDataSource('packages')}
          style={{
            padding: '10px 20px',
            backgroundColor: dataSource === 'packages' ? '#0d6efd' : '#fff',
            color: dataSource === 'packages' ? '#fff' : '#000',
            border: '1px solid #0d6efd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📦 Packages
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <TransportModeComparativeChart dataSource={dataSource} />
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📋 Test Checklist</h3>
        <ul>
          <li>✅ Chart displays all transport modes correctly</li>
          <li>✅ Toggle between Trips and Packages works</li>
          <li>✅ Trips show 6 modes (Flight, Train, Bus, Car, Motorcycle, Ship)</li>
          <li>✅ Packages show 4 modes (Flight, Train, Bus, Car)</li>
          <li>✅ Loading state appears while fetching data</li>
          <li>✅ Error state appears if Firebase connection fails</li>
          <li>✅ Summary statistics display below chart</li>
          <li>✅ Chart is responsive and looks good on all screen sizes</li>
          <li>✅ Data labels appear above bars</li>
          <li>✅ Legend is visible and color-coded</li>
        </ul>

        <h3>🔧 Expected Behavior</h3>
        <h4>When viewing Trips:</h4>
        <ul>
          <li>Should show 6 colored bar series</li>
          <li>Each month should have up to 6 bars (one per mode)</li>
          <li>Y-axis label: "Number of Trips"</li>
          <li>Summary shows all 6 modes with totals</li>
        </ul>

        <h4>When viewing Packages:</h4>
        <ul>
          <li>Should show 4 colored bar series</li>
          <li>Each month should have up to 4 bars (one per mode)</li>
          <li>Y-axis label: "Number of Packages"</li>
          <li>Summary shows only 4 modes with totals</li>
          <li>Info note about multiple mode selection</li>
        </ul>

        <h3>🐛 Known Issues</h3>
        <ul>
          <li>None currently - report any issues you find!</li>
        </ul>

        <h3>📊 Test Data</h3>
        <p>
          If Firebase is not connected, the chart will use mock data from:
        </p>
        <ul>
          <li><code>src/data/trips.ts</code> - Contains 8 sample trips with various transport modes</li>
          <li><code>src/data/packages.ts</code> - Contains 8 sample packages with preferred modes</li>
        </ul>

        <h3>🔍 Debug Info</h3>
        <p>Current data source: <strong>{dataSource}</strong></p>
        <p>Open browser console to see Firebase query logs</p>
      </div>
    </div>
  );
};

export default TransportModeStatsTest;
