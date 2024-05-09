import React, { useState } from 'react';
import {fetchWithToken} from "./helpers";

function RentDroneModal({ drone, onClose }) {
    const [rentDetails, setRentDetails] = useState({
        start_date: '',
        end_date: '',
        rental_fee: ''
    });

    const handleChange = (e) => {
        setRentDetails({...rentDetails, [e.target.name]: e.target.value});
    };

    const handleRent = async () => {
        const token = localStorage.getItem('token');
        const rentData = { ...rentDetails, drone: drone.id }; // Prepare data excluding the user field
        try {
            const response = await fetchWithToken('http://127.0.0.1:8000/api/v1/rents/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rentData)
            });
            if (response.ok) {
                alert('Drone rented successfully');
                onClose(); // Close modal after successful operation
            } else {
                const data = await response.json();
                alert('Failed to rent drone: ' + (data.message || 'Please check your input.'));
            }
        } catch (error) {
            alert('Error renting drone: ' + error.message);
        }
    };

    return (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Rent Drone</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_date"
                                    value={rentDetails.start_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>End Date:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="end_date"
                                    value={rentDetails.end_date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rental Fee:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="rental_fee"
                                    value={rentDetails.rental_fee}
                                    onChange={handleChange}
                                    placeholder="Enter rental fee"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleRent}>Confirm Rent</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentDroneModal;
