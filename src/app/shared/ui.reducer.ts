import * as UIActions from './ui.actions';

export interface State {
    isLoading:boolean;
}

const initState: State = {
    isLoading:false
}

export function uiReducer(state=initState, action:UIActions.actions):State{
    switch(action.type){
        case UIActions.ACTIVE_LOADING:
            return {
                isLoading: true
            }
        case UIActions.DEACTIVATE_LOADING:
            return {
                isLoading: false
            }
        default:
            return state;
    }
}