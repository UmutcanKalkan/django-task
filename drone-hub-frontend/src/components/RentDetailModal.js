import React, { useState } from 'react';
import {fetchWithToken} from "./helpers";

function RentDetailModal({ item, onClose }) {
    const [editableItem, setEditableItem] = useState({...item}); // Düzenlenebilir item için local state

    const handleChange = (e) => {
        setEditableItem({...editableItem, [e.target.name]: e.target.value});
    };

    const handleSave = async () => {
        // API'ye gönderilen güncelleme isteği
        try {
            const response = await fetchWithToken(`http://127.0.0.1:8000/api/v1/rents/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editableItem)
            });
            if (response.ok) {
                onClose(); // Eğer güncelleme başarılıysa, modal kapatılır
            } else {
                alert('Failed to update item.');
            }
        } catch (error) {
            alert('Update failed: ' + error.message);
        }
    };

    return (
        <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Rent</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>User:</label>
                                <input type="text" className="form-control" name="user" value={editableItem.user} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input type="date" className="form-control" name="start_date" value={editableItem.start_date} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>End Date:</label>
                                <input type="date" className="form-control" name="end_date" value={editableItem.end_date} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Rent Fee:</label>
                                <input type="text" className="form-control" name="rental_fee" value={editableItem.rental_fee} onChange={handleChange} />
                            </div>
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

export default RentDetailModal;
