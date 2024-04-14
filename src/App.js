import React, { useEffect, useState } from 'react';
import OptimizationMonitor from './EnergyChart';
import CurrentStateTable from "./CurrentStateTable";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <OptimizationMonitor />
                {/*<CurrentStateTable />*/}
            </header>
        </div>
    );
}
export default App;


