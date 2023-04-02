// import React from 'react';
// import ReactDOM from 'react-dom';

// const App = () => {
//     return (
//         <div>
//             <h1>Hello, World!</h1>
//         </div>
//     );
// };

// ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Register from './register';
import Login from './login';
import ReactDOM from 'react-dom'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />,
                <Route path="/register" element={<Register />} />,
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>

    );
};

ReactDOM.render(<App />, document.getElementById('root'));