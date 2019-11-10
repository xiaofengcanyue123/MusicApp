import {createAction} from '../utils/jRedux'
import {
	INITVIDEOLIST,
	GETMOREVIDEO
} from '../constants/videolist-type'

import {getVideoList} from '../constants/apis'


export const initVideoList = () => createAction({
  url: getVideoList,
  type: INITVIDEOLIST,
  method: 'get'
})

export const getMoreVideo = () => createAction({
	url: getVideoList,
	type: GETMOREVIDEO,
	method: 'get'
  })


