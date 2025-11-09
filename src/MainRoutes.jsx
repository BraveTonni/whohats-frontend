import { Routes, Route } from 'react-router-dom';

import Rules from './pages/Rules/Rules';
import Root from './pages/Root/Root';


export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/rules" element={<Rules />} />
        </Routes>
    )
}