import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../App.css';
import CarAddPage from './car-add';
import AddDialog from './AddDialog';

import EclipseWidget from './eclipse';


class CarsBody extends React.Component {
    state = {
        cars:[],
        makersSelect:[],
        loading: false,
        //isShowDialog: false
    }
    //toggleDialog = this.toggleDialog.bind(this);
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
    handleDelete=(e)=>{
        
    }

    // toggleDialog=(e)=>{
    //     this.setState({[e.target.name]: e.target.value});
    // }
    // toggleDialog(){
    //     this.setState(prevState=>({
    //         isShowDialog:!prevState.isShowDialog
    //     }));
    // }
    render() {
        const {loading}= this.state;

        const carItems = this.state.cars.map((car) =>
            <div key={car.id} className="card mb-4 box-shadow border-danger">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{car.name}</h4>
                </div>
                <img src={car.image} className="card-img-top p-1" alt=""/>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{car.name}</h1>
                    <button className="btn btn-danger">
                        Видалити
                    </button>
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
                    <div>
                        {/* <button className="btn btn-primary btn-block" onClick={this.toggleDialog}>Add car</button> */}
                        {/* {this.state.isShowDialog === true ? <div>popup shown!</div> : <div>popup hidden!</div>} */}
                    </div>
                </div>

                {/* <CarAddPage makers={makersSelect}/> */}
            <AddDialog/>
            </React.Fragment>
        );
    }
}
 
export default CarsBody;
