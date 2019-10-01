import React from 'react';

class AddDialog extends React.Component {
    state = {  }
    render() { 
        return (
            <div>
                <h3>hello</h3>
                <div className="eclipse">
                <div className="progress">
                    <div>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
 
export default AddDialog;