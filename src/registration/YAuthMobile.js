import { useEffect, useState } from 'react';

function YAuthMobile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Step 1: Extract the access_token from the URL hash.
        const hash = window.location.hash;
        const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
        localStorage.setItem('yandex_token', accessToken);

        if (accessToken) {
            // Step 2: Make the request to Yandex API to get user info.
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
                    localStorage.setItem('uid', data.client_id);
                    localStorage.setItem('email', data.default_email);
                    // localStorage.setItem('name', data.real_name);
                    localStorage.setItem('photoUrl', data.default_avatar_id);
                    localStorage.setItem('providerId', 'yandex.ru');
                    handleReg(data.client_id, data.default_email, data.default_avatar_id, 'yandex.ru')
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

        window.kmpJsBridge.callNative(
            "yAuth",
            JSON.stringify(requestData),
            function (data) {
                document.getElementById("subtitle").innerText = data;
                console.log("Response from Native: " + data);
            }
        );
    };


    if (loading) {
        return (
            <div className="container-main">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-main">
                <h1>{error}</h1>
            </div>
        );
    }

    return (
        <div className="container-main">
            <h1>Successfully logged in</h1>
        </div>
    );
}

export default YAuthMobile;
