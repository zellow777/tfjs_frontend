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
    const [interval, setInterval] = useState({ min: 0, max: 100000 });
    const [maxIntervalLimit, setMaxIntervalLimit] = useState(10000); // Separate state to keep track of the absolute maximum

    const fetchMaxInterval = async () => {
        try {
            const maxResponse = await axios.get('http://localhost:3000/last_index_previous_energies');
            const fetchedMaxInterval = maxResponse.data.lastIndex;
            setMaxIntervalLimit(fetchedMaxInterval); // Update the absolute maximum limit state
            return fetchedMaxInterval;
        } catch (error) {
            console.error('Failed to fetch max interval:', error);
            return maxIntervalLimit; // Return current limit state in case of error
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/previous_energies?minIndex=${interval.min}&maxIndex=${interval.max}`);
            console.log('API Response:', response.data);

            const maxInterval = response.data.previousEnergies.map(entry => entry.index).pop();
            setInterval(prevState => ({ ...prevState, max: maxInterval }));

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
        fetchMaxInterval();  // This will run only on component mount due to []
        fetchData();         // Also fetch data on mount
    }, []); // Empty dependency array means this effect will only run once, after initial render

    useEffect(() => {
        fetchData(); // This will run on subsequent renders if `interval.min` or `interval.max` changes
    }, [interval.min, interval.max]);

    return (
        <div style={{width: '600px', height: '300px'}}>
            <h2>Total Energy Over Time</h2>
            {!loading ? (
                chartData ? <Line data={chartData} options={{responsive: true, maintainAspectRatio: false}} /> :
                    <p>No data available.</p>
            ) : (
                <p>Loading chart...</p>
            )}
            <div style={{margin: '20px'}}>
                <InputRange
                    maxValue={maxIntervalLimit}
                    minValue={0}
                    formatLabel={value => `${value}`}
                    value={interval}
                    onChange={value => setInterval(value)}
                    step={1}
                />
            </div>
        </div>
    );
};

export default OptimizationMonitor;
