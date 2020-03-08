import { Action } from '@ngrx/store';

export const ACTIVE_LOADING = '[UI Loading] Cargando..';
export const DEACTIVATE_LOADING = '[UI Loading] Fin de Carga...';

export class ActivateLoadingAction implements Action{
    readonly type = ACTIVE_LOADING;
}

export class DeactivateLoadingAction implements Action{
    readonly type = DEACTIVATE_LOADING;
}

export type actions =
    ActivateLoadingAction |
    DeactivateLoadingAction;
