import React from 'react';
import './App.css';  // Make sure the CSS is being imported
import OptimizationMonitor from './EnergyChart';
import CurrentStateTable from "./CurrentStateTable";
import FileUploader from "./FileUploader";
import OptimizationSettingsForm from "./OptimizationSettingsForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="content-row">
                    <CurrentStateTable />
                    <OptimizationMonitor />
                    <div className="forms-column">
                        <FileUploader />
                        <OptimizationSettingsForm />
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
