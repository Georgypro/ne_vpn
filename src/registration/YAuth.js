import { useEffect, useState } from 'react';

function YAuth() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Step 1: Extract the access_token from the URL hash
        const hash = window.location.hash;
        const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
        localStorage.setItem('yandex_token', accessToken);

        if (accessToken) {
            // Step 2: Make the request to Yandex API to get user info
            fetch('https://login.yandex.ru/info', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // Step 3: Save the user info in local storage
                    localStorage.setItem('client_id', data.client_id);
                    localStorage.setItem('email', data.default_email);
                    // localStorage.setItem('name', data.real_name);
                    localStorage.setItem('photoUrl', data.default_avatar_id);
                    handleReg(data.default_avatar_id, data.default_email, data.default_avatar_id, 'yandex.ru')
                    setLoading(false);

                })
                .catch((err) => {
                    console.error('Error fetching user info:', err);
                    setError('Failed to fetch user info');
                    setLoading(false);
                });
        } else {
            setError('Access token not found in URL');
            setLoading(false);
        }
    }, []);

    const handleReg = (uid, email, photoURL, providerId) => {
        const requestData = {
            uid: uid,
            email: email,
            photoURL: photoURL,
            providerId: providerId,
        };

        fetch(`https://gostlink.ru/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                console.log(response);
                return response.text();
            })
            .then(text => {
                console.log(text);  // Log the raw text response
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                console.log(data);
                if (data.success) {
                    localStorage.setItem('isYandexAuth', "true");
                    window.close();
                } else {
                    // Handle failure notification
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                window.close();
            });
    }

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <h1>Successfully logged in</h1>
        </div>
    );
}

export default YAuth;
