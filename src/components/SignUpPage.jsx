import React, {useCallback, useState} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {useAuthService} from "../services/AuthService.js";

export default function SignUpPage() {
    const { signUp } = useAuthService();

    const [signUpError, setSignUpError] = useState(null);
    const [incorrectLogin, setIncorrectLogin] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const handleInputChange = useCallback(() => {
        setIncorrectLogin(false);
        setIncorrectPassword(false);
    }, [])

    useGSAP(() => {
        gsap.from("#signUpLabel", {
            x: -1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 0,
            overwrite:"auto"
        });

        gsap.from("#signUpForm", {
            x: -1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 0.7,
            overwrite:"auto"
        });

        gsap.from("#signUpFormButton", {
            x: -1000,
            opacity: 0,
            rotation: "random(-60, 60)",
            duration: 1,
            ease: "power3.out",
            delay: 1.4,
            overwrite:"auto"
        });
    },[]);

    useGSAP(() => {
        if (window.innerWidth <= 1000) {
            return;
        }

        if (signUpError === false && incorrectLogin === false && incorrectPassword === false) {
            gsap.to("#signInPage", {
                width: '60vw',
                duration: 2,
                ease: "sine.out",
                overwrite:"auto"
            });
            gsap.to("#signUpPage", {
                width: '40vw',
                duration: 2,
                ease: "sine.out",
                overwrite:"auto"
            });
        } else if (incorrectLogin === false && incorrectPassword === false) {
            gsap.to("#signInPage", {
                width: '50vw',
                duration: 2,
                ease: "sine.out",
                overwrite:"auto"
            });
            gsap.to("#signUpPage", {
                width: '50vw',
                duration: 2,
                ease: "sine.out",
                overwrite:"auto"
            });
        }
    },[signUpError, incorrectLogin, incorrectPassword]);

    useGSAP(() => {
        gsap.from("#signUpFormMessage", {
            y: 300,
            opacity: 0,
            duration: 1,
            ease: "sine.out",
            overwrite:"auto"
        });
    },[signUpError]);

    const handleSignUp = useCallback(() => {
        const login = document.getElementById("signUpNameInput").value;
        const password = document.getElementById("signUpPasswordInput").value;

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
            signUp(login, password)
                .then(() => {
                    setSignUpError(false);
                    if (window.innerWidth <= 800) {
                        setTimeout(() => {
                            document.getElementById("signInPage").scrollIntoView({ behavior:"smooth" });
                        }, 2000);
                    }
                })
                .catch(() => {
                    setSignUpError(true);
                    setIncorrectLogin(true);
                });
        }
    }, [signUp])

    return (
        <div className='profilePageContainer'>
            <h1 id='signUpLabel' className='formLabel'>Stwórz konto</h1>
            <section className="formContainer">
                <div id='signUpForm' className="formInputsVertical">
                    <span className="equalFormInputGroup">
                        <label htmlFor="signUpNameInput" className="dark">Nazwa</label>
                        <input autoComplete="off" id="signUpNameInput" type="text" onClick={handleInputChange}
                               className={"formInput textInput dark " + (incorrectLogin ? "incorrectInput" : "")} placeholder="...SuperSeller..."
                        />
                    </span>
                    <span className="equalFormInputGroup">
                        <label htmlFor="signUpPasswordInput" className="dark">Hasło</label>
                        <input autoComplete="off" id="signUpPasswordInput" type="password" onClick={handleInputChange}
                               className={"formInput textInput dark " + (incorrectPassword ? "incorrectInput" : "")} placeholder="TrudneHasło123"
                        />
                    </span>
                </div>
                <button id='signUpFormButton' className="formButtonDark dark" onClick={handleSignUp}>Zarejestruj się</button>
            </section>
            <div id='signUpFormMessage' className={(signUpError === true ? 'formError' : 'formSuccess') + (signUpError === null ? ' invisible' : '')}>
                {signUpError === true ? 'Nazwa użytkownika jest zajęta' : 'Konto stworzone, możesz się zalogować'}
            </div>
        </div>
    );
}
