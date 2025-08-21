import { Route, Routes } from 'react-router';
import React from "react";
import Shop from "./Shop.jsx";
import Profile from "./Profile.jsx";
import Authorize from "./Authorize.jsx";

export default function Router() {
    return (
        <Routes>
            <Route index element={<Shop />} />
            <Route path='profile' element={<Profile />} />
            <Route path='authorize' element={<Authorize />} />
        </Routes>
    );
}