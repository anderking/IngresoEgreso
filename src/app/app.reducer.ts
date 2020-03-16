import * as UIReducer from './core/store/reducers/ui.reducer';
import * as AUTHReducer from './core/store/reducers/auth.reducer';
import * as IEReducer from './core/store/reducers/ingreso-egreso.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ui: UIReducer.State;
    auth: AUTHReducer.AuthState;
    IE: IEReducer.IngresoEgresoState;
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: UIReducer.uiReducer,
    auth: AUTHReducer.AuthReducer,
    IE: IEReducer.ingresoEgresoReducer,
}
