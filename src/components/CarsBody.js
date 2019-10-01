import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import CarAddPage from './car-add';

import EclipseWidget from './eclipse';


class CarsBody extends React.Component {
    state = {
        cars:[],
        makersSelect:[],
        loading: false
    }
    componentDidMount(){
        const urlMakers = 'https://localhost:44331/api/makers/select';
        this.setState({loading: true});
        axios.get(urlMakers).then(
            (resp) => {
                this.setState({makersSelect: resp.data, loading: false});
            }
        );
    }
    
    getListDataHandler = (e) => {
        e.preventDefault();

        const urlCars = 'https://localhost:44331/api/cars';
        this.setState({loading: true});
        axios.get(urlCars).then(
            (resp) => {
                this.setState({cars: resp.data, loading: false});
            }
        );
    }
    render() {
        const {loading, makersSelect}= this.state;

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
            <React.Fragment>
        
            { loading && <EclipseWidget /> }

                <div className="container">
                    <button className="btn btn-success btn-block" onClick={this.getListDataHandler}>Get data</button>
                    <div className="card-deck mb-3 text-center">
                        {carItems}
                    </div>
                </div>

                <CarAddPage makers={makersSelect}/>
            
            </React.Fragment>
        );
    }
}
 
export default CarsBody;
