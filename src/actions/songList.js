import { createAction } from '../utils/jRedux'
import {
    SONG_LIST,
} from '../constants/songList'
import {getSongList} from '../constants/apis'

export const songList = payload => createAction({
    url: getSongList,
    type: SONG_LIST,
    method: 'GET',
    dataType: 'text',
    payload
})
