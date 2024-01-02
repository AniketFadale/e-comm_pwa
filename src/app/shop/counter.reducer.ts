import { Action, createReducer , on} from "@ngrx/store";
import { initialState } from "./counter.state";
import {  addToCart,  del,  editToCart, } from "./counter.actions";
import { state } from "@angular/animations";

const _counterReducer = createReducer(
    initialState,
    // on (increment ,(state: any)=>{
    //     return{
    //         ...state,
    //         counter : state.counter +1 ,
    //     };
    // }),
    // on(decrement,(state)=>{
    //     return{
    //         ...state,
    //         counter : state.counter-1,
    //     }
    // }),
    // on(reset , (state)=>{
    //     return{
    //         ...state,
    //         counter : 0,
    //     }
    // }),
    // on(add , (state , add)=>{
    //     console.log(add.add);
        
    //     return{
    //         ...state,
    //         counter : state.counter + add.add ,
    //     }
    // }),

    on(addToCart , (state:any , action:any)=>{
        console.log(action);
        console.log(state);
        
        
        return{
            ...state,
            users : [...state.users ,action]
        }
    }),
    on(del,(state , action)=>{
        localStorage.setItem('cart',JSON.stringify([]))
        
        
        return{
            ...state,
            users : []
        }
    }),
    on(editToCart,(state , action)=>{
        console.log(action.data);
        
        // console.log(action.data);
        return{
            ...state,
            users : action.data
         }
    })
)

export function counterReducer(state: any , action: Action){
    return _counterReducer(state ,action)
}