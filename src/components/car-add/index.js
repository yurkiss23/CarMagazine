import React, {Component} from 'react';
//import map from 'lodash/map';

class CarAddPage extends Component {
    state = {
        maker:'',
        makers:[]
    }
    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value});
    }
    static getDerivedStateFromProps(nextProps){
        return{
            makers: nextProps.makers
        };
    }
    render() {
        const {makers}=this.state;
        const options=makers.map(m =>
            <option key={m.id} value={m.id}>{m.name}</option>
        );
        return (
            <React.Fragment>
                <h1>Add Car</h1>
                <select className="form-control" name="maker" onChange={this.onChange} val={this.state.maker}>
                    <option>оберіть виробника</option>
                    {options}
                </select>
            </React.Fragment>
        );
    }
}
 
export default CarAddPage;