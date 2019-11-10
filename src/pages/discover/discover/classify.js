import React, { Component } from "react";
import { Image, FlatList, StyleSheet, Text, View, Dimensions,TouchableOpacity,ImageBackground } from "react-native";

var width = Dimensions.get('window').width;
// console.log(width)
var cols = 4;
var cellW = width*0.18;
var cellH = cellW;
var vMargin = (width -  cellW * cols) / (cols + 1)

export default class Classify extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      data: [
        {iconId: '1', iconImg: require('./image/icon1.png'), iconTitle: '私人FM'},
        {iconId: '2', iconImg: require('./image/icon2.png'), iconTitle: '每日推荐'},
        {iconId: '3', iconImg: require('./image/icon3.png'), iconTitle: '歌单'},
        {iconId: '4', iconImg: require('./image/icon4.png'), iconTitle: '排行榜'}
    ]};
  }

    render() {
        let {data} = this.state;
        return (
          <View>
            <FlatList
              data={data}
              renderItem={this.renderIcon}
              style={styles.list}
              keyExtractor={data => data.iconId}
              numColumns ={4}
            />
            <View style={styles.line}/>
          </View>
          );
    }

    renderIcon = ({ item }) => {
        return (
            <TouchableOpacity onPress={()=>{alert(item.iconId)}}>
              <View style={styles.cellStyle}>
                <View>
                  <Text style={{width:width*0.13, height:width*0.13, backgroundColor:'#d5453c', borderRadius:50 }} />
                  <Image source={item.iconImg} style={styles.imgStyle}/>
                </View>
                <Text style={styles.titleStyle}>{item.iconTitle}</Text>
              </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    list: {
      marginTop: 6
    },
    cellStyle:{
      // backgroundColor:'red',
      width:cellW,
      height:cellH,
      justifyContent:'center',
      alignItems:'center',
      marginLeft:vMargin
  },
  imgStyle: {
    width:width*0.06,
    height:width*0.06,
    position: 'absolute',
    top: width*0.035-1,
    left: width*0.035-1,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: 'green'
  },
  titleStyle:{
      marginTop: 4,
      fontSize: 13,
      color:'#353535'
  },
  line: {
    marginTop: 16,
    height: 1,
    // backgroundColor: 'grey'
    backgroundColor: '#E5E5E5'
  }
});