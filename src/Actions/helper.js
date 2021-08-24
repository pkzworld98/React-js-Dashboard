import { ACTIVATE_MENU } from "./types"

export const ActivateMenu=(event)=>{
    return async dispatch=>{

        dispatch({

            type:ACTIVATE_MENU,
            event

        })
    }
}