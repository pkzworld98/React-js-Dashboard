import { ACTIVATE_MENU } from "../Actions/types"

const intialState={
    event:null
}

const menu=(state=intialState ,action)=>{
    switch(action.type){
 


        case ACTIVATE_MENU:
                   
            return {
              ...state,
            event:action.event}
     
         


        default:
            return state
    }

}

export default menu