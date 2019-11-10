import { GETUSERINFO } from '../../constants/types'

const INITIAL_STATE = {
    username: '',
    imgurl:''
}

export default function counter (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GETUSERINFO:
            return {
                ...state,
                username: action.payload.username,
                imgurl:action.payload.imgurl
            }
        default:
            return state
    }
}
