const carReducer = (state = [], action) => {
    switch(action.type){
        case 'ADD_CAR':
            return state.concat([action.data]);
        default:
            return state;
    }
}

export default carReducer;