import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Video extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
        tabBarLabel: '主播电台',
    }
  }

  render() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>主播电台</Text>
        </View>
    );
  }
}