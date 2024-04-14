import './EnergyChart.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';  // Include CSS for the slider

// Register the required chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const OptimizationMonitor = () => {
    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState(true);
    const [interval, setInterval] = useState({ min: 0, max: 12000 });

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/previous_energies?minIndex=${interval.min}&maxIndex=${interval.max}`);
            console.log('API Response:', response.data);

            if (response.data.previousEnergies && Array.isArray(response.data.previousEnergies) && response.data.previousEnergies.length > 0) {
                const labels = response.data.previousEnergies.map(entry => entry.index.toString());
                const values = response.data.previousEnergies.map(entry => entry.value);
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Total Energy',
                            data: values,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1
                        }
                    ]
                });
            } else {
                console.error('No data returned from API or data format is incorrect:', response.data);
                setChartData(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setChartData(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [interval.min, interval.max]);  // React to changes in either slider handle

    return (
        <div style={{width: '600px', height: '400px'}}>
            <h2>Total Energy Over Time</h2>
            {!loading ? (
                chartData ? <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}}/> :
                    <p>No data available.</p>
            ) : (
                <p>Loading chart...</p>
            )}
            <div style={{margin: '20px'}}>
                <InputRange
                    maxValue={12000}
                    minValue={0}
                    formatLabel={value => `${value}`}
                    value={interval}
                    onChange={value => setInterval(value)}
                    step={100}
                />
            </div>
        </div>
    );
};

export default OptimizationMonitor;
