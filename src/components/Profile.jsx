import React from 'react';
import {useAuthService} from "../services/AuthService.js";
import LoggedInUserPage from "./LoggedInUserPage.jsx";

export default function Profile() {

    const { getSignInUser } = useAuthService();
    const user = getSignInUser();

    if (!user.name) {
        location.replace("/authorize");
    }

    return (
        user.name ? <LoggedInUserPage /> : <></>
    );
}
