import { stat } from "fs";

const carReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_CAR':
            return state.concat([action.data]);
        case 'DELETE_CAR':
            return state.filter((car) => car.name !== action.name);
        default:
            return state;
    }
}

export default carReducer;