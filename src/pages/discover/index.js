import React, { Component } from 'react';
import { Text, View, Image, StyleSheet,DeviceEventEmitter } from 'react-native';
import Top from './discover/top'
import Tab from './discover/tab'

const tab_cart_select = require('../../navigators/assets/discover-active.png');
const tab_cart = require('../../navigators/assets/discover.png');

export default class Index extends Component {
  // 此处设置 Tab 的名称和一些样式，这里的会覆盖掉配置路由文件的样式，下面会讲
  static navigationOptions = {
    headerTitle: '发现',
    tabBarLabel: '发现',
    tabBarIcon: ({ focused, horizontal, tintColor }) => (
      <Image
        source={focused ? tab_cart_select : tab_cart}
        style={{ width: 30, height: 30 }}
        resizeMode={'contain'}
      />
    )
  };

  componentDidMount() {
    this.movieDetailsListenerSongList = DeviceEventEmitter.addListener('SongList', (songId) => {
      // alert(JSON.stringify(videodata))
      this.props.navigation.navigate('SongList', songId)
    });
  }
  componentWillUnmount() {
    this.movieDetailsListenerSongList.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Top />
        <View style={{ flex: 1 }}>
          <Tab />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

