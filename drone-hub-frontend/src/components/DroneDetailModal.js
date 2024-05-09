import React, { useState } from 'react';
import {fetchWithToken} from "./helpers";

function DroneDetailModal({ drone, onClose }) {
    const [droneDetails, setDroneDetails] = useState({...drone});

    const handleChange = (e) => {
        setDroneDetails({...droneDetails, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetchWithToken(`http://127.0.0.1:8000/api/v1/drones/${drone.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(droneDetails)
            });
            if (response.ok) {
                alert('Drone updated successfully');
                onClose();
            } else {
                alert('Failed to update drone');
            }
        } catch (error) {
            alert('Error updating drone: ' + error.message);
        }
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Drone</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {Object.keys(droneDetails).map(key => (
                                key !== 'id' && key !== 'created_at' && key !== 'updated_at' && (
                                    <div className="form-group" key={key}>
                                        <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name={key}
                                            value={droneDetails[key]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                )
                            ))}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DroneDetailModal;
