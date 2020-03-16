import * as AUTHActions from '../actions/auth.actions';
import { User } from '../../models/user.model';

export interface AuthState {
    user:User;
}

const initState: AuthState = {
    user:null
}

export function AuthReducer(state=initState, action:AUTHActions.actions):AuthState{
    switch(action.type){
        case AUTHActions.SET_USER:
            return {
                user: {...action.user }
            }
        case AUTHActions.UNSET_USER:
            return{
                user: null
            }
        default:
            return state;
    }
}