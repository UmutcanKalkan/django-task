export async function fetchWithToken(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            ...options.headers
        }
    });

    // Eğer token süresi dolmuşsa ve 401 hatası alınırsa
    if (response.status === 401) {
        const refreshTokenResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: localStorage.getItem('refreshToken') })
        });

        const refreshData = await refreshTokenResponse.json();
        if (refreshTokenResponse.ok) {
            localStorage.setItem('token', refreshData.access); // Yeni token'ı kaydet
            return fetchWithToken(url, options); // İstek tekrar gönderilir
        } else {
            throw new Error('Unable to refresh token');
        }
    }

    return response;
}
