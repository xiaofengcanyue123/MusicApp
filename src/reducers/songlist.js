import { SONG_LIST } from '../constants/songList'

const INITIAL_STATE = {
    data: []
}

export default function songlist (state = INITIAL_STATE, action) {
    switch (action.type) {
        case SONG_LIST:
                console.log(action.payload.result)
            return {
                ...state,
                data: action.payload.result
               
            }
            
        default:
            return state
    }
}
