
import {Routes, Route} from "react-router-dom"
import {Registration} from '../components/Registration/Registration'

export const RoutreMain = () => {
    return (
        <div>
            <Routes>
                    <Route path={'registration'} element={<Registration />}/>
            </Routes>
        </div>
    )}