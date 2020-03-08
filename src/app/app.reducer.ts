import * as UIReducer from './shared/ui.reducer';
import * as AUTHReducer from './auth/auth.reducer';
import * as IEReducer from './ingreso-egreso/ingreso-egreso.reducer';
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
