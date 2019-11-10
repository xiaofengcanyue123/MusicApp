import { MUSICLIST, LOADMORE, MUSICITEM } from '../../constants/counter'

const INITIAL_STATE = {
    list: [],
    item: []
}

export default function counter (state = INITIAL_STATE, action) {
    switch (action.type) {
        case MUSICLIST:
            return {
                ...state,
                list: action.payload.lists
            }
        case LOADMORE:
            action.payload.lists.map((item,index)=>{
                state.list.push(item)
            })
            // console.log('test',JSON.stringify(state.list))
            return {
                ...state,
                list: state.list
            }
        case MUSICITEM:
            return {
                ...state,
                item: action.item
        }
        default:
            return state
    }
}
