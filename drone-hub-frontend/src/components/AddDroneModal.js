import React, { useState } from 'react';
import { fetchWithToken } from './helpers';

function AddDroneModal({ onClose }) {
    const [newDrone, setNewDrone] = useState({
        name: '',
        model: '',
        manufacturer: '',
        weight: '',
        wingspan: '',
        range: '',
        speed: '',
        camera_resolution: ''
    });

    const handleChange = (e) => {
        setNewDrone({...newDrone, [e.target.name]: e.target.value});
    };

    const handleAdd = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetchWithToken('http://127.0.0.1:8000/api/v1/drones/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newDrone)
            });
            if (response.ok) {
                alert('Drone added successfully');
                onClose();
            } else {
                alert('Failed to add drone');
            }
        } catch (error) {
            alert('Error adding drone: ' + error.message);
        }
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Drone</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {Object.keys(newDrone).map(key => (
                                <div className="form-group" key={key}>
                                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={key}
                                        value={newDrone[key]}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={handleAdd}>Add Drone</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddDroneModal;
