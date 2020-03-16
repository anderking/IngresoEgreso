import * as IEActions from '../actions/ingreso-egreso.actions';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';

export interface IngresoEgresoState {
    items:IngresoEgreso[];
}

const initState: IngresoEgresoState = {
    items:null
}

export function ingresoEgresoReducer(state=initState, action:IEActions.actions):IngresoEgresoState{
    switch(action.type){
        case IEActions.SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item=>{
                        return {
                            ...item
                        };
                    })
                ]
            }
        case IEActions.UNSET_ITEMS:
            return {
                items:[]
            }
        default:
            return state;
    }
}