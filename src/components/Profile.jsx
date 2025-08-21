import React from 'react';
import {useAuthService} from "../services/AuthService.js";
import SignInPage from "./SignInPage.jsx";
import SignUpPage from "./SignUpPage.jsx";
import LoggedInUserPage from "./LoggedInUserPage.jsx";

export default function Profile() {

    const { getSignInUser } = useAuthService();
    const user = getSignInUser();

    return (
        <>
            {
                !user.name ? (
                    <main className='profilePage'>
                        <section id='signUpPage' className="panel dark">
                            <SignUpPage />
                        </section>
                        <section id='signInPage' className="panel light">
                            <SignInPage />
                        </section>
                    </main>
                ) : (
                    <LoggedInUserPage />
                )
            }
        </>
    );
}
