import { createAction, createActionNo } from '../utils/jRedux'
import {
    PLAY,
    PAUSE,
    CHANGEMUSIC,
    GETMUSICLIST,
    CHANGELENGTH,
    CHANGEMODE,
    INITMUSICINFO,
    CHANGEMUSICINFO
} from '../constants/player'
import {getPlayerList} from '../constants/apis'

export const initMusicInfo = (obj) => createActionNo({
    type: INITMUSICINFO,
    payload: {
        whoosh: obj.whoosh,//歌曲
        seconds: obj.seconds, //秒数
        totalMin: obj.totalMin, //总分钟
        totalSec: obj.totalSec, //总分钟秒数
        nowMin: 0, //当前分钟
        nowSec: 0, //当前秒钟
        maximumValue: 0, //滑块最大值
    }
})

export const changeMusicInfo = (obj) => createActionNo({
    type: CHANGEMUSICINFO,
    payload: {
        nowMin: obj.nowMin, //当前分钟
        nowSec: obj.nonSec, //当前秒钟
        maximumValue: obj.maximumValue, //滑块最大值
    }
})

export const play = () => createActionNo({
    type: PLAY
})
export const pause = () => createActionNo({
    type: PAUSE
})
export const changeMusic = (num) => createActionNo({
    type: CHANGEMUSIC,
    payload: {
        index: num
    }
})
export const changeLength = (num) => createActionNo({
    type: CHANGELENGTH,
    payload: {
        length: num
    }
})
export const changeMode = (num) => createActionNo({
    type: CHANGEMODE,
    payload: {
        mode: num
    }
})
export const getMusicList = () => createAction({
    type: GETMUSICLIST,
    url: getPlayerList,
    method: 'GET'
})
export function asyncAdd() {
    return dispatch => {
        setTimeout(() => {
            dispatch(add())
        }, 1000)
    }
}
