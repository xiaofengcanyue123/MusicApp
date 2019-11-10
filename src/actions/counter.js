import {createAction} from '../utils/jRedux'
import { MUSICLIST, LOADMORE, MUSICITEM } from '../constants/counter'

import {getMusicList} from '../constants/apis'

export const musicList = () => createAction({
  url: getMusicList,
  type: MUSICLIST,
  method: 'get'
})

export const loadMore = () => createAction({
  url: getMusicList,
  type: LOADMORE,
  method: 'get'
})

export const musicItem = (item) => {
	return {
		type: MUSICITEM,
		item
	}
}

