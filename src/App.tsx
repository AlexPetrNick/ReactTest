import React, {useEffect, useState} from 'react';
import './App.css';
import {Provider} from "react-redux";
import {store} from "./redux/react-redux";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {Registration} from "./components/Registration/Registration";
import {WorkAreaComponent} from "./components/WorkAreaComponent";

export const App = () => {

    return (
        <Router>
            <Provider store={store}>
                <Routes>
                    <Route path={'/registration'} element={<Registration />}/>
                    <Route path={'/'} element={<WorkAreaComponent />}/>
                </Routes>
            </Provider>
        </Router>
    );
}
