import React from 'react';
import SignInPage from "./SignInPage.jsx";
import SignUpPage from "./SignUpPage.jsx";

export default function Authorize() {
    return (
        <main className='profilePage'>
            <section id='signUpPage' className="panel dark">
                <SignUpPage />
            </section>
            <section id='signInPage' className="panel light">
                <SignInPage />
            </section>
        </main>
    );
}
