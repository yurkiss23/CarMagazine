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
                        <form>
                            <span>Назва</span>
                            <input />
                            <span>Фото</span>
                            <input />
                            <CarAddPage makers={makersSelect}/>
                            {/* <CarAddPage/> */}
                        </form>
                        <button onClick={this.closeModal}>Додати</button>
                        <button onClick={this.closeModal}>Скасувати</button>
                    </Modal>
                </div>
            </div>
        );
    }
}
 
export default AddDialog;