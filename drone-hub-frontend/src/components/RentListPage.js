import React, { useEffect, useState } from 'react';
import DetailModal from './RentDetailModal';
import {fetchWithToken} from "./helpers";

function RentListPage() {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchParams, setSearchParams] = useState({
        drone__name: '',
        user__username: '',
        start_date__gt: '',
        start_date_lt: '',
        end_date__gt: '',
        end_date__lt: '',
        rental_fee__gt: '',
        rental_fee__lt: ''
    });
    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem('token');
            const query = new URLSearchParams(searchParams).toString();  // URL'deki query parametrelerini oluşturur
            const url = `http://127.0.0.1:8000/api/v1/rents?${query}`;
            const response = await fetchWithToken(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setItems(data);
            } else {
                alert(data.message || 'Failed to fetch rents');
            }
        };

        const timer = setTimeout(() => { // Adding debounce to reduce number of API calls
            fetchItems();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchParams]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
    };

    const handleDeleteRent = async (rentId) => {
        if (window.confirm('Are you sure you want to delete this rent?')) {
            const token = localStorage.getItem('token');
            const response = await fetchWithToken(`http://127.0.0.1:8000/api/v1/rents/${rentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                setItems(items.filter(r => r.id !== rentId)); // Update local state
                alert('Rent deleted successfully');
            } else {
                alert('Failed to delete rent');
            }
        }
    };


    return (
        <div className="container">
            <h2>Rent List</h2>
            <form className="mb-4">
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="drone__name">Drone Name:</label>
                        <input
                            id="drone__name"
                            type="text"
                            className="form-control"
                            name="drone_name"
                            value={searchParams.drone__name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="user__username">User Username:</label>
                        <input
                            id="user__username"
                            type="text"
                            className="form-control"
                            name="user__username"
                            value={searchParams.user__username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="start_date__gt">Start Date From:</label>
                        <input
                            id="start_date__gt"
                            type="date"
                            className="form-control"
                            name="start_date__gt"
                            value={searchParams.start_date__gt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="start_date_lt">Start Date To:</label>
                        <input
                            id="start_date_lt"
                            type="date"
                            className="form-control"
                            name="start_date_lt"
                            value={searchParams.start_date_lt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="end_date__gt">End Date From:</label>
                        <input
                            id="end_date__gt"
                            type="date"
                            className="form-control"
                            name="end_date__gt"
                            value={searchParams.end_date__gt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="end_date__lt">End Date To:</label>
                        <input
                            id="end_date__lt"
                            type="date"
                            className="form-control"
                            name="end_date__lt"
                            value={searchParams.end_date__lt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="rental_fee__gt">Rental Fee From:</label>
                        <input
                            id="rental_fee__gt"
                            type="float"
                            className="form-control"
                            name="rental_fee__gt"
                            value={searchParams.rental_fee__gt}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="rental_fee__lt">Rental Fee To:</label>
                        <input
                            id="rental_fee__lt"
                            type="float"
                            className="form-control"
                            name="rental_fee__lt"
                            value={searchParams.rental_fee__lt}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </form>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Drone ID</th>
                    <th>User</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Rent Fee</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id} onClick={() => handleRowClick(item)}>
                        <td>{item.id}</td>
                        <td>{item.drone}</td>
                        <td>{item.user}</td>
                        <td>{item.start_date}</td>
                        <td>{item.end_date}</td>
                        <td>{item.rental_fee}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDeleteRent(item.id)}>Delete</button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            {selectedItem && <DetailModal item={selectedItem} onClose={handleCloseModal} />}
        </div>
    );
}

export default RentListPage;
