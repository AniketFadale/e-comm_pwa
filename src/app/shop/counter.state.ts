export interface counterState{
    // counter:number,
    users: [{}]
}


let x = JSON.parse(localStorage.getItem('cart') ||'[]')

export const initialState = 
{
    // counter:0,
    users: x
}