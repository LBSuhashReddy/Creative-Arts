/*
  File: src/pages/admin/BulkAddPage.jsx
  This is the new page for handling the CSV bulk upload feature.
*/
import React, { useState } from 'react';
import Papa from 'papaparse';
import { getFunctions, httpsCallable } from 'firebase/functions';

const BulkAddPage = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);

    const handleFileChange = (e) => {
        setCsvFile(e.target.files[0]);
        setUploadResult(null); // Clear previous results
    };

    const handleCsvUpload = () => {
        if (!csvFile) {
            setUploadResult({ status: 'error', message: 'Please select a CSV file first.' });
            return;
        }

        setIsUploading(true);
        setUploadResult(null);

        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                try {
                    const functions = getFunctions();
                    const bulkAddArtists = httpsCallable(functions, 'bulkAddArtists');
                    // The 'artists' key here must match what the backend function expects
                    const response = await bulkAddArtists({ artists: results.data });
                    
                    setUploadResult(response.data); // The response for onCall is directly on .data
                } catch (error) {
                    console.error("Error calling cloud function:", error);
                    setUploadResult({ status: 'error', message: `An error occurred: ${error.message}` });
                } finally {
                    setIsUploading(false);
                }
            },
            error: (error) => {
                setUploadResult({ status: 'error', message: 'Failed to parse CSV file.' });
                setIsUploading(false);
            }
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Bulk Add Artists</h1>
                <p className="text-md text-gray-600 mt-2">Upload a CSV file with headers: `name`, `email`, `domain`, `graduationYear`.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <button
                        onClick={handleCsvUpload}
                        disabled={isUploading || !csvFile}
                        className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                    >
                        {isUploading ? 'Uploading...' : 'Upload and Create Artists'}
                    </button>
                </div>

                {uploadResult && (
                    <div className="mt-6 p-4 rounded-lg bg-gray-50">
                        <h3 className="font-bold text-lg">Upload Result:</h3>
                        <p className={`mt-2 ${uploadResult.status === 'error' || (uploadResult.errors && uploadResult.errors.length > 0) ? 'text-red-600' : 'text-green-600'}`}>
                            {uploadResult.message}
                        </p>
                        {uploadResult.errors && uploadResult.errors.length > 0 && (
                            <div className="mt-2">
                                <h4 className="font-semibold">Error Details:</h4>
                                <ul className="list-disc list-inside text-sm text-red-600">
                                    {uploadResult.errors.map((err, index) => (
                                        <li key={index}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkAddPage;