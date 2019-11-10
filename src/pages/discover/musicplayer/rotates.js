import React, { Component } from 'react'
import { StyleSheet, Text, View, DeviceEventEmitter } from 'react-native'

import Swiper from 'react-native-swiper'
import Rotate from './rotate'
import { connect } from 'react-redux'

@connect((state) => ({ player: state.player }), {})
export default class SwiperComponent extends Component {
  render() {
    let { musiclist ,musicIndex} = this.props.player
    return (
      <Swiper
        showsButtons={true}
        showsButtons={false}
        showsPagination={false}
        index={musicIndex}
        onIndexChanged={(index) => {
          
          DeviceEventEmitter.emit("swiperChangeMusic", index);
        }}
      >
        {musiclist.map((item, index) => {
          return (<Rotate musicIndex={index} />)
        })}
      </Swiper>
    )
  }
}
const styles = StyleSheet.create({

})