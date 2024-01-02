import { counterReducer } from "../shop/counter.reducer";
import { counterState } from "../shop/counter.state";

export interface AppState{
    cart:  counterState 
}

export const appReducer:any ={
    counter:counterReducer
}
