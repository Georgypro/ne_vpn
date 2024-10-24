
import React, {useEffect, useState} from 'react';
import '../languages/i18n';
import {useNavigate} from "react-router-dom";
import './PanelStyle.css';
import {toast} from "react-toastify";


function SearchMagna() {
    const navigate = useNavigate();
    const [SearchData, setSearchData] = useState(null);

    useEffect(() => {
        fetchSearchData();
    }, []);

    const fetchSearchData = () => {

        fetch(`https://gostlink.ru/api/panel/users?page=0&size=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        navigate('/panel-voodoo');
                    });
                }

                return response.text();
            })
            .then(text => {
                console.log(text);
                if (text) {
                    return JSON.parse(text);
                }
                return {};
            })
            .then(data => {
                setSearchData(data.content);
            })
            .catch(error => {
                console.error('Fetch error:', error.message);
                navigate('/panel-voodoo');
            });

    };




    return (
        <div className="panel-main">
            <div className="panel-container">
                <div className="panel-block">
                    <span>THIS IS SEARCH MENU!!!</span>
                </div>

                <div className="panel-block">
                    {SearchData ? (
                        SearchData.length > 0 ? (
                            <>
                                <ul style={{marginTop: '0'}}>
                                    {SearchData.map(user => (
                                        <div className="panel-block-list" key={user.id}
                                             onClick={() => toast('открылась страничка?')}>
                                            <span>{user.id} - {user.email} </span><br/>
                                            <span>{user.uid} - </span><br/>
                                        </div>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <span className="text-tips" style={{fontSize: '12pt'}}>ничего не найдено</span>
                        )
                    ) : (
                        <p>Loading data...</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default SearchMagna;
