import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import CarAddPage from '../car-add';

class AddDialog extends React.Component {
    state = {
        makersSelect:[],
        modalIsOpen: false
    }
    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);

    //додавання
    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.getName.value;
        const image = this.getImage.value;
        const data = {
            name, image
        }
        console.log(data)
    }

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
                        {/* <div>Add car</div> */}
                        <form onSubmit = {this.handleSubmit}>
                            <span>Назва</span>
                            <input required type="text" ref={(input)=>this.getName = input} placeholder="Назва"/>
                            <span>Фото</span>
                            <input type="text" ref={(input)=>this.getImage = input} placeholder="Фото"/>
                            <CarAddPage makers={makersSelect}/>
                            {/* <CarAddPage/> */}
                        </form>
                        <button className="btn btn-success" onClick={this.closeModal}>Додати</button>
                        <button className="btn btn-secondary" onClick={this.closeModal}>Скасувати</button>
                    </Modal>
                </div>
            </div>
        );
    }
}
 
export default AddDialog;