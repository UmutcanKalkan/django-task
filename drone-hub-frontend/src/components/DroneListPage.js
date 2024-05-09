import React, { useEffect, useState } from 'react';
import DroneDetailModal from './DroneDetailModal'; // For editing drones
import AddDroneModal from './AddDroneModal'; // For adding new drones
import RentDroneModal from './RentDroneModal';
import {fetchWithToken} from "./helpers"; // For renting a drone

function DroneListPage() {
    const [drones, setDrones] = useState([]);
    const [selectedDrone, setSelectedDrone] = useState(null);
    const [modalType, setModalType] = useState('');
    const [searchParams, setSearchParams] = useState({
        name: '',
        model: '',
        manufacturer: '',
        weight: '',
        wingspan: '',
        range: '',
        speed: '',
        camera_resolution: ''
    });

    useEffect(() => {
        const fetchDrones = async () => {
            const token = localStorage.getItem('token');
            const query = new URLSearchParams(searchParams).toString();
            const response = await fetchWithToken(`http://127.0.0.1:8000/api/v1/drones?${query}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setDrones(data);
            } else {
                alert(data.message || 'Failed to fetch drones');
            }
        };

        fetchDrones();
    }, [searchParams]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleEditClick = (drone) => {
        setSelectedDrone(drone);
        setModalType('edit');
    };

    const handleAddClick = () => {
        setModalType('add');
    };

    const handleRentClick = (drone) => {
        setSelectedDrone(drone);
        setModalType('rent');
    };

    const handleDelete = async (droneId) => {
        if (window.confirm('Are you sure you want to delete this drone?')) {
            const token = localStorage.getItem('token');
            const response = await fetchWithToken(`http://127.0.0.1:8000/api/v1/drones/${droneId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setDrones(drones.filter(d => d.id !== droneId)); // Update local state
                alert('Drone deleted successfully');
            } else {
                alert('Failed to delete drone');
            }
        }
    };

    const closeModal = () => {
        setModalType('');
        setSelectedDrone(null);
    };

    return (
        <div className="container">
            <h2>Drones</h2>
            <button className="btn btn-primary" onClick={handleAddClick}>Add Drone</button>
            <div className="form-row mb-4">
                {Object.entries(searchParams).map(([key, value]) => (
                    <div className="col" key={key}>
                        <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</label>
                        <input
                            type="text"
                            className="form-control"
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                    <th>Weight (kg)</th>
                    <th>Wingspan (m)</th>
                    <th>Range (km)</th>
                    <th>Speed (km/h)</th>
                    <th>Camera</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {drones.map(drone => (
                    <tr key={drone.id}>
                        <td>{drone.id}</td>
                        <td>{drone.name}</td>
                        <td>{drone.model}</td>
                        <td>{drone.manufacturer}</td>
                        <td>{drone.weight}</td>
                        <td>{drone.wingspan}</td>
                        <td>{drone.range}</td>
                        <td>{drone.speed}</td>
                        <td>{drone.camera_resolution}</td>
                        <td>
                            <button className="btn btn-secondary" onClick={() => handleEditClick(drone)}>Edit</button>
                            <button className="btn btn-success" onClick={() => handleRentClick(drone)}>Rent</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(drone.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {modalType === 'edit' && <DroneDetailModal drone={selectedDrone} onClose={closeModal} />}
            {modalType === 'add' && <AddDroneModal onClose={closeModal} />}
            {modalType === 'rent' && <RentDroneModal drone={selectedDrone} onClose={closeModal} />}
        </div>
    );
}

export default DroneListPage;
