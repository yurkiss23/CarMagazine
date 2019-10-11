import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

import {connect} from 'react-redux';
import CarAddPage from '../car-add';
import CarsBody from '../CarsBody';

class AddDialog extends React.Component {
    state = {
        makersSelect:[],
        modalIsOpen: false,
        maker: ''
    }
    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);

    openModal() {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
    // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    closeModal() {
        this.setState({modalIsOpen: false});
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
    UNSAFE_componentWillMount() {
        Modal.setAppElement('body');
    }

    //додавання
    handleSubmit = (e) => {
        e.preventDefault();
        const urlAddCar = 'Access-Control-Allow-Origin: https://localhost:44331/api/cars/create';
        this.setState({loading: true});
        const name = this.getName.value;
        const mkr = this.getMaker.state;
        const image = this.getImage.value;
        const model = {
            name,
            mkr,
            image
        }
        axios.post(urlAddCar, model).then(
            (resp) => {
                console.log('---');
                this.setState({maker: '', loading: false});
            }
        );

        this.props.dispatch({
            type: 'ADD_CAR',
            model
        });
        this.getName.value='';
        this.getImage.value='';
        this.closeModal();
    }
    render() { 
        const customStyles = {
            content : {
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)'
            }
        };
        const {makersSelect}= this.state;
        
        
        return (
            <div className="container">
                {/* <div className="eclipse">
                    <div className="progress">

                    </div>
                </div> */}
                <div>
                    <button className="btn btn-primary btn-block" onClick={this.openModal}>Add car</button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2 ref={subtitle => this.subtitle = subtitle}>Add car</h2>
                        <form onSubmit={this.handleSubmit}>
                            <span>Назва</span>
                            <input required type="text" ref={(input)=>this.getName = input} placeholder="Назва"/>
                            <span>Фото</span>
                            <input type="text" ref={(input)=>this.getImage = input} placeholder="Фото"/>
                            <CarAddPage makers={makersSelect} ref={(select)=>this.getMaker = select}/>
                        </form>
                        <button type="submit" className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Додати</button>
                        <button className="btn btn-secondary" onClick={this.closeModal}>Скасувати</button>
                    </Modal>
                </div>
            </div>
        );
    }
}
 
export default connect()(AddDialog);