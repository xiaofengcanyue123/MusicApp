import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
// import MusicList from './musiclist'
import Demo from './demo'

export default class Recommend extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
        tabBarLabel: '个性推荐',
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Demo />
      </View>
    )
  }
}