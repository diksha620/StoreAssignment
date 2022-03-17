import { createReducer ,on } from "@ngrx/store";
import { initialState } from "./auth.State";
 

import { signUpRequest , signInRequest ,signInFail ,signInSuccess,signUpFail,signUpSuccess  } from "./auth.action";
const _AuthReducer = createReducer(initialState,
    on(signUpRequest , (state) => {
    return{
        ...state,
        error:null
    }}),
    on(signUpSuccess, (state , {data}) =>{
        return{
            ...state,
            userData: {
                ...data
            }
        }
    }),
    on(signUpFail, (state , {data}) =>{
        return{
            ...state,
            error:data.error
        }
    }),
    on(signInRequest , (state) => {
        return{
            ...state,
            error:null
        }
    }),
    on(signInSuccess,(state , {data}) =>{
        return {
            ...state,
            userData:{
                ...data
            }
        }

    }),
    on(signInFail , (state , {data}) => {
        return {
            ...state,
            error:data.error
        }
    })
)
// const _AuthReducer

export function AuthReducer(state :any , action : any){
    return _AuthReducer(state,action)
}