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

const INITIAL_STATE = {
    musiclist: [],//歌曲列表
    playing: true,//是否正在播出
    musicIndex: 0,//当前播放歌曲index
    length: 0,//musicList长度
    playingMode: 0,//当前音乐播放模式 0:顺序播放 1:单曲循环 2:随机播放
    loaded:false,

    whoosh: null,//歌曲
    seconds: 0, //秒数
    totalMin: '', //总分钟
    totalSec: '', //总分钟秒数
    nowMin: 0, //当前分钟
    nowSec: 0, //当前秒钟
    maximumValue: 0, //滑块最大值
}

export default function player(state = INITIAL_STATE, action) {
    
    switch (action.type) {
        case GETMUSICLIST:
            return {
                ...state,
                musiclist: action.payload.result,
                loaded:true,
                length: action.payload.result.length
            }
        case INITMUSICINFO:
            return {
                ...state,
                whoosh: action.payload.whoosh,//歌曲
                seconds: action.payload.seconds, //秒数
                totalMin: action.payload.totalMin, //总分钟
                totalSec: action.payload.totalSec, //总分钟秒数
                nowMin: 0, //当前分钟
                nowSec: 0, //当前秒钟
                maximumValue: 0, //滑块最大值
            }
        case CHANGEMUSICINFO:
            return {
                ...state,
                nowMin: action.payload.nowMin, //当前分钟
                nowSec: action.payload.nonSec, //当前秒钟
                maximumValue: action.payload.maximumValue, //滑块最大值
            }
        case PLAY:
            return {
                ...state,
                playing: true
            }
        case PAUSE:
            return {
                ...state,
                playing: false
            }
        case CHANGEMUSIC:
            return {
                ...state,
                musicIndex: action.payload.index
            }
        //没有什么用
        case CHANGELENGTH:
            return {
                ...state,
                length: action.payload.length
            }
        case CHANGEMODE:
            return {
                ...state,
                playingMode: action.payload.mode
            }
        default:
            return state
    }
}
