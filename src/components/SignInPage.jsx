import React, {useCallback, useState} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {useAuthService} from "../services/AuthService.js";

export default function SignInPage() {
    const { signIn } = useAuthService();

    const [signInError, setSignInError] = useState(null);
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const handleInputChange = useCallback(() => {
        setIncorrectLogin(false);
        setIncorrectPassword(false);
    }, [])

    useGSAP(() => {
        gsap.from("#signInLabel", {
            x: 1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 0,
            overwrite:"auto"
        });

        gsap.from("#signInForm", {
            x: 1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 0.7,
            overwrite:"auto"
        });

        gsap.from("#signInFormButton", {
            x: 1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 1.4,
            overwrite:"auto"
        });
    },[]);


    useGSAP(() => {
        gsap.from("#signInFormMessage", {
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "sine.out",
            overwrite:"auto"
        });
    },[signInError]);

    const handleSignIn = useCallback(() => {
        const login = document.getElementById("signInNameInput").value;
        const password = document.getElementById("signInPasswordInput").value;

        let validationError = false;
        if (login === '') {
            setIncorrectLogin(true);
            validationError = true;
        }

        if (password === '') {
            setIncorrectPassword(true);
            validationError = true;
        }

        if (!validationError) {
            signIn(login, password)
                .then(() => {
                    setSignInError(false);
                    setTimeout(() => {
                        location.replace("/profile");
                    }, 1500);
                })
                .catch(() =>  setSignInError(true));
        }
    }, [signIn])

    return (
        <div className='profilePageContainer'>
            <h1 id='signInLabel' className='formLabel'>Zaloguj się</h1>
            <section className="formContainer">
                <div id='signInForm' className="formInputsVertical">
                    <span className="equalFormInputGroup">
                        <label htmlFor="signInNameInput" className="light">Login</label>
                        <input autoComplete="off" id="signInNameInput" type="text" onClick={handleInputChange}
                               className={"formInput textInput light " + (incorrectLogin ? "incorrectInput" : "")} placeholder="...SuperSeller..."
                        />
                    </span>
                    <span className="equalFormInputGroup">
                        <label htmlFor="signInPasswordInput" className="light">Hasło</label>
                        <input autoComplete="off" id="signInPasswordInput" type="password" onClick={handleInputChange}
                               className={"formInput textInput light " + (incorrectPassword ? "incorrectInput" : "")} placeholder="TrudneHasło123"
                        />
                    </span>
                </div>
                <button id='signInFormButton' className="formButtonLight light" onClick={handleSignIn}>Zaloguj się</button>
            </section>
            <div id='signInFormMessage' className={(signInError === true ? 'formError' : 'formSuccess') + (signInError === null ? ' invisible' : '')}>
                {signInError === true ? 'Błędny login lub hasło' : 'Logowanie pomyślne'}
            </div>
        </div>
    );
}
