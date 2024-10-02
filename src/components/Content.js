import React, { useState } from 'react';
import './Content.css';
import { GoChevronRight } from "react-icons/go";
import { useTranslation } from "react-i18next";
import logo from "../logo.svg";
import { signInWithGoogle } from '../registration/firebase.js';
import SignInButton from "../registration/SignInButton";

function Content() {
    const {t} = useTranslation();
    const descriptions = t('Description', {returnObjects: true});
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };


        // Apple Sign-in function
        const signInWithApple = () => {
            window.AppleID.auth.signIn()
                .then((data) => {
                    console.log('User info from Apple:', data);
                })
                .catch((error) => {
                    console.error('Error during Apple sign-in:', error);
                });
        };


        return (
            <>
                <div className="Content" style={{height: '15vh', marginTop: '30px'}}>
                    <img src={logo} id="LogoSite"/>
                    <h1 id="TitleSite">GOSTLINK</h1>
                </div>
                <div className="Content" style={{height: '5vh', marginBottom: '10px', marginTop: '10px'}}>
                    <h2 id="DescriptionSite">Самый быстрый в обитаемой вселенной!</h2>
                </div>
                <div className="Content" style={{alignItems: "flex-start", marginBottom: '20px'}}>
                    <div id="Description">
                        {descriptions.map((item, index) => (
                            <div className="DescriptionElement" key={index}>
                                <div className="TitleDescription" onClick={() => handleToggle(index)}>
                                    <h1>{item.title}</h1>
                                    <GoChevronRight color='#93959E'
                                                    className={`icon ${activeIndex === index ? 'rotated' : ''}`}/>
                                </div>
                                <div className={`DescriptionText ${activeIndex === index ? 'active' : ''}`}>
                                    <p style={{marginBottom: '0'}}>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div id="RegistrationBlock">
                        <SignInButton/>

                        {/* Apple Sign-in Button */}
                        <div id="appleid-signin">
                            <img src="https://appleid.cdn-apple.com/appleid/button" alt="Sign in with Apple"/>
                        </div>
                    </div>
                </div>
            </>
        );
}

export default Content;
