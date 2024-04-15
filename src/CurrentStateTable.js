import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentStateTable = () => {
    const [bonds, setBonds] = useState([]);
    const [angles, setAngles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/state');
                console.log('API Response:', response.data);

                if (response.data.currentBonds && Array.isArray(response.data.currentBonds) && response.data.currentBonds.length > 0) {
                    setBonds(response.data.currentBonds);
                } else {
                    console.error('No bond data returned from API or data format is incorrect:', response.data);
                }

                if (response.data.currentAngles && Array.isArray(response.data.currentAngles) && response.data.currentAngles.length > 0) {
                    setAngles(response.data.currentAngles);
                } else {
                    console.error('No angle data returned from API or data format is incorrect:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading data...</p>;

    return (
        <div>
            <h2>Current Bonds</h2>
            <table style={{ backgroundColor: 'rgb(75, 192, 192)', margin: '20px', width: '80%', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>r</th>
                    <th>r0</th>
                    <th>k</th>
                </tr>
                </thead>
                <tbody>
                {bonds.map((bond, index) => (
                    <tr key={index}>
                        <td>{bond.r != null ? bond.r.toFixed(3) : 'N/A'}</td>
                        <td>{bond.r0 != null ? bond.r0.toFixed(3) : 'N/A'}</td>
                        <td>{bond.k}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h2>Current Angles</h2>
            <table style={{ backgroundColor: 'rgb(75, 192, 192)', margin: '20px', width: '80%', textAlign: 'center' }}>
                <thead>
                <tr>
                    <th>Theta</th>
                    <th>Theta0</th>
                    <th>k</th>
                </tr>
                </thead>
                <tbody>
                {angles.map((angle, index) => (
                    <tr key={index}>
                        <td>{angle.theta != null ? angle.theta.toFixed(3) : 'N/A'}</td>
                        <td>{angle.theta0 != null ? angle.theta0.toFixed(3) : 'N/A'}</td>
                        <td>{angle.k}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CurrentStateTable;
