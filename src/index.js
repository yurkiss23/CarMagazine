import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import carReducer from './reducer/CarReducer';

const store = createStore(carReducer);

const Cars = () => {
    return (
        <div className="container">
            <Provider store = {store}>
                <App/>
            </Provider>
        </div>
    );
}

ReactDOM.render(<Cars/>, document.getElementById('root')); 
