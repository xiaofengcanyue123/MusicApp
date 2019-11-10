import { combineReducers } from 'redux'
import index from './user/index'
import VideoListReducer from './videolist/videolist-reducer'
import Discover from './discover/counter'
import songlist from './songlist'
import player from './player'

export default combineReducers({
    index,
    VideoListReducer,
    counter: Discover,
    songlist,
    player
})
