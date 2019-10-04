import React from 'react';
import Modal from 'react-modal';
import {connect} from 'react-redux';

class DelDialog extends React.Component {
    state = {
        isShowDialog: false
    }
    openDialog=this.openDialog.bind(this);
    openDialog(){
        this.setState({isShowDialog: true})
    }
    closeModal = (e) => {
        this.setState({isShowDialog: false});
    }

    //видалення
    onClick = (e) => {
        e.preventDefault();
        this.props.dispatch({type:'DELETE_CAR',name:this.props.name});
        this.closeModal();

        console.log(this.props.name);
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
        return (
            <div>
                <button className="btn btn-danger btn-block" onClick={this.openDialog}>
                    Видалити
                </button>
                <Modal isOpen={this.state.isShowDialog} style={customStyles}>
                    <div className="modal-header">
                        <h3 className="modal-title justify-content-center">Справді видалити?</h3>
                        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    <div className="modal-body">
                        {/* <p>Modal body text goes here.</p> */}
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Ні</button>
                        <button type="button" className="btn btn-danger" onClick={this.onClick.bind(this)}>Так</button>
                    </div>
                </Modal>
            </div>
        );
    }
}
 
export default connect()(DelDialog);