import React, { useState } from 'react';
import axios from 'axios';

const OptimizationSettingsForm = () => {
    const [learningRate, setLearningRate] = useState(0.01);
    const [maxIterations, setMaxIterations] = useState(1000);
    const [optimizerType, setOptimizerType] = useState('sgd');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            learningRate: parseFloat(learningRate),
            optimizerType: optimizerType,
            maxIterations: parseInt(maxIterations, 10)
        };

        try {
            const response = await axios.post('http://192.168.1.106:3000/set_parameters', payload);
            alert('Parameters updated successfully!');
        } catch (error) {
            console.error('Error updating parameters:', error);
            alert('Failed to update parameters. Check the console for more information.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='optimizationForm'>
            <div className='optimizationForm'>
                <label htmlFor="learningRate">Learning Rate:</label>
                <input
                    type="number"
                    id="learningRate"
                    value={learningRate}
                    onChange={e => setLearningRate(e.target.value)}
                    step="0.000000001"
                    min="0"
                />
            </div>
            <div className='optimizationForm'>
                <label htmlFor="maxIterations">Max Iterations:</label>
                <input
                    type="number"
                    id="maxIterations"
                    value={maxIterations}
                    onChange={e => setMaxIterations(e.target.value)}
                    min="1"
                />
            </div>
            <div className='optimizationForm'>
                <label htmlFor="optimizerType">Optimizer Type:</label>
                <select
                    id="optimizerType"
                    value={optimizerType}
                    onChange={e => setOptimizerType(e.target.value)}
                >
                    <option value="sgd">SGD</option>
                    <option value="adam">Adam</option>
                </select>
            </div>
            <button type="submit">Update Parameters</button>
        </form>
    );
};

export default OptimizationSettingsForm;
