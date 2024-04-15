import React, { useState } from 'react';

function FileUploader({ apiUrl }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!file) {
            alert('Please upload a file first!');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const data = JSON.parse(text);

            try {
                const response = await fetch('http://localhost:3000/initialize_and_run', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('File successfully sent to the server!');
                    const responseBody = await response.text();
                    console.log(responseBody);
                } else {
                    throw new Error('Failed to send file');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending file to server');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="uploader">
            <h1>Upload JSON File</h1>
            <input type="file" onChange={handleFileChange} accept=".json" />
            <button onClick={handleFileUpload}>Upload and Send</button>
        </div>
    );
}

export default FileUploader;
