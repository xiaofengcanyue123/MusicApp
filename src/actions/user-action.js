import {createAction} from '../utils/jRedux'
import {
    GETUSERINFO
} from '../constants/types'

import {getuserinfo} from '../constants/apis'


export const getuser = () => createAction({
  url: getuserinfo,
  type: GETUSERINFO,
  method: 'get'
})