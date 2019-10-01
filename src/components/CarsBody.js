import React from 'react';
import axios from 'axios';

class CarsBody extends React.Component {
    state = {
        cars:[]
    }
    
    getListDataHandler = (e) => {
        e.preventDefault();

        const url = 'https://localhost:44331/api/cars';
        axios.get(url).then(
            (resp) => {
                this.setState({cars: resp.data});
            }
        );
    }
    render() { 
        const carItems = this.state.cars.map((car) =>
            <div key={car.id} className="card mb-4 box-shadow border-danger">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{car.name}</h4>
                </div>
                <img src={car.image} className="card-img-top p-1" alt=""/>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{car.name}</h1>
                </div>
            </div>
        );
        return (
            <div>
                <button className="btn btn-success btn-block" onClick={this.getListDataHandler}>Get data</button>
                <div className="card-deck mb-3 text-center">
                    {carItems}
                </div>
            </div>
        );
    }
}
 
export default CarsBody;
