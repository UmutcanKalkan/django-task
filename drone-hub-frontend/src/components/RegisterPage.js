import React, { useState } from 'react';

function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== password2) {
            alert('Passwords do not match.');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, password2 })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            alert('Registration failed: ' + error.message);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" className="form-control" value={password2} onChange={e => setPassword2(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
