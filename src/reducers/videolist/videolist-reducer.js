import {
    INITVIDEOLIST,
    GETMOREVIDEO
} from '../../constants/videolist-type'

const INITIAL_STATE = {
    data: [],
    nomoredataflag: false
}

export default function videolistreducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INITVIDEOLIST:
            return {
                ...state,
                data: action.payload.result,
                nomoredataflag: false
            }
        case GETMOREVIDEO:
            let nomoredataflagnew = false
            if (action.payload.result.length == 0) {
                nomoredataflagnew = true
            } else {
                action.payload.result.map((item, index) => {
                    state.data.push(item);
                })
            }
            return {
                data: state.data,
                nomoredataflag: nomoredataflagnew
            }
        default:
            return state
    }
}
