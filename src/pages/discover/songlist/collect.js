
import React, { Component } from "react";
import { View, Image, Text, Dimensions, findNodeHandle, StyleSheet } from "react-native";
import SongList from './SongList';
import TopDetails from './TopDetails'
import screen from './utils/screen';
export default class collect extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (

      <View style={{ flexDirection: 'column' }}>  
        <TopDetails navigation={this.props.navigation}/>
        <View style={{ width: screen.width, marginTop: '20%' }}>
        <SongList navigation={this.props.navigation} />
        </View>
      </View>

    );
  }
}

