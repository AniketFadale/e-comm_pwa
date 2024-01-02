import { createAction, props } from "@ngrx/store";



export const addToCart = createAction(
    '[Cart Page] Cart',
    props<any>()
);
export const editToCart = createAction(
    '[Cart Page] Edit', props<{data:any}>()
);
export const del = createAction('delete')