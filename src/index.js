import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

const Cars = () => {
    return (
        <div className="container">
            <App/>
        </div>
    );
}

ReactDOM.render(<Cars/>, document.getElementById('root')); 
